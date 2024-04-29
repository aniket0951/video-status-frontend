import React, { useEffect, useState } from 'react'
import { Card, Button } from "react-bootstrap";
import "../css/style.css";
import axios from "axios";
import { ENDPOINTS } from "../helper/endpoints";
import Swal from "sweetalert2";
import deleteImg from "../asserts/delete.png";
import "../helper/Common";
import { getHeaders, getMultipartHeaders } from "../helper/Common";

function InActiveVideos() {
    const [videoData, setAllVideosData] = useState([]);
    const [isVideoAvailabel, setIsVideoAvailabel] = useState(false);

    console.log("InActive get called...");
    useEffect(() => {
        fetchAllVideos();
    }, [setAllVideosData]);

    const active_video = (video_data) => {
        console.log("Active Video : ", video_data);
        axios
            .post(ENDPOINTS.ACTIVE_VIDEOS + video_data.id + "/ACTIVE", {}, { headers: getHeaders })
            .then(response => {
                console.log("Response Code : ", response);
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
            .catch(error => {
                // setIsVideoAvailabel()
                console.log("Active Videos Error : ", error);
            })
    }

    const renderAllVideos = (videoInfo, index) => {
        return (
            <Card
                style={{ width: "31rem", height: "400px" }}
                key={index}
                className="box"
            >
                <Card.Img
                    style={{ width: "20px", marginLeft: "auto", marginRight: "25px", marginTop: "10px" }}
                    src={deleteImg} // <-- Ensure this is the correct variable containing the image source
                />
                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ width: "100%", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <video width={400} height={200} controls>
                            <source src={videoInfo.video_path} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div>
                        <Card.Title>{videoInfo.video_title} </Card.Title>
                        <Card.Text>{videoInfo.video_desc}</Card.Text>
                        <Card.Text>{videoInfo.created_at.substring(0, 10)}</Card.Text>
                    </div>
                    <Button onClick={() => active_video(videoInfo)}>ACTIVE</Button>
                </Card.Body>
            </Card>
        );
    };


    const fetchAllVideos = () => {
        axios
            .get(ENDPOINTS.GET_ALL_VIDEOS + "/INACTIVE", { headers: getHeaders })
            .then((response) => {
                setAllVideosData(response.data.video_data);
                setIsVideoAvailabel(false)
            })
            .catch((error) => {
                setIsVideoAvailabel(true)
                console.log("Catch Error : ", error);
            });
    };
    return (
        <>
            {isVideoAvailabel ? <h1>Video Not Availabel </h1> :
                <div className="grid">{videoData.map(renderAllVideos)}</div>
            }
        </>
    )
}

export default InActiveVideos