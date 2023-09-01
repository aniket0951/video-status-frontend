import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../css/style.css";
import axios from "axios";
import Cookies from "js-cookie";
import { ENDPOINTS } from "../helper/endpoints";
import Swal from "sweetalert2";
import delteImg from "../asserts/delete.png";
import Button from 'react-bootstrap/Button';

function VerifyVideos(){
    const userAuthToken = Cookies.get("authToken");

    const headers = {
        "Content-Type": "application/json",
        Authorization: userAuthToken,
      };
    
      const multiPartHeadr = {
        "Content-Type": "multipart/form-data",
        Authorization: userAuthToken,
      }
    
      const [videoData, setAllVideosData] = useState([]);

    useEffect(() => {
        fetchAllVideos();
    
      }, []);

      const fetchAllVideos = () => {
        console.log("Fetch all video get called");
        const url = ENDPOINTS.GET_ALL_VIDEOS_BY_ADMIN + "/" + "1/10"
        axios
          .get(url, { headers: headers })
          .then((response) => {
            //console.log("Video API Response : ", response.data.data);
            setAllVideosData(response.data.data);
          })
          .catch((error) => {
            alert(error.response.data.error);
          });
      };
      
    const showDeleteWarning= (obj) => {
        Swal.fire({
          title: "Delete Video",
          icon: "warning",
          text:"are you sure to delete the video",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            //deleteVideo(obj)
          }
        });
      }
    const renderAllVideos = (videoInfo, index) => {
        return (
          <Card
            style={{ width: "50rem", height: "400px" }}
            key={index}
            className="box"
          >
            <Card.Img onClick={() => showDeleteWarning(videoInfo)}  style={{ width:"15px", marginLeft:"auto", marginRight:"25px", marginTop:"10px"}} src={delteImg} />
            <Card.Body>
              <video width={400} height={200} style={{margin:"auto"}} controls>
                <source src={videoInfo.file_address} type="video/mp4" ></source>
              </video>
              
            <Card.Title >Title : {videoInfo.title}</Card.Title>
            <Card.Subtitle style={{color:"red"}}>{videoInfo.status}</Card.Subtitle>
            <Card.Subtitle style={{marginTop:"5px"}}>UploadAt : {videoInfo.created_at}</Card.Subtitle>
            <Button variant="primary" style={{marginTop:"5px", color:"white", backgroundColor:"green"}} >Verify Video</Button>
            </Card.Body>
    
          </Card>
        );
      };
    
      return (
        <>
         <div className="grid">{videoData.map(renderAllVideos)}</div>
        </>
      );
}

export default VerifyVideos;