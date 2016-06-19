using System.Runtime.Serialization;
using System;

namespace Kinect.FaceRecog {


  
  
  [DataContract(Namespace = "http://kinect/facerecognition",
                Name = "RequestStatus")]
  public class RequestStatus
    {

        [DataMember]
        public String Status { get; set; }

        [DataMember]
        public String Data { get; set; }

       


    }
	
	

}
