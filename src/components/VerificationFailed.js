import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "../css/style.css";
import axios from "axios";
import Cookies from "js-cookie";
import { ENDPOINTS } from "../helper/endpoints";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";


function VerificationFailed() {

    const userAuthToken = Cookies.get("authToken");
    const navigation = useNavigate()

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
        const url = ENDPOINTS.FETCH_VERIFICATION_FAILED + "/1/10"
        axios
          .get(url, { headers: headers })
          .then((response) => {
            setAllVideosData(response.data.video_data);
          })
          .catch((error) => {
            setAllVideosData([])
            setvideoNotAvailable(true);
          });
    };

    const nevigateToShowFullDetailOfVideo = (obj) => {
      obj["call_for"] = "VERIFY_VIDEO_DETAILS"
      navigation("/video-full-details",{ state: obj })
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
            <Card.Subtitle style={{marginTop:"5px"}}>UploadAt : {videoInfo.uploaded_at}</Card.Subtitle>
            <Card.Subtitle style={{marginTop:"5px"}}>VerifiedAt  : {videoInfo.verify_at}</Card.Subtitle>
            <Button style={{margin:"5px", color:"white", backgroundColor:"green"}} >Publish Video</Button>
            <Button style={{margin:"5px", color:"white", backgroundColor:"red"}}  >Reject Publish</Button>
            <Button style={{ position: "absolute", right: 15, margin:"5px" }} onClick={()=> nevigateToShowFullDetailOfVideo(videoInfo)}>show full details</Button>

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

export default VerificationFailed;