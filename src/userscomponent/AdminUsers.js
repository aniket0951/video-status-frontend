import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {ENDPOINTS} from "../helper/endpoints";
import "../css/style.css"
import {  Card, Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

function AdminUsers() {
    const navigation = useNavigate()
    const [users, setAllAdminUsers] = useState([])

    const userAuthToken = Cookies.get("authToken")

    const headers = {
        "Content-Type": "application/json",
        Authorization: userAuthToken,
    };

    useEffect(()=>{
        fetchAllAdminUsers()
    },[])

    const fetchAllAdminUsers = () => {
        const url = ENDPOINTS.GET_ALL_ADMIN_USERS+"1/10"
        const userAuthToken = Cookies.get("authToken")
        axios
            .get(url, { headers: headers })
            .then(response => {
                setAllAdminUsers(response.data.user_data)
            })
            .catch(error => {
                alert(error.response.data.error)
            })
    }

    const updateUserInfo = (userData) => {
        navigation("/update-user",{ state: userData })
    }

    const deleteConfirmation= (userId) => {
        Swal.fire({
            title: "Account Delete ",
            icon: "error",
            text: "Are you sure to delete account ?",
            confirmButtonText: "Delete",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAdminUser(userId)
            }
        }); 
    }

    const deleteAdminUser= (userId) => {
        const reqUrl = ENDPOINTS.DELETE_ADMIN_USER + "?userId=" + userId

        axios
        .delete(reqUrl, {headers:headers})
        .then(response => {
            Swal.fire({
                title: response.data.message,
                icon: "success",
                confirmButtonText: "Ok",
                showLoaderOnConfirm: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    setAllAdminUsers((current) =>
                    current.filter((user) => {
                      return user.id !== userId;
                    })
                  );
                }
            });  
        })
        .catch(error => {
            Swal.fire({
                title: error.response.data.message,
                icon: "error",
                text: error.response.data.error,
                confirmButtonText: "Ok",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            });            
        })
    }


    const renderAllUsers = (userInfo, index) => {
        return (
            <Card style={{ width: "24rem", height: "250px" }} key={index} className="box">
                <Card.Body>
                    <Card.Title><h3>{userInfo.name}</h3></Card.Title>
                    <Card.Text >
                        {userInfo.email}
                    </Card.Text>
                    <Card.Text>{userInfo.contact}</Card.Text>
                    <Card.Text>{userInfo.user_type}</Card.Text>
                    <Button type="submit" onClick={() => updateUserInfo(userInfo)} >Update Account</Button>
                    <Button style={{margin:"15px"}} onClick={() => deleteConfirmation(userInfo.id)} >Delete Account</Button>
                    
                </Card.Body>
            </Card>
        );
    }

    return (
        // <div className="grid">{cardInfo.map(renderCard)}</div>
        <div className="grid">{users.map(renderAllUsers)}</div>
    );

}

export default AdminUsers