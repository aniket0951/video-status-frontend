import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { ENDPOINTS } from "../helper/endpoints";
import "../css/style.css";
import axios from "axios";
import Swal from "sweetalert2";
import { getHeaders, getMultipartHeaders } from "../helper/Common";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function ActiveWallPaper() {
    const [wallPaperData, setAllWallPaperData] = useState([]);
    const [openUploadWallPaper, setOpenUploadWallPaper] = useState(false);
    const [wallpaperTitle, setwallpaperTitle] = useState("");
    const [myFile, setFile] = useState("");
    const [pageSkip, setPageSkip] = useState(1)

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    useEffect(() => {
        fetchWallPapers();
    }, [setAllWallPaperData]);

    const showUploadImage = () => {
        setOpenUploadWallPaper(true)
    };

    const fetchWallPapers = () => {
        const requestOption = {
            is_active: "ACTIVE",
            app_tag: "UI",
            page_skip: pageSkip,
            page_limit: 10
        }
        axios
            .post(ENDPOINTS.GET_ALL_WALLPAPER, requestOption, { headers: getHeaders })
            .then(response => {
                console.log("GET_ALL_WALLPAPER API Response : ", response.data);
                var wallpaper_data = [];
                for (let i = 0; i < response.data.video_data.recent.length; i++) {
                    wallpaper_data.push(response.data.video_data.recent[i])
                }

                for (let i = 0; i < response.data.video_data.olds.length; i++) {
                    wallpaper_data.push(response.data.video_data.olds[i])
                }

                setAllWallPaperData(wallpaper_data)
            })
            .catch(error => {
                console.log("WallPaper Active Error : ", error);
            })
    };

    const next= ()=> {
        console.log("PAGE SKIP : ", pageSkip);
        setPageSkip(pageSkip + 5)
        fetchWallPapers()
    }

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append("title", wallpaperTitle);
        formData.append("wallpaper", myFile);

        axios
            .post(ENDPOINTS.UPLOAD_WALLPAPER, formData, { headers: getMultipartHeaders })
            .then(response => {
                Swal.fire({
                    title: response.data.message,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        setOpenUploadWallPaper(false)
                        fetchWallPapers()
                        console.log("WallPaper Has been uploaded");
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


    const inactiveWallPapaer = (data) => {
        axios
            .post(ENDPOINTS.ACTIVE_WALLPAPER + data.ID + "/INACTIVE", {}, { headers: getHeaders })
            .then(response => {
                Swal.fire({
                    title: response.data.message,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetchWallPapers()
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
    const openNewWindow = (imageUrl) => {
        window.open(imageUrl);
    };
    // const renderWallPapers = (wallPaperData, index) => {
    //     return (
    //         <Card key={index} style={{ width: '10px', margin: '5px', height: 'auto', border: '1px solid', borderRadius: '5px', overflow: 'hidden' }}>
    //             <Card.Img className="card.image" variant="top" src={wallPaperData.FilePath} style={{ height: '250px', objectFit: 'cover', cursor: 'pointer' }}
    //                 onClick={() => openNewWindow(wallPaperData.FilePath)}
    //             />
    //             <Card.Body>
    //                 <Card.Title>Title : {wallPaperData.Title}</Card.Title>
    //                 <Card.Text>{wallPaperData.CreatedAt.substring(0, 10)}</Card.Text>
    //                 <Button onClick={() => inactiveWallPapaer(wallPaperData)}>INACTIVE</Button>
    //             </Card.Body>
    //         </Card>
    //     );
    // };

    // const renderWallPapers2=()

    return (
        <>
            {openUploadWallPaper ?
                <div>
                    <Card style={{ width: "31rem", height: "200px" }} className="box">
                        <Card.Body>
                            <Card.Title>
                                <div>
                                    <label>WallPaper title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter wallpaper title"
                                        value={wallpaperTitle}
                                        onChange={(event) => setwallpaperTitle(event.target.value)}
                                    />
                                </div>
                            </Card.Title>
                            <Card.Title>
                                <div>
                                    <label>Video File</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        placeholder="upload image"
                                        onChange={(event) => setFile(event.target.files[0])}
                                    />
                                </div>
                            </Card.Title>
                            <Button onClick={() => onFileUpload()} >Upload</Button>
                        </Card.Body>
                    </Card>
                </div>
                :
                <>
                    <div style={{ display: "flex", justifyContent: "right" }}>
                        <Button
                            style={{ marginTop: "10px", marginRight: '15px', marginBottom: '15px', fontWeight: 'bold', backgroundColor: 'blue' }}
                            onClick={() => showUploadImage()}
                        >
                            Add WallPaper
                        </Button>

                    </div>
                    {/* <div className="grid" style={{ display: 'flex', flexWrap: 'wrap', gap:'10px' }}>{wallPaperData.map(renderWallPapers)}</div> */}

                    <div className="card-container">
                        {wallPaperData.map((data, index) => (
                            <div
                                key={index}
                                className={`card ${hoveredIndex === index ? 'hovered' : ''}`}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img src={data.FilePath} alt={data.Title} className="card-image" onClick={() => openNewWindow(data.FilePath)} />
                                <div className="card-body">
                                    <h3 className="card-title">Title: {data.Title}</h3>
                                    <p className="card-date">{data.CreatedAt.substring(0, 10)}</p>
                                    <Button className="inactive-button" onClick={() => inactiveWallPapaer(data)}>INACTIVE</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="next-btn-div">
                        <Button className="prev-btn" >Previous</Button>
                        <Button className="next-btn" onClick={()=> next()} >Next</Button>
                    </div>
                </>
            }
        </>
    )
}

export default ActiveWallPaper;