import React, { useEffect, useState } from "react";
import "../css/style.css";
import Table from "react-bootstrap/Table";
import Cookies from "js-cookie";
import axios from "axios";
import { ENDPOINTS } from "../helper/endpoints";
import DataTable from "react-data-table-component";
import { Container, Card, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";
function VideoCategoryHome() {
  const userAuthToken = Cookies.get("authToken");
  const [videoCategory, setVideoCategory] = useState([]);
  const [videoCatId, setVideoCatId] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [categoryDesc, setCategoryDesc] = useState("")
  const [isCategoryActive, setCategoryActive] = useState(true)
  const [openUpdateCat, setOpenUpdateCat] = useState(false)

  const headers = {
    "Content-Type": "application/json",
    Authorization: userAuthToken,
  };

  useEffect(() => {
    fetchAllVideoCat();
  }, []);

  const fetchAllVideoCat = () => {
    axios
      .get(ENDPOINTS.GET_ALL_VIDEO_CATEGORY, { headers: headers })
      .then((response) => {
        console.log(response.data.video_data[0].is_category_active);
        setVideoCategory(response.data.video_data);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  const deleteVideoCat = (cat_id) => {
    
    axios.delete(ENDPOINTS.DELETE_VIDEO_CATEGORY+"?"+"category_id="+cat_id, {
      headers: {
        Authorization: userAuthToken
      }
    })
    .then((response) => {
      Swal.fire({
        title: "Success",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      setVideoCategory(current => current.filter(videoCategory => {
        return videoCategory.id != cat_id;
      }))
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops..." + error.response.data.error,
        text: "Something went wrong!",
      });
    })
  };

  const openForUpdate = (obj) => {
    setVideoCatId(obj.id)
    setCategoryName(obj.category_name)
    setCategoryDesc(obj.category_desc)
    setCategoryActive(obj.is_category_active)
    setOpenUpdateCat(true)
  }

  return (
    <>
      <div className="App">
        <Container className="p-4">
          {videoCategory.map((item) => (
            <Col className="card-videocat">
              <Card className="card-videocat">
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>{item.category_name}</Card.Title>
                  <Card.Text>{item.category_desc}</Card.Text>
                  {item.is_category_active ? (
                    <Card.Subtitle style={{ color: "green" }}>
                      Active
                    </Card.Subtitle>
                  ) : (
                    <Card.Subtitle style={{ color: "red" }}>
                      Not Active
                    </Card.Subtitle>
                  )}

                  <Button variant="primary" style={{ margin: "10px" }} onClick={() => openForUpdate(item)}>
                    Update{" "}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => deleteVideoCat(item.id)}
                  >
                    Delete{" "}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Container>
      </div>
    </>
  );
}

export default VideoCategoryHome;
