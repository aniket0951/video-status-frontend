import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "../css/style.css";
import axios from "axios";
import { ENDPOINTS } from "../helper/endpoints";
import Swal from "sweetalert2";
import deleteImg from "../asserts/delete.png";
import "../helper/Common";
import { getHeaders, getMultipartHeaders } from "../helper/Common";
import { json } from "react-router-dom";

function AdminHome() {
  const [openUploadVideo, setOpenUploadVideo] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [myFile, setFile] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState("");
  const [videoCategory, setAllVideoCategory] = useState([])
  const [videoCatId, setVideoCatId] = useState("")
  const [videoData, setAllVideosData] = useState([]);

  useEffect(() => {
    fetchAllVideos();
  }, [setAllVideosData]);



  const fetchAllVideos = () => {
    axios
      .get(ENDPOINTS.GET_ALL_VIDEOS+"/ACTIVE", { headers: getHeaders })
      .then((response) => {
        setAllVideosData(response.data.video_data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchVideoCategory = () => {
    axios
      .get(ENDPOINTS.GET_ALL_VIDEO_CATEGORY, { headers: getHeaders })
      .then(response => {
        setAllVideoCategory(response.data.video_data)
        if (response.data.video_data.length >= 1) {
          setVideoCatId(response.data.video_data[0]["id"])
        }
      })
      .catch(error => {
        alert(error.response.data.error)
      })
  }

  const showUploadVideo = () => {
    setOpenUploadVideo(true);
    fetchVideoCategory()
  };

  const showDeleteWarning = (obj) => {
    Swal.fire({
      title: "Delete Video",
      icon: "warning",
      text: "are you sure to delete the video",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteVideo(obj)
      }
    });
  }
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("video", myFile);
    formData.append("thumbnail", thumbnailFile)
    formData.append("desc", videoDesc);
    formData.append("is_active", true);
    formData.append("video_cat_id", videoCatId);

    axios
      .post(ENDPOINTS.UPLOAD_VIDEO, formData, { headers: getMultipartHeaders })
      .then(response => {
        Swal.fire({
          title: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            setOpenUploadVideo(false)
            fetchAllVideos()
          }
        });

      })
      .catch(error => {
        Swal.fire({
          title: error.response.data.message,
          icon: "error",
          text: error.response.data.error,
          confirmButtonText: "OK",
        });
      })

  };

  const inactiveVideo=(videoInfo) => {
    axios
        .post(ENDPOINTS.ACTIVE_VIDEOS + videoInfo.id + "/INACTIVE", {}, { headers: getHeaders })
        .then(response => {
            console.log("Response Code : ", response);
            Swal.fire({
                title: response.data.message,
                icon: "success",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                  setAllVideosData([])
                    fetchAllVideos()
                }
            });
        })
        .catch(error => {
            // setIsVideoAvailabel()
            console.log("Active Videos Error : ", error);
        })
  }

  const deleteVideo = (obj) => {
    console.log("delet id ==> ", obj.id);
    const requestURL = ENDPOINTS.DELETE_VIDEO + "?video_id=" + obj.id
    axios
      .delete(requestURL, { headers: getHeaders })
      .then(response => {
        Swal.fire({
          title: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            setAllVideosData((current) =>
              current.filter((video) => {
                return video.id !== obj.id;
              })
            );
          }
        });
      })
      .catch(error => {
        Swal.fire({
          title: error.response.data.error,
          icon: "error",
          confirmButtonText: "OK",
        })
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
          onClick={() => showDeleteWarning(videoInfo)}
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
          <Button style={{display:"flex", justifyContent:"center", width:100}} onClick={() => inactiveVideo(videoInfo)}>InActive</Button>
        </Card.Body>
      </Card>
    );
  };


  return (
    <>
      {openUploadVideo ? (
        <div>
          <Card style={{ width: "31rem", height: "400px" }} className="box">
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
                    onChange={(event) => setFile(event.target.files[0])}
                  />
                </div>
              </Card.Title>
              <Card.Title>
                <div>
                  <label>Video Thumbnail</label>
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Enter user name"
                    onChange={(event) => setThumbnailFile(event.target.files[0])}
                  />
                </div>
              </Card.Title>
              <Card.Text>
                <label>
                  Select video category
                </label>
                <div>

                  <select value={videoCatId} onChange={(e) => setVideoCatId(e.target.value)}>
                    {videoCategory.map((video) => (
                      <option value={video.id} >{video.category_name}</option>
                    ))}
                  </select>

                </div>
              </Card.Text>
              <Button onClick={() => onFileUpload()} >Upload</Button>
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
