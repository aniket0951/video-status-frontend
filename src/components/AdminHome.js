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

  const headers = {
    "Content-Type": "application/json",
    Authorization: userAuthToken,
  };

  const [videoData, setAllVideosData] = useState([]);

  useEffect(() => {fetchAllVideos()},[]);

  const fetchAllVideos = () => {
    axios
    .get(ENDPOINTS.GET_ALL_VIDEOS, {headers:headers})
    .then(response => {
      setAllVideosData(response.data.video_data)
    })
    .catch(error => {
      alert(error.response.data.error)
    })
  };

  const data = [
    { username: "First Name", email: "bdbfb" },
    { username: "last Name", email: "bdbfb" },
  ];

  const renderAllVideos = (videoInfo, index) => {
    return (
      <Card style={{ width: "31rem", height:"350px" }} key={index} className="box">
        <Card.Body>
          <video width={400} height={200} controls>
            <source src={videoInfo.video_path}></source>
          </video>
        </Card.Body>
        <Card.Title >{videoInfo.video_title}</Card.Title>
        <Card.Title >{videoInfo.video_desc}</Card.Title>
        <Card.Title >{videoInfo.created_at}</Card.Title>
      </Card>
    );
  };
  return (
    <>
      <div className="grid">{videoData.map(renderAllVideos)}</div>
    </>
  );
}

export default AdminHome;
