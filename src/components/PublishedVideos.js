import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "../css/style.css";
import axios from "axios";
import Cookies from "js-cookie";
import { ENDPOINTS } from "../helper/endpoints";
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";


function PublishVideos() {
  const navigation = useNavigate()
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
      const reqUrl = ENDPOINTS.UNPUBLISH_VIDEO + "/" + vid
      console.log("Video going to published : " + reqUrl);
      axios
      .put(reqUrl, null, {headers:headers})
      .then(response => {
        Swal.fire({
          title: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            setAllVideosData([])
            fetchAllVideos()
          }
        });
      })
      .catch(error =>{
        console.log("Error Excpected : " + error);
      })
    }

    const nevigateToShowFullDetailOfVideo = (obj) => {
      obj["call_for"] = "PUBLISH_VIDEO"
      navigation("/video-full-details",{ state: obj })
      //console.log("OBJ : ", obj);
    };
          

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
            <Card.Subtitle style={{marginTop:"5px"}}>PublishedAt : {videoInfo.published_at}</Card.Subtitle>
            <Card.Subtitle style={{marginTop:"5px"}}>VerifiedAt  : {videoInfo.verified_at}</Card.Subtitle>
            <Button variant="primary" style={{marginTop:"5px", color:"white", backgroundColor:"green"}} onClick={()=> publishVideo(videoInfo.video_id)} >UnPublish Video</Button>
            <Button style={{ position: "absolute", right: 15, marginTop:"5px" }} onClick={()=> nevigateToShowFullDetailOfVideo(videoInfo)}>show full details</Button>
            
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