import React, { useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import { ENDPOINTS } from "../helper/endpoints";
import axios from "axios";
import Cookies from "js-cookie";
import { Card } from "react-bootstrap";
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';
import "../css/style.css";
import {useNavigate} from "react-router-dom";


function VideoFullDetails() {
    const location = useLocation()
    const userAuthToken = Cookies.get("authToken");
    const [videoData, setAllVideosData] = useState([]);
    const navigation = useNavigate()
    const headers = {
        "Content-Type": "application/json",
        Authorization: userAuthToken,
      };

    const [callDetails, setCallDetails] = useState(location.state.call_for)
    useEffect(() => {

        var  requestURL = ""
        var video_id = ""
        if (callDetails === "VIDEO_BY_ADMIN") {
            video_id = location.state.id
            requestURL = ENDPOINTS.FETCH_VIDEO_BY_ADMIN_DETAILS + "/" + video_id
        }else if (callDetails === "PUBLISH_VIDEO"){
            video_id = location.state.video_id
            requestURL = ENDPOINTS.FETCH_PUBLISH_VIDEO_DETAILS + "/" + video_id
        }else if (callDetails === "VERIFY_VIDEO_DETAILS"){
            video_id = location.state.video_id
            requestURL = ENDPOINTS.FETCH_VERIFY_VIDEO_DETAILS + "/" + video_id
        }

        console.log("Call For :  and video id : ", callDetails, video_id);


        // if (video_id === "") {
        //     alert("Unable to fetch a video details please try again...")
        // }

        // var requestURL = ENDPOINTS.FETCH_PUBLISH_VIDEO_DETAILS + "/" + video_id
        axios
        .get(requestURL,{headers:headers})
        .then(response => {
            setAllVideosData([response.data.video_data])
            console.log("API Response has been : ", response.data );
        })
        .catch(error => {
            alert(error)
        })

      }, []);
    
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
              
            <Card.Title style={{color:"green"}} >Title : {videoInfo.video_title}</Card.Title>
            <Card.Subtitle style={{color:"red"}}>{videoInfo.status}</Card.Subtitle>
            <Card.Subtitle style={{marginTop:"5px", color:"green"}}>
                <b>
                UploadAt : {videoInfo.uploaded_at}
                </b>
            </Card.Subtitle>
            {
                videoInfo.verified_at ?
                (
                    <Card.Subtitle style={{marginTop:"5px", color:"green"}}>
                        <b>
                        VerifiedAt  : {videoInfo.verified_at}
                        </b>
                    </Card.Subtitle>
                ):
                (
                    <Card.Subtitle style={{marginTop:"5px", color:"red"}}>VerifiedAt  : PENDING</Card.Subtitle>
                )
            }

            {
                videoInfo.published_at ?
                (
                    <Card.Subtitle style={{marginTop:"5px", color:"green"}}>
                        <b>
                        PublishedAt : {videoInfo.published_at}
                        </b>
                    </Card.Subtitle>
                ) :
                (
                    <Card.Subtitle style={{marginTop:"5px", color:"red"}}>PublishedAt : PENDING</Card.Subtitle>
                )
            }

            {
                videoInfo.uploaded_by ? 
                (
                    <Card.Subtitle style={{marginTop:"5px", color:"green"}}>
                        <b>Uploaded By  : {videoInfo.uploaded_by}</b>
                    </Card.Subtitle>
                ) :
                (
                    <Card.Subtitle style={{marginTop:"5px", color:"red"}}>Uploaded By  : PENDING</Card.Subtitle>
                )
            }

            {
                videoInfo.verified_by ?
                (
                    <Card.Subtitle style={{marginTop:"5px", color:"green"}}>
                        <b>
                        Verified By  : {videoInfo.verified_by}
                        </b>
                    </Card.Subtitle>

                ) : 
                (
                     <Card.Subtitle style={{marginTop:"5px", color:"red"}}>Verified By  : PENDING</Card.Subtitle>

                )
            }

            {
                videoInfo.published_by ?
                (
                    <Card.Subtitle style={{marginTop:"5px", color:"green"}}>
                        <b>
                        Published By : {videoInfo.published_by}
                        </b>
                    </Card.Subtitle>
                ) :
                (
                     <Card.Subtitle style={{marginTop:"5px", color:"red"}}>Published By : PENDING</Card.Subtitle>
                )
            }

            
            </Card.Body>
    
          </Card>
        );
    };  
    return (
        <div className="grid">{videoData.map(renderAllVideos)}</div>
    )
}

export default VideoFullDetails;