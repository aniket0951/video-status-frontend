import React, { useState } from "react";
import { Container, Card, Col } from "react-bootstrap";
import "../css/style.css";
import { ENDPOINTS } from "../helper/endpoints";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

function Landing() {
  const navigation = useNavigate()
  const [email, setEmaill] = useState("");
  const [password, setPassword] = useState("");
  const [isFailedResponse, setIsFailedResponse] = useState(true);
  const [loginResponse, setLoginResponse] = useState("");

  const loginUser = () => {
    const requestOption = {
      email: email,
      password: password,
    };
    axios
    .post(ENDPOINTS.ADMIN_USER_LOGIN, requestOption)
    .then((response) => {
      ENDPOINTS.USERNAME = response.data.user_data.username 
      Cookies.set("authToken", response.data.user_data.token) 
      navigation("/admin-home", { state: response.data });
      window.location.reload(true)
    })
    .catch((error) => {
      setIsFailedResponse(false)
      setLoginResponse(error.response.data.error);
    });
  }

  return (
    <>
    <div className="App">
      <Container className="p-4 center">
        <Col md="4" className="card-view">
          <Card >
            <Card.Body>
              <Card.Title>Sign In</Card.Title>
              <Card.Text>
                <p>
                <form>
                  <div className="mb-3">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmaill(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </form>
                </p>
                <input className="btn btn-primary" type="submit" value="Submit" onClick={() => loginUser()} />
              </Card.Text>
            </Card.Body>
          </Card>
          {isFailedResponse ? (<h1>{loginResponse}</h1>) : (<h1>{loginResponse}</h1>)}

        </Col>
      </Container>
    </div>
    </>
  )
}



export default Landing;
