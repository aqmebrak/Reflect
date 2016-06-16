using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.ServiceModel;
using System.ServiceModel.Web;
using Kinect.FaceRecog;

namespace Kinect.Service
{
    [ServiceContract]
   public  interface IKinectFaceRecognizerService
    {
        
        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "kinect/recorduser/{name}",
                   RequestFormat = WebMessageFormat.Json,
                   ResponseFormat = WebMessageFormat.Json)]
        RequestStatus RecordUser(String name);
        

        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "kinect/getuser",
                    ResponseFormat = WebMessageFormat.Json)]
        RequestStatus GetUserName();
    }
}
