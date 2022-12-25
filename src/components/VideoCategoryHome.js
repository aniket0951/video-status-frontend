import React, { useEffect, useState } from "react";
import "../css/style.css";
import Table from 'react-bootstrap/Table';
import Cookies from 'js-cookie'
import axios from "axios";
import { ENDPOINTS } from "../helper/endpoints";

function VideoCategoryHome() {
  const userAuthToken = Cookies.get("authToken")

  const [videoCategory, setVideoCategory] = useState([])

  useEffect(() => {
    if (videoCategory.length <= 0){
      fetchAllVideoCat()
    }
    
  })

  const fetchAllVideoCat= () => {
    const headers = {
      'Content-Type' : "application/json",
      'Authorization': userAuthToken
    }
    axios
    .get(ENDPOINTS.GET_ALL_VIDEO_CATEGORY, {headers:headers})
    .then(response => {
      console.log(response.data.video_data[0].is_category_active);
      setVideoCategory(response.data.video_data)
    })
    .catch(error=> {
      console.log(error.response.data.error);
    })
  }

  return (
    <>
    <div >
    <Table striped bordered hover>
      <thead>
        <tr>

          <th>Video Id</th>
          <th>Category Name</th>
          <th>Category Description</th>
          <th>Is Category Active</th>
          <th>Created At</th>

        </tr>
      </thead>
      <tbody>
        {videoCategory.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
          <td>{item.category_name}</td>
          <td>{item.category_desc}</td>
          {item.is_category_active ? (<td style={{ backgroundColor: "green", color:"white", fontWeight:"bold",
        textAlign:"center"
        }}>Active</td>):(<td style={{ backgroundColor: "red", color:"white", fontWeight:"bold",
        textAlign:"center"
        }}>Not-Active</td>)}
          <td>@{item.created_at}</td>
        </tr>
        ))}

      </tbody>
    </Table>
    </div>
    </>

  );
}

export default VideoCategoryHome;
