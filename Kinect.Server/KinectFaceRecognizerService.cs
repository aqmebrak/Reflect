using System;
using System.Net;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Collections.Generic;
using System.Linq;
using Kinect.FaceRecog;
using System.Web.Script.Serialization;
using Kinect.Server;
using FaceRecogConsole;

namespace Kinect.Service {

    [ServiceBehavior(InstanceContextMode = InstanceContextMode.Single)]
    public class KinectFaceRecognizerService : IKinectFaceRecognizerService
    {


        public RequestStatus RecordUser(string name)
        {

            Program.facerecognizer.recordSamplesFromWebCam(name);
            RequestStatus a = new RequestStatus();
            a.Status = "OK";
            a.Data = name;
            return a;
         
        }



        public RequestStatus GetUserName()
        {
            string userName = "null";
            try {
                foreach (var socket in Program._clients)
                {
                    socket.Send("{ \"Status\" : \"CONNECTED\" }");
                }

                userName = Program.facerecognizer.recognizeUser();
            }
            catch
            {
                userName = "unkown";
            }
            RequestStatus a = new RequestStatus();
            a.Status = "OK";
            a.Data = userName;
            return a;
        }
    }
}
