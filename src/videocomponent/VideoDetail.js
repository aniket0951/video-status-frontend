import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function VideoDetail() {
    const location = useLocation()
    const [userData, setUserData] = useState([])
    const [videoData, setVideoData] = useState([])
    const [videoPath, setVideoPath] = useState("")
    const [showVideoView, setVideoView] = useState(false)

    useEffect(() => {
        // console.log(location.state.video_data[0].videos_data)
        // setVideoData(location.state.video_data[0].videos_data)
        // setUserData(location.state.video_data[0].user_data)
        // const path = "http://localhost:5000/" + videoData[0].video_path
        // setVideoPath(path)

        console.log(location.state.newData)
        setVideoPath(location.state.video_path)
        if (videoPath != "") {
            setVideoView(true)
        }

    })

    const renderVideo = () => {
        return (
            <>
                <video width={300} height={200} style={{margin: "10px"}} controls>
                    <source src={videoPath} type={"video/mp4"}></source>
                </video>

            </>
        )
    }

    return (
        <>
            {showVideoView ? (renderVideo()) : (<h2>Video not available</h2>)}
        </>
    )
}

export default VideoDetail