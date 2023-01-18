import React, {useEffect, useState} from "react";
import {ENDPOINTS} from "../helper/endpoints";
import axios from "axios";
import {getHeaders} from "../helper/Common";
import Swal from "sweetalert2";
import {Card} from "react-bootstrap";

function VideoPublish() {
    const [videos, setVideos] = useState([])
    const [failedMessage, setFailedMessage] = useState([])
    const [showFailedMessage, setShowFailedMessage] = useState(false)

    useEffect(() => {
        fetchAllPendingVideo();
    }, []);

    const fetchAllPendingVideo = () => {
        const reqURL = ENDPOINTS.VIDEOS_FOR_VERIFICATION + "?tag=APPROVE"
        axios
            .get(reqURL, {headers: getHeaders})
            .then(response => {
                setVideos(response.data.video_verification)
            })
            .catch(error => {
                setShowFailedMessage(true)
                setFailedMessage(error.response.data.error)
            })
    }

    const approveOrDeniedVideo = (obj) => {

        const reqBody = {
            "video_id": obj.video_id,
            "is_publish": true
        }
        axios
            .post(ENDPOINTS.VIDEO_PUBLISHED, reqBody, {headers: getHeaders})
            .then(response => {
                Swal.fire({
                    title: "Video",
                    text: response.data.message,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        setVideos((current) =>
                            current.filter((videoCategory) => {
                                return videoCategory.id !== obj.id;
                            })
                        );
                    }
                });
            })
            .catch(error => {
                console.log("API Error => ", error)
            })

    }

    const showApproveDeniedAlert = (obj) => {
        Swal.fire({
            title: "Are you sure to published the video",
            icon: "success",
            confirmButtonText: "OK",
        }).then((result) => {
            if (result.isConfirmed) {

                approveOrDeniedVideo(obj)
            }
        });
    }

    const renderAllVideos = (videoInfo, index) => {
        return (
            <Card
                style={{width: "55rem", height: "auto"}}
                key={index}
                className="box"
            >

                <Card.Body>
                    <video width={300} controls>
                        <source src={videoInfo.video_info[0].video_path}></source>
                    </video>
                </Card.Body>
                <Card.Title style={{
                    color: "orange",
                    fontWeight: "bold",
                    margin: "5px"
                }}>{videoInfo.verification_status}</Card.Title>

                <Card.Text>{videoInfo.video_info[0].video_title}</Card.Text>
                <Card.Text>{videoInfo.video_info[0].video_desc}</Card.Text>
                <Card.Text>{videoInfo.video_info[0].created_at}</Card.Text>
                <Card.Text>
                    <input className="btn approvedBtn" type="submit" value="PUBLISHED"
                           onClick={() => showApproveDeniedAlert(videoInfo)}/>

                </Card.Text>
            </Card>
        );
    };


    return (
        <>
            {showFailedMessage ? (<h1 className={"failedMessage, center"}>{failedMessage}</h1>) : (
                <div className="grid">{videos.map(renderAllVideos)}</div>)}

        </>
    )
}

export default VideoPublish