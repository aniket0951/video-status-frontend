import React, {useState} from "react";
import {  Card, Button } from "react-bootstrap";
import "../css/style.css"
import axios from "axios";
import {ENDPOINTS} from "../helper/endpoints";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

function AddUsers() {
    const navigation = useNavigate()
    const [userName, setUserName] = useState("")
    const [userMobile, setUserMobile] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const addNewUser = () => {
        const requestOptions = {
            "name":userName,
            "contact":"+91" + userMobile,
            "email": userEmail,
            "password": userPassword,
            "user_type": "ADMIN",
            "is_account_active":true
        }

        axios
            .post(ENDPOINTS.CREATE_ADMIN_USER, requestOptions)
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

    return(
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
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                        </Card.Title>
                        <Card.Text>
                            <div>
                                <label>Mobile</label>
                                <input
                                    type="text"
                                    pattern="[0-9]+"
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
                        <Card.Text>
                            <div>
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    value={userPassword}
                                    onChange={(e) => setUserPassword(e.target.value)}
                                />
                            </div>
                        </Card.Text>
                        <Button onClick={()=>addNewUser()}>Add User</Button>
                    </Card.Body>
                </Card>

            </div>

    )
}

export default AddUsers