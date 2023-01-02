import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "../css/style.css";
import axios from "axios";
import Cookies from "js-cookie";
import { ENDPOINTS } from "../helper/endpoints";
function AdminHome() {
  const location = useLocation();
  const userAuthToken = Cookies.get("authToken");
  const [openUploadVideo, setOpenUploadVideo] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [myFile, setFile] = useState();

  const headers = {
    "Content-Type": "application/json",
    Authorization: userAuthToken,
  };

  const [videoData, setAllVideosData] = useState([]);

  useEffect(() => {
    fetchAllVideos();
  }, []);

  const fetchAllVideos = () => {
    axios
      .get(ENDPOINTS.GET_ALL_VIDEOS, { headers: headers })
      .then((response) => {
        setAllVideosData(response.data.video_data);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  const showUploadVideo = () => {
    setOpenUploadVideo(true);
  };

  const renderAllVideos = (videoInfo, index) => {
    return (
      <Card
        style={{ width: "31rem", height: "350px" }}
        key={index}
        className="box"
      >
        <Card.Body>
          <video width={400} height={200} controls>
            <source src={videoInfo.video_path}></source>
          </video>
        </Card.Body>
        <Card.Title>{videoInfo.video_title}</Card.Title>
        <Card.Title>{videoInfo.video_desc}</Card.Title>
        <Card.Title>{videoInfo.created_at}</Card.Title>
      </Card>
    );
  };

  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      myFile,
      myFile.name
    );

    // Details of the uploaded file
    console.log(myFile);

    // Request made to the backend api
    // Send formData object
    // axios.post("api/uploadfile", formData);
  };

  return (
    <>
      {openUploadVideo ? (
        <div>
          <Card style={{ width: "31rem", height: "350px" }} className="box">
            <Card.Body>
              <Card.Title>
                <div>
                  <label>Video title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter user name"
                    value={videoTitle}
                    onChange={(event) => setVideoTitle(event.target.value)}
                  />
                </div>
              </Card.Title>
              <Card.Title>
                <div>
                  <label>Video Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter user name"
                    value={videoDesc}
                    onChange={(event) => setVideoDesc(event.target.value)}
                  />
                </div>
              </Card.Title>
              <Card.Title>
                <div>
                  <label>Video File</label>
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Enter user name"
                    value={videoDesc}
                    onChange={(event) => setFile(event.target.files[0])}
                  />
                </div>
              </Card.Title>
              <Button onClick={() => onFileUpload()} >Up</Button>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <Button
              style={{ marginTop: "10px" }}
              onClick={() => showUploadVideo()}
            >
              Upload Video
            </Button>
          </div>
          <div className="grid">{videoData.map(renderAllVideos)}</div>
        </>
      )}
    </>
  );
}

export default AdminHome;
