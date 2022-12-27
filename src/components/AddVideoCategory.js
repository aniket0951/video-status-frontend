import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import "../css/style.css";
import { ENDPOINTS } from "../helper/endpoints";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

function AddVideoCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const userAuthToken = Cookies.get("authToken");

  const addNewCategory = () => {
    const requestOption = {
      category_name: categoryName,
      category_desc: categoryDesc,
      is_category_active: true,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: userAuthToken,
    };

    axios
      .post(ENDPOINTS.ADD_VIDEO_CATEGORY, requestOption, { headers: headers })
      .then((response) => {
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops..." + error.response.data.error,
          text: "Something went wrong!",
        });
      });
  };

  return (
    <div>
      <form className="add-video-cat-card">
        <h1 style={{ padding: 10 }}>Add Category</h1>
        <div className="mb-3">
          <label>Category Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Category Description</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Enter password"
            value={categoryDesc}
            onChange={(e) => setCategoryDesc(e.target.value)}
          />
        </div>
      </form>
      <input
        className="btn btn-primary add-cat-btn"
        type="submit"
        value="Submit"
        onClick={() => addNewCategory()}
      />
    </div>
  );
}

export default AddVideoCategory;
