using Emgu.CV;
using Emgu.CV.Structure;
using Kinect.Server;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace FaceRecogConsole
{
    class FaceRecognizer
    {

        //Declararation of all variables, vectors and haarcascades
        Image<Bgr, Byte> currentFrame;
        Capture grabber;
        HaarCascade face;
        HaarCascade eye;
        
        Image<Gray, byte> result, TrainedFace = null;
        Image<Gray, byte> gray = null;
        List<Image<Gray, byte>> trainingImages = new List<Image<Gray, byte>>();
        List<string> labels = new List<string>();
        List<string> NamePersons = new List<string>();
        int ContTrain, NumLabels, t;
        string name, names = null;

        string path = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);

        private int frameCount = 0;
        private static bool record = false;

       


        public FaceRecognizer()
        {
            face = new HaarCascade("haarcascade_frontalface_default.xml");

           

            try
            {
                //Load of previus trainned faces and labels for each image
                string Labelsinfo = File.ReadAllText( path+ "/TrainedFaces/TrainedLabels.txt");
                string[] Labels = Labelsinfo.Split('%');
                NumLabels = Convert.ToInt16(Labels[0]);
                ContTrain = NumLabels;
                string LoadFaces;

                for (int tf = 1; tf < NumLabels + 1; tf++)
                {
                    LoadFaces = "face" + tf + ".bmp";
                    trainingImages.Add(new Image<Gray, byte>(path + "/TrainedFaces/" + LoadFaces));
                    labels.Add(Labels[tf]);
                }


            }
            catch (Exception e)
            {
                Console.WriteLine("Nothing in database");
            }

           

            
        }

        public void recordSamplesFromWebCam(string userName)
        {
            grabber = new Capture();
            grabber.QueryFrame(); //lance la webcam

            int photosTaken = 0;
            int frameCount = 0;
            int frameMinToWait = 60; //temps entre chaque photo

            for (; photosTaken < 3; frameCount++)
            {
                currentFrame = grabber.QueryFrame().Resize(320, 240, Emgu.CV.CvEnum.INTER.CV_INTER_CUBIC);
                gray = currentFrame.Convert<Gray, Byte>();


                MCvAvgComp[][] facesDetected = gray.DetectHaarCascade(
                 face,
                 1.2,
                 10,
                 Emgu.CV.CvEnum.HAAR_DETECTION_TYPE.DO_CANNY_PRUNING,
                 new Size(20, 20));

                if (facesDetected[0].Length == 0)
                {
                    Console.WriteLine("Aucune personne detectee");
                    foreach (var socket in Program._clients)
                    {
                        socket.Send("{ \"Status\" : \"NOONE\" }");
                    }
                }
                else if (facesDetected[0].Length > 1)
                {
                    Console.WriteLine("Trop de monde, 1 seule personne autorisee");
                    foreach (var socket in Program._clients)
                    {
                        socket.Send("{ \"Status\" : \"TOOMANY\" }");
                    }
                }
                else {
                    if (frameCount > frameMinToWait)
                    {
                        MCvAvgComp f = facesDetected[0][0];
                        TrainedFace = currentFrame.Copy(f.rect).Convert<Gray, byte>();

                        addUserToDatabase(userName, TrainedFace);
                        photosTaken++;
                        Console.WriteLine("Photo prise!");
                        frameCount = 0;
                        foreach (var socket in Program._clients)
                        {
                            socket.Send("{ \"Status\" : \"OK\" }");
                        }
                    }
                }
            }

            grabber.Stop();
            grabber.Dispose();
        }

        void addUserToDatabase(string name, Image<Gray, Byte> face)
        {


            TrainedFace = face.Resize(100, 100, Emgu.CV.CvEnum.INTER.CV_INTER_CUBIC);
            trainingImages.Add(TrainedFace);
            labels.Add(name);


            //Write the number of triained faces in a file text for further load
            File.WriteAllText(path + "/TrainedFaces/TrainedLabels.txt", trainingImages.ToArray().Length.ToString() + "%");

            //Write the labels of triained faces in a file text for further load
            for (int i = 1; i < trainingImages.ToArray().Length + 1; i++)
            {
                trainingImages.ToArray()[i - 1].Save(Application.StartupPath + "/TrainedFaces/face" + i + ".bmp");
                File.AppendAllText(path + "/TrainedFaces/TrainedLabels.txt", labels.ToArray()[i - 1] + "%");
            }
        }



        public string recognizeUser()
        {


            if (trainingImages.Count == 0)
            {
                return "unknown";
            }
            grabber = new Capture();
            grabber.QueryFrame();

            int photosTaken = 0;
            int frameCount = 0;
            int frameMinToWait = 20; //temps entre chaque photo

            IDictionary<string, int> dict = new Dictionary<string, int>();
           

            for (; photosTaken < 6; frameCount++)
            {

                
                currentFrame = grabber.QueryFrame().Resize(320, 240, Emgu.CV.CvEnum.INTER.CV_INTER_CUBIC);
                gray = currentFrame.Convert<Gray, Byte>();


                MCvAvgComp[][] facesDetected = gray.DetectHaarCascade(
                 face,
                 1.2,
                 10,
                 Emgu.CV.CvEnum.HAAR_DETECTION_TYPE.DO_CANNY_PRUNING,
                 new Size(20, 20));

                if (facesDetected[0].Length == 0)
                {
                    Console.WriteLine("Aucune personne detectee");
                    foreach (var socket in Program._clients)
                    {
                        socket.Send("{ \"Status\" : \"NOONE\" }");
                    }

                }
                else if (facesDetected[0].Length > 1)
                {
                    Console.WriteLine("Trop de monde, 1 seule personne autorisee");
                    foreach (var socket in Program._clients)
                    {
                        socket.Send("{ \"Status\" : \"TOOMANY\" }");
                    }

                }
                else {
                    if (frameCount > frameMinToWait)
                    {
                       
                        MCvAvgComp f = facesDetected[0][0];
                        Image<Gray, byte> face  = currentFrame.Copy(f.rect).Convert<Gray, byte>().Resize(100, 100, Emgu.CV.CvEnum.INTER.CV_INTER_CUBIC); ;
                        
                        //Pour reconnaitre la personne
                        MCvTermCriteria termCrit = new MCvTermCriteria(labels.Count, 0.001);
                        
                        //Eigen face recognizer
                        EigenObjectRecognizer recognizer = new EigenObjectRecognizer(
                           trainingImages.ToArray(),
                           labels.ToArray(),
                           3000,
                           ref termCrit);

                        photosTaken++;

                        
                        string userName = (recognizer.Recognize(face).ToString());
                        Console.WriteLine(recognizer.Recognize(face).ToString());
                        if (dict.ContainsKey(userName))
                            dict[userName]++;
                        else
                            dict[userName] = 0;

                        frameCount = 0;

                        foreach (var socket in Program._clients)
                        {
                            socket.Send("{ \"Status\" : \"OK\" }");
                        }

                    }
                }


            }
            grabber.Stop();
            grabber.Dispose();
            //Console.WriteLine("Verdict : "+getMostSignificantKey(dict));
            
            return getMostSignificantKey(dict);
        }




        public string getMostSignificantKey(IDictionary<string,int> dic)
        {
            string mostSignificantKey = dic.Keys.ToList().ElementAt(0);
            foreach ( string userName in dic.Keys)
            {
                if (dic[mostSignificantKey] < dic[userName])
                    mostSignificantKey = userName;
            }
            return mostSignificantKey;
        }

    }
}
