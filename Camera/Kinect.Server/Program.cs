using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Fleck;
using Microsoft.Kinect;
using Microsoft.Kinect.Toolkit.Interaction;
using System.Runtime.InteropServices;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows;
using System.Net;
using System.Threading;
using System.ServiceModel;
using System.ServiceModel.Web;
using Kinect.Service;
using FaceRecogConsole;

namespace Kinect.Server
{
    class Program
    {
        //CURSEUR///////////////////////////////////////////////////////////////////////////
        static KinectSensor sensor;

        static int SCREEN_HEIGHT = System.Windows.Forms.Screen.PrimaryScreen.Bounds.Height;
        static int SCREEN_WIDTH = System.Windows.Forms.Screen.PrimaryScreen.Bounds.Width;

        //Determine experimentalement
        const float MIN_X_KINECT = -1.2f;
        const float MAX_X_KINECT = 1.2f;

        const float MIN_Y_KINECT = -0.8f;
        const float MAX_Y_KINECT = 0.8f;

        //Zone dans laquelle il est confortable de bouger la main
        const float MIN_X_KINECT_HAND = 0.2f;
        const float MAX_X_KINECT_HAND = 0.4f;

        const float MIN_Y_KINECT_HAND = 0.2f;
        const float MAX_Y_KINECT_HAND = 0.6f;

        //distance mini et maxi entre la main droite et l'epaule droite
        const float MIN_Z_KINECT_BETWEEN_HAND_SHOULDER = 0.20f;
        const float MAX_Z_KINECT_BETWEEN_HAND_SHOULDER = 0.55f;


        const float DISTANCE_CLIC = 0.5f;

        const float SEUIL_CLICK = 0.50f;
        const float SEUIL_DEBUT_CLICK = 0.35f;
        Boolean onclick = false;


        private MyCursor cursor = new MyCursor();

        //Sert a ne pas pouvoir cliquer trop de fois dans un petit intervalle de temps       
        private const int framesToWait = 35;
        private int frameCount = framesToWait;


        private InteractionStream interactionStream;
        private UserInfo[] userInfos;

        //WEBSOCKET/////////////////////////////////////////////////////////////////////////
        public static List<IWebSocketConnection> _clients = new List<IWebSocketConnection>();

        static Mode _mode = Mode.Color;

        static Skeleton[] _skeletons = new Skeleton[6];

        static CoordinateMapper _coordinateMapper;

        public static FaceRecognizer facerecognizer;

        //WEBSOCKET CURSOR/////////////////////////////////////////////////////////////////////////
        public static List<IWebSocketConnection> _clients2 = new List<IWebSocketConnection>();

        static void Main(string[] args)
        {
            Program p = new Program();
            InitializeConnection();
            InitializeConnectionCursor();
            p.InitilizeKinect();
            facerecognizer = new FaceRecognizer();

            LauchFaceRecogServer(null);

            Console.ReadLine();
        }

        private static void InitializeConnection()
        {
            var server = new WebSocketServer("ws://0.0.0.0:8181");

            server.Start(socket =>
            {
                socket.OnOpen = () =>
                {
                    _clients.Add(socket);
                };

                socket.OnClose = () =>
                {
                    _clients.Remove(socket);
                };

                socket.OnMessage = message =>
                {
                    switch (message)
                    {
                        case "Color":
                            _mode = Mode.Color;
                            break;
                        case "Depth":
                            _mode = Mode.Depth;
                            break;
                        default:
                            break;
                    }

                    Console.WriteLine("Switched to " + message);
                };
            });
        }


        private static void InitializeConnectionCursor()
        {
            var server2 = new WebSocketServer("ws://0.0.0.0:8484");

            server2.Start(socket2 =>
            {
                socket2.OnOpen = () =>
                {
                    _clients2.Add(socket2);
                };

                socket2.OnClose = () =>
                {
                    _clients2.Remove(socket2);
                };

                socket2.OnMessage = message =>
                {
                    
                   
                };
            });
        }


        private void InitilizeKinect()
        {
            sensor = KinectSensor.KinectSensors.SingleOrDefault();

            if (sensor != null)
            {
                sensor.ColorStream.Enable();
                sensor.DepthStream.Enable();
                sensor.SkeletonStream.EnableTrackingInNearRange = true;
                sensor.SkeletonStream.Enable();

                //On definit le listener qui sera appelé à chaque fois que la kinect capture une frame
                sensor.SkeletonFrameReady += Sensor_SkeletonFrameReady;

                sensor.DepthFrameReady += Sensor_OnDepthFrameReady;
                interactionStream = new InteractionStream(sensor,new DummyInteractionClient());
                interactionStream.InteractionFrameReady += InteractionStreamOnInteractionFrameReady;


                _coordinateMapper = sensor.CoordinateMapper;

                sensor.Start();
                Console.WriteLine("Kinect functionning properly");
                return;
            }
            Console.WriteLine("No Kinect detected");
        }


        void Sensor_SkeletonFrameReady(object sender, SkeletonFrameReadyEventArgs e)
        {
            using (var frame = e.OpenSkeletonFrame())
            {
                if (frame != null)
                {
                    Skeleton[] _skeletons = new Skeleton[frame.SkeletonArrayLength];

                    frame.CopySkeletonDataTo(_skeletons);

                    //oblige de mettre ces deux lignes pour les interactions
                    var accelerometerReading = sensor.AccelerometerGetCurrentReading();
                    interactionStream.ProcessSkeleton(_skeletons, accelerometerReading, frame.Timestamp);

                    //on ne garde que les personnes qu'on suit
                    var user = _skeletons.Where(s => s.TrackingState == SkeletonTrackingState.Tracked).FirstOrDefault();

                    if (user != null)
                    {

                        printCursorRightHand(user.Joints[JointType.HandRight]);

                        notifyCursorImageChanged(user);
                    }

                    //WEBSOCKET
                    var users = _skeletons.Where(s => s.TrackingState == SkeletonTrackingState.Tracked).ToList();

                    string json = users.Serialize(_coordinateMapper, _mode);

                    foreach (var socket in _clients)
                    {
                        socket.Send(json);
                    }
                }
            }

        }

        private void notifyCursorImageChanged(Skeleton user)
        {

            Console.WriteLine(user.Joints[JointType.HandRight].Position.X);

            float zShoulder = user.Joints[JointType.ShoulderRight].Position.Z;
            float zHand = user.Joints[JointType.HandRight].Position.Z;

            float diff = Math.Abs(zShoulder - zHand);

            //sert pour ne pas cliquer 2 fois au meme endroit lorsqu'on reste enfonce
            if (frameCount != framesToWait)
            {
                frameCount++;
            }

            float pas = (MAX_Z_KINECT_BETWEEN_HAND_SHOULDER - MIN_Z_KINECT_BETWEEN_HAND_SHOULDER) / 6;

            if (diff < (MIN_Z_KINECT_BETWEEN_HAND_SHOULDER + pas))
            {
                //sendInfosCursorToMirror("CLICKER");
                sendCursorPos("CLICKER");
                onclick = false;
            }
            else if (diff < (MIN_Z_KINECT_BETWEEN_HAND_SHOULDER + 2 * pas))
            {
                //sendInfosCursorToMirror("VERY_CLOSE");
                sendCursorPos("VERY_CLOSE");
                onclick = false;
            }
            else if (diff < (MIN_Z_KINECT_BETWEEN_HAND_SHOULDER + 3 * pas))
            {
                //sendInfosCursorToMirror("CLOSE");
                sendCursorPos("CLOSE");
                onclick = false;
            }
            else if (diff < (MIN_Z_KINECT_BETWEEN_HAND_SHOULDER + 4 * pas))
            {
                //sendInfosCursorToMirror("MID");
                sendCursorPos("MID");
                onclick = true;
            }
            else if (diff < (MIN_Z_KINECT_BETWEEN_HAND_SHOULDER + 5 * pas))
            {
                //sendInfosCursorToMirror("FAR_AWAY");
                sendCursorPos("FAR_AWAY");
                onclick = true;
            }
            else if (diff < (MIN_Z_KINECT_BETWEEN_HAND_SHOULDER + 6 * pas))
            {
                onclick = true;
                //sendInfosCursorToMirror("CLIC");
                sendCursorPos("CLIC");
                //Thread.Sleep(30); //pour qu'on ait le temps de changer le curseur avant le vrai clic
                detectClickRightHand(user);
            }
        }

        public Tuple<int, int> convertKinectCoordToScreenCoord(Tuple<float, float> kinectCoords)
        {

            int xScreen = (int)((kinectCoords.Item1 - MIN_X_KINECT_HAND) * (SCREEN_WIDTH / (MAX_X_KINECT_HAND - MIN_X_KINECT_HAND)));
            int yScreen = (int)((-(SCREEN_HEIGHT / MAX_Y_KINECT_HAND) * kinectCoords.Item2) + SCREEN_HEIGHT);

            //Console.WriteLine(yScreen);
            return new Tuple<int, int>(xScreen, yScreen);
        }

        void printCursorRightHand(Joint hand)
        {
            float x = hand.Position.X;
            float y = hand.Position.Y;
            float z = hand.Position.Z;

            //Console.WriteLine("X " + x + " Y " + y + " Z " + z);
            //Console.WriteLine(" Z hand " + z);
            Tuple<int, int> screenCoords = convertKinectCoordToScreenCoord(new Tuple<float, float>(x, y));

            if (x != 0 && y != 0)
            {
                if (!onclick)
                {
                    cursor.SetPosition(screenCoords.Item1, screenCoords.Item2);
                }
            }
        }

        //Doit etre appellee a chaque frame
        void detectClickRightHand(Skeleton body)
        {
            if (frameCount != framesToWait)
            {
                return;
            }

            float zShoulder = body.Joints[JointType.ShoulderRight].Position.Z;
            float zHand = body.Joints[JointType.HandRight].Position.Z;

            //pour synchroniser le clic avec la bonne image de curseur
            float pas = (MAX_Z_KINECT_BETWEEN_HAND_SHOULDER - MIN_Z_KINECT_BETWEEN_HAND_SHOULDER) / 6;

            //Console.WriteLine(onclick);
            if (((zShoulder - zHand) >= (MIN_Z_KINECT_BETWEEN_HAND_SHOULDER + 5 * pas)) && (frameCount == framesToWait))
            {
                cursor.DoMouseLeftClick();
                Console.WriteLine("Click");
                frameCount = 0;
            }

            //if (((zShoulder - zHand) > SEUIL_DEBUT_CLICK)  && ((zShoulder - zHand) < (MIN_Z_KINECT_BETWEEN_HAND_SHOULDER + 5 * pas)))
            //{
            //frameCount = 0;

            //    Console.WriteLine("PRE CLICK");

            //}

        }

        public class DummyInteractionClient : IInteractionClient
        {
            public InteractionInfo GetInteractionInfoAtLocation(
                int skeletonTrackingId,
                InteractionHandType handType,
                double x,
                double y)
            {
                var result = new InteractionInfo();
                result.IsGripTarget = true;
                result.IsPressTarget = true;
                result.PressAttractionPointX = 0.5;
                result.PressAttractionPointY = 0.5;
                result.PressTargetControlId = 1;

                return result;
            }
        }

        private void InteractionStreamOnInteractionFrameReady(object sender, InteractionFrameReadyEventArgs e)
        {

            using (InteractionFrame frame = e.OpenInteractionFrame())
            {
                if (frame != null)
                {
                    if (userInfos == null)
                    {
                        userInfos = new UserInfo[InteractionFrame.UserInfoArrayLength];

                    }

                    frame.CopyInteractionDataTo(userInfos);
                }
                else
                {
                    return;
                }
            }
            UserInfo userInfo = userInfos[0];

            foreach (UserInfo u in userInfos)
            {
                if (u.SkeletonTrackingId != 0)
                {
                    userInfo = u;
                    break;
                }
            }

            foreach (InteractionHandPointer handPointer in userInfo.HandPointers)
            {
                string action = null;

                switch (handPointer.HandEventType)
                {
                    case InteractionHandEventType.Grip:
                        action = "gripped";
                        break;

                    case InteractionHandEventType.GripRelease:
                        action = "released";
                        break;
                }

                if (action != null)
                {
                    string handSide = "unknown";

                    switch (handPointer.HandType)
                    {
                        case InteractionHandType.Left:
                            handSide = "left";
                            break;

                        case InteractionHandType.Right:
                            handSide = "right";
                            break;
                    }

                    if (handSide == "left")
                    {
                        if (action == "released")
                        {
                            // left hand released code here
                        }
                        else
                        {
                            // left hand gripped code here
                        }
                    }
                    else
                    {
                        if (action == "released")
                        {
                            //main droite released
                            cursor.Release();
                        }
                        else
                        {
                            //main droite grab
                            cursor.Grab();
                        }
                    }
                }
            }

        }

        private void Sensor_OnDepthFrameReady(object sender, DepthImageFrameReadyEventArgs depthImageFrameReadyEventArgs)
        {
            using (DepthImageFrame depthFrame = depthImageFrameReadyEventArgs.OpenDepthImageFrame())
            {
                if (depthFrame == null)
                    return;

                try
                {
                    interactionStream.ProcessDepth(depthFrame.GetRawPixelData(), depthFrame.Timestamp);
                }
                catch (InvalidOperationException)
                {
                    // DepthFrame functions may throw when the sensor gets
                    // into a bad state.  Ignore the frame in that case.
                }
            }
        }
        
        private static void sendInfosCursorToMirror(string status)
        {
            string sURL;
            sURL = "http://localhost:8080/Reflect/kinect/updatecursorpos.php?status=" + status;

            WebRequest wrGETURL;
            wrGETURL = WebRequest.Create(sURL);
            wrGETURL.GetResponse();

        }


        public static void LauchFaceRecogServer(string[] args)
        {
            Console.Write("Starting a WCF self-hosted .Net server... ");
            string hostname = "localhost";
            string port = "8282";
            
            // Decalring an HTTP Binding and instantiating an host
            string url = "http://" + hostname + ":" + port;

            WebHttpBinding b = new WebHttpBinding();
            var host = new WebServiceHost(typeof(KinectFaceRecognizerService), new Uri(url));

            // Adding the service to the host
            host.AddServiceEndpoint(typeof(IKinectFaceRecognizerService), b, "");

            // Staring the Host server
            host.Open();
            Console.WriteLine("done!\n");
            Console.WriteLine("  Listening to " + hostname + ":" + port + "\n\n");
            Console.WriteLine("Hit Return to shutdown the server.");
            Console.ReadLine();

            // Cleaning up and ending the hosting
            host.Close();
            Console.WriteLine("Server shutdown complete!");
        }

        private void sendCursorPos(string pos)
        {
            foreach (var socket in _clients2)
            {
                socket.Send("{ \"status\" : \""+pos+"\" }");
            }
        }


    }
}
