import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "../css/style.css";
import axios from "axios";
import Cookies from "js-cookie";
import { ENDPOINTS } from "../helper/endpoints";
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';

function PublishVideos() {

   const userAuthToken = Cookies.get("authToken");

    const headers = {
        "Content-Type": "application/json",
        Authorization: userAuthToken,
      };
    
    const [videoData, setAllVideosData] = useState([]);
    const [videoNotAvailable, setvideoNotAvailable] = useState(false)

    useEffect(() => {
        fetchAllVideos();
    
      }, []);

    const fetchAllVideos = () => {
        console.log("Fetch all video get called");
        const url = ENDPOINTS.FETCH_PUBLISH_VIDEO + "/1/10"
        axios
          .get(url, { headers: headers })
          .then((response) => {
            //console.log("Video API Response : ", response.data.data);
            setAllVideosData(response.data.video_data);
          })
          .catch((error) => {
            alert(error.response.data.message);
            setAllVideosData([])
            setvideoNotAvailable(true);
          });
    };

    const publishVideo = (vid) =>{
      console.log("Video going to published : " + vid);
      const reqUrl = ENDPOINTS.PUBLISH_VIDEO + "/" + vid
      axios
      .post(reqUrl, null, {headers:headers})
      .then(response => {
        Swal.fire({
          title: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            fetchAllVideos()
          }
        });
      })
      .catch(error =>{
        console.log("Error Excpected : " + error);
      })
    }
      

    const renderAllVideos = (videoInfo, index) => {
        return (
          <Card
            style={{ width: "60rem", height: "400px" }}
            key={index}
            className="box"
          >
            <Card.Body>
              <video width={400} height={200} style={{margin:"auto"}} controls>
                <source src={videoInfo.video_address} type="video/mp4" ></source>
              </video>
              
            <Card.Title >Title : {videoInfo.video_title}</Card.Title>
            <Card.Subtitle style={{color:"red"}}>{videoInfo.status}</Card.Subtitle>
            <Card.Subtitle style={{marginTop:"5px"}}>UploadAt : {videoInfo.uploaded_at}</Card.Subtitle>
            <Card.Subtitle style={{marginTop:"5px"}}>VerifiedAt  : {videoInfo.verify_at}</Card.Subtitle>
            <Button variant="primary" style={{marginTop:"5px", color:"white", backgroundColor:"green"}} onClick={()=> publishVideo(videoInfo.video_id)} >UnPublish Video</Button>
            </Card.Body>
    
          </Card>
        );
      };  
    
      return (
        <>
        {videoNotAvailable?(<h1>video not available</h1>)
        :
        (
          <div className="grid">{videoData.map(renderAllVideos)}</div>
        )}
         
        </>
      );
}

export default PublishVideos;