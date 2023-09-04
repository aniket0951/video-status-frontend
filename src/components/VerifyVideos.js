import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "../css/style.css";
import axios from "axios";
import Cookies from "js-cookie";
import { ENDPOINTS } from "../helper/endpoints";
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';

function VerifyVideos(){
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
        const url = ENDPOINTS.FETCH_VERIFY_VIDEOS + "/1/10"
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
    };

    const showUnPublishWarning= (obj) => {
      Swal.fire({
        title: "Reject Publish Video",
        icon: "warning",
        text:"are you sure to reject publish the video",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          //UnVerifyVideo(obj)
          showDailogTaikingReason(obj)
        }
      });
    };
  
    const showDailogTaikingReason = (obj) => {
      Swal.fire({
        title: 'Give the reason to reject the publish video',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Done',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          obj["reason"] = result.value
          rejectPublishVideo(obj);
        }
      })
    };

    const ShowSuccessDialog= (message) =>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
      })
    }

    const rejectPublishVideo = (obj) => {
      const requestOption = {
        "video_id":obj.video_id,
        "status":"VIDEO_UNPUBLISHED",
        "reason":obj.reason
      }

      axios
      .post(ENDPOINTS.REJECT_PUBLISH_VIDEO, requestOption, {headers:headers})
      .then(response => {
        ShowSuccessDialog(response.data.message)
        setAllVideosData([])
        fetchAllVideos()
      })
      .catch(error =>{
        alert(error)
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
            <Button style={{margin:"5px", color:"white", backgroundColor:"green"}} onClick={()=> publishVideo(videoInfo.video_id)} >Publish Video</Button>
            <Button style={{margin:"5px", color:"white", backgroundColor:"red"}} onClick={()=> showUnPublishWarning(videoInfo)} >Reject Publish</Button>
            
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

export default VerifyVideos;