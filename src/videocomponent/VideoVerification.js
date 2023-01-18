import React, {useEffect, useState} from "react";
import {ENDPOINTS} from "../helper/endpoints";
import axios from "axios";
import {getHeaders} from "../helper/Common";
import {Card, Button} from "react-bootstrap";
import "../css/style.css";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

function VideoVerification() {
    const [videos, setVideos] = useState([])
    const [failedMessage, setFailedMessage] = useState([])
    const [showFailedMessage, setShowFailedMessage] = useState(false)

    useEffect(() => {
        fetchAllPendingVideo();
    }, []);

    const fetchAllPendingVideo = () => {
        const reqURL = ENDPOINTS.VIDEOS_FOR_VERIFICATION + "?tag=PENDING"
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

    const approveOrDeniedVideo = (tag, obj, reason) => {
        if (tag == "approve") {
            tag = "APPROVE"
        } else if (tag == "denied") {
            tag = "DENIED"
        }


        const reqURL = ENDPOINTS.APPROVE_OR_DENIED + "?video_id=" + obj.video_id + "&video_status=" + tag + "&reason=" + reason

        axios
            .post(reqURL, {}, {headers: getHeaders})
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

    const showApproveDeniedAlert = (tag, obj) => {
        if (tag == "approve") {
            Swal.fire({
                title: "Are you sure to approve the video",
                icon: "success",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {

                    approveOrDeniedVideo(tag, obj, "")
                }
            });
        }
        if (tag == "denied") {
            Swal.fire({
                title: "Are you sure to denied the video",
                icon: "warning",
                confirmButtonText: "OK",
            }).then(async (result) => {
                if (result.isConfirmed) {

                    const {value: reason} = await Swal.fire({
                        title: "Video Denied",
                        input: 'text',
                        inputLabel: 'Give a valid reason for denied video',
                        inputPlaceholder: 'Enter your reason'
                    })
                    if (reason) {
                        approveOrDeniedVideo(tag, obj, reason)
                    }
                }
            });
        }

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
                    <input className="btn deniedBtn" type="submit" value="Denied"
                           onClick={() => showApproveDeniedAlert("denied", videoInfo)}/>
                    <input className="btn approvedBtn" type="submit" value="Approved"
                           onClick={() => showApproveDeniedAlert("approve", videoInfo)}/>

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

export default VideoVerification