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

function AdminHome() {
  const location = useLocation();
  const userAuthToken = Cookies.get("authToken");
  const [openUploadVideo, setOpenUploadVideo] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [myFile, setFile] = useState("");
  const [videoCategory, setAllVideoCategory] = useState([])
  const [videoCatId, setVideoCatId] = useState("")

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
    if (!openUploadVideo){
      fetchAllVideos();
    }

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

  const fetchVideoCategory = () => {
    axios
        .get(ENDPOINTS.GET_ALL_VIDEO_CATEGORY, {headers:headers})
        .then(response => {
          setAllVideoCategory(response.data.video_data)
          if (response.data.video_data.length >= 1){
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

  const showDeleteWarning= (obj) => {
    Swal.fire({
      title: "Delete Video",
      icon: "warning",
      text:"are you sure to delete the video",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteVideo(obj)
      }
    });
  }
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("title", videoTitle);
    formData.append("video", myFile);
    formData.append("desc", videoDesc);
    formData.append("is_active", true);
    formData.append("video_cat_id", videoCatId);

    axios
        .post(ENDPOINTS.UPLOAD_VIDEO, formData, {headers:multiPartHeadr})
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

  const deleteVideo = (obj) => {
    const requestURL = ENDPOINTS.DELETE_VIDEO + "?video_id=" + obj.id
    axios
        .delete(requestURL, {headers:headers})
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
            title: error.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
          })
        })
  }

  const verifyVideo = (vid) => {
    const reqUrl = ENDPOINTS.UPDATE_VIDEO_STATUS + "video_id="+vid+"&video_status=VIDEO_VERIFY"
    axios.put(reqUrl,null,{ headers: headers })
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
        title: error.response.data.error,
        icon: "error",
        confirmButtonText: "OK",
      })
    })
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
        <Button variant="primary" style={{marginTop:"5px", color:"white", backgroundColor:"green"}} onClick={()=> verifyVideo(videoInfo.id)}>Verify Video</Button>
        </Card.Body>

      </Card>
    );
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
                    onChange={(event) => setFile(event.target.files[0])}
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
        <h2 style={{marginLeft:"10px"}}>Recent video uploaded</h2>
          
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
