import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {ENDPOINTS} from "../helper/endpoints";
import "../css/style.css"
import { Container, Card, Col, Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function AdminUsers() {
    const navigation = useNavigate()
    const [users, setAllAdminUsers] = useState([])
    const [isUserFetchFailed, setIsUserFetchFailed] = useState(false)
    const [responseMessage, setResponseMessage] = useState("")

    const userAuthToken = Cookies.get("authToken")

    const headers = {
        "Content-Type": "application/json",
        Authorization: userAuthToken,
    };

    useEffect(()=>{
        fetchAllAdminUsers()
    },[])

    const fetchAllAdminUsers = () => {
        axios
            .get(ENDPOINTS.GET_ALL_ADMIN_USERS, { headers: headers })
            .then(response => {
                setAllAdminUsers(response.data.user_data)
                setResponseMessage(response.data.message)
            })
            .catch(error => {
                setIsUserFetchFailed(true)
                setResponseMessage(error.response.data.error)
            })
    }

    const updateUserInfo = (userData) => {
        navigation("/update-user",{ state: userData })
    }


    const cardInfo = [
        {
            image: "https://i.insider.com/50f967f56bb3f7830a000019",
            title: "Lebron James",
            text: "THE GOAT",
        },
        {
            image:
                "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
            title: "Alex Caruso",
            text: "THE TRUE GOAT",
        },
        {
            image:
                "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
            title: "Steph Curry",
            text: "he good",
        },
        {
            image:
                "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
            title: "Michael Jordan",
            text: "he is very close to goat",
        },
        {
            image: "https://i.insider.com/50f967f56bb3f7830a000019",
            title: "Lebron James",
            text: "THE GOAT",
        },
        {
            image:
                "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
            title: "Alex Caruso",
            text: "THE TRUE GOAT",
        },
        {
            image:
                "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
            title: "Steph Curry",
            text: "he good",
        },
        {
            image:
                "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
            title: "Michael Jordan",
            text: "he is very close to goat",
        },
        {
            image: "https://i.insider.com/50f967f56bb3f7830a000019",
            title: "Lebron James",
            text: "THE GOAT",
        },
        {
            image:
                "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
            title: "Alex Caruso",
            text: "THE TRUE GOAT",
        },
        {
            image:
                "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
            title: "Steph Curry",
            text: "he good",
        },
        {
            image:
                "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
            title: "Michael Jordan",
            text: "he is very close to goat",
        },
        {
            image: "https://i.insider.com/50f967f56bb3f7830a000019",
            title: "Lebron James",
            text: "THE GOAT",
        },
        {
            image:
                "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
            title: "Alex Caruso",
            text: "THE TRUE GOAT",
        },
        {
            image:
                "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
            title: "Steph Curry",
            text: "he good",
        },
        {
            image:
                "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
            title: "Michael Jordan",
            text: "he is very close to goat",
        },
        {
            image: "https://i.insider.com/50f967f56bb3f7830a000019",
            title: "Lebron James",
            text: "THE GOAT",
        },
        {
            image:
                "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
            title: "Alex Caruso",
            text: "THE TRUE GOAT",
        },
        {
            image:
                "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
            title: "Steph Curry",
            text: "he good",
        },
        {
            image:
                "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
            title: "Michael Jordan",
            text: "he is very close to goat",
        },
        {
            image: "https://i.insider.com/50f967f56bb3f7830a000019",
            title: "Lebron James",
            text: "THE GOAT",
        },
        {
            image:
                "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
            title: "Alex Caruso",
            text: "THE TRUE GOAT",
        },
        {
            image:
                "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
            title: "Steph Curry",
            text: "he good",
        },
        {
            image:
                "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
            title: "Michael Jordan",
            text: "he is very close to goat",
        },
        {
            image: "https://i.insider.com/50f967f56bb3f7830a000019",
            title: "Lebron James",
            text: "THE GOAT",
        },
        {
            image:
                "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
            title: "Alex Caruso",
            text: "THE TRUE GOAT",
        },
        {
            image:
                "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
            title: "Steph Curry",
            text: "he good",
        },
        {
            image:
                "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
            title: "Michael Jordan",
            text: "he is very close to goat",
        },
        {
            image: "https://i.insider.com/50f967f56bb3f7830a000019",
            title: "Lebron James",
            text: "THE GOAT",
        },
        {
            image:
                "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
            title: "Alex Caruso",
            text: "THE TRUE GOAT",
        },
        {
            image:
                "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
            title: "Steph Curry",
            text: "he good",
        },
        {
            image:
                "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
            title: "Michael Jordan",
            text: "he is very close to goat",
        },
    ];

    const renderCard = (card, index) => {
        return (
            <Card style={{ width: "18rem" }} key={index} className="box">
                <Card.Img style={{width:"50px", height:"50px"}} variant="top" src="holder.js/100px180" src={card.image} />
                <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.text}</Card.Text>
                </Card.Body>
            </Card>
        );
    };

    const renderAllUsers = (userInfo, index) => {
        return (
            <Card style={{ width: "20rem", height: "250px" }} key={index} className="box">
                <Card.Body>
                    <Card.Title><h3>{userInfo.username}</h3></Card.Title>
                    <Card.Text >
                        {userInfo.email}
                    </Card.Text>
                    <Card.Text>{userInfo.mobile}</Card.Text>
                    <Card.Text>{userInfo.user_type}</Card.Text>
                    <Button onClick={() => updateUserInfo(userInfo)} >Update</Button>
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