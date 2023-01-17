import React, {useEffect, useState} from "react";
import {ENDPOINTS} from "../helper/endpoints";
import axios from "axios";
import {getHeaders} from "../helper/Common";
import { Card, Button } from "react-bootstrap";
import "../css/style.css";

function VideoVerification() {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        fetchAllPendingVideo();
    }, []);

    const fetchAllPendingVideo =  () => {
        const reqURL = ENDPOINTS.VIDEOS_FOR_VERIFICATION + "?tag=PENDING"
        axios
            .get(reqURL, {headers: getHeaders})
            .then(response => {
                setVideos(response.data.video_verification)
            })
            .catch(error => {
                console.log("API Error", error)
            })
    }

    const renderAllVideos = (videoInfo, index) => {
        return (
            <Card
                style={{ width: "55rem", height: "auto" }}
                key={index}
                className="box"
            >

                <Card.Body>
                    <video width={300}   controls>
                        <source src={videoInfo.video_info[0].video_path}></source>
                    </video>
                </Card.Body>
                <Card.Title  style={{color:"orange", fontWeight: "bold", margin:"5px"}} >{videoInfo.verification_status}</Card.Title>

                <Card.Text  >Title : {videoInfo.video_info[0].video_title}</Card.Text>
                <Card.Text  > Description : {videoInfo.video_info[0].video_desc}</Card.Text>
                <Card.Text >Uploaded On : {videoInfo.video_info[0].created_at}</Card.Text>
            </Card>
        );
    };


    return(
        <>
            <div className="grid">{videos.map(renderAllVideos)}</div>
        </>
    )
}

export default VideoVerification