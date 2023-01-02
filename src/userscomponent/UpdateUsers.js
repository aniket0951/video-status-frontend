import React, { useState} from "react";
import {useLocation} from "react-router-dom";
import {  Card, Button } from "react-bootstrap";
import "../css/style.css"
import axios from "axios";
import {ENDPOINTS} from "../helper/endpoints";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateUsers() {
    const navigation = useNavigate()
    const location = useLocation()
    
    const userId = useState(location.state.id)
    const [userName, setUserName] = useState(location.state.username)
    const [userMobile, setUserMobile] = useState(location.state.mobile)
    const [userEmail, setUserEmail] = useState(location.state.email)

    const userAuthToken = Cookies.get("authToken")
    const headers = {
        "Content-Type": "application/json",
        Authorization: userAuthToken,
    };


    const updateUser= () => {
        const requestOption = {
            "id":userId,
            "username":userName,
            "mobile": userMobile,
            "email": userEmail,
            "user_type": "admin-user"
        }

        axios
        .put(ENDPOINTS.UPDATE_ADMIN_USER, requestOption, {headers:headers})
        .then(response => {
            Swal.fire({
                title: response.data.message,
                icon: "success",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigation("/show-users")
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
    }

    return (
        <div className={"justify-content-center justify-content-lg-center"} style={{marginLeft:"auto", marginRight:"auto"}}>

            <Card style={{ width: "22rem", marginLeft: "200px", marginTop:"20px" }}  className="align-self-center box">
                <Card.Body>
                    <Card.Title>
                        <div>
                            <label>User Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter user name"
                                value={userName}
                                onChange={(event)=> setUserName(event.target.value)}
                            />
                        </div>
                    </Card.Title>
                    <Card.Text>
                        <div>
                            <label>Mobile</label>
                            <input
                                type="text"
                                maxLength={10}
                                className="form-control"
                                placeholder="Enter mobile number"
                                value={userMobile}
                                onChange={(e) => setUserMobile(e.target.value)}
                            />
                        </div>
                    </Card.Text>
                    <Card.Text>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </div>
                    </Card.Text>

                    <Button onClick={()=> updateUser()}>Update</Button>
                </Card.Body>
            </Card>

        </div>

    )
}

export default UpdateUsers