import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { ENDPOINTS } from "../helper/endpoints";
import "../css/style.css";
import axios from "axios";
import Swal from "sweetalert2";
import { getHeaders, getMultipartHeaders } from "../helper/Common";

function WallPaperHome() {
    const [openUploadWallPaper, setOpenUploadWallPaper] = useState(false);
    const [wallpaperTitle, setwallpaperTitle] = useState("");
    const [myFile, setFile] = useState("");
    const [wallPaperData, setAllWallPaperData] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isDataAvailabel, setIsDataAvailabel] = useState(true)
    const [pageSkip, setPageSkip] = useState(1)

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    useEffect(() => {
        fetchWallPapers();
    }, [setAllWallPaperData]);


    const fetchWallPapers = () => {

        const requestOption = {
            is_active: "INACTIVE",
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
                if (wallPaperData.length == 0) {
                    setIsDataAvailabel(false)
                }
            })
            .catch(error => {
                console.log("WallPaper Active Error : ", error);
            })

        // axios
        //     .get(ENDPOINTS.GET_ALL_WALLPAPER + "INACTIVE/UI", { headers: getHeaders })
        //     .then(response => {
        //         const wallpapers = response.data.video_data
        //         var wallpaper_data = [];
        //         if (wallpapers.recent != null) {
        //             for (let i = 0; i < wallpapers.recent.length; i++) {
        //                 wallpaper_data.push(wallpapers.recent[i])
        //             }
        //         }

        //         if (wallpapers.olds != null) {
        //             for (let i = 0; i < wallpapers.olds.length; i++) {
        //                 wallpaper_data.push(wallpapers.olds[i])
        //             }
        //         }


        //         setAllWallPaperData(wallpaper_data)
        //         if (wallPaperData.length == 0) {
        //             setIsDataAvailabel(false)
        //         }
        //     })
        //     .catch(error => {
        //         console.log("WallPaper Error : ", error);
        //     })
    }

    const activeWallPapaer = (data) => {
        axios
            .post(ENDPOINTS.ACTIVE_WALLPAPER + data.ID + "/ACTIVE", {}, { headers: getHeaders })
            .then(response => {
                Swal.fire({
                    title: response.data.message,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log("Conform : ", result.isConfirmed);
                        fetchWallPapers()
                    }
                });
            })
            .catch(error => {
                console.log("Error : ", error);
            })
    };

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

    const openNewWindow = (imageUrl) => {
        window.open(imageUrl);
    };

    // const renderWallPapers = (wallPaperData, index) => {
    //     return (
    //         <Card key={index} style={{ width: '25rem', margin: '10px', height: '350px' }}>
    //             <Card.Img variant="top" src={wallPaperData.FilePath} style={{ height: '200px', objectFit: 'cover' }}
    //                 onClick={() => openNewWindow(wallPaperData.FilePath)}
    //             />
    //             <Card.Body>
    //                 <Card.Title>Title : {wallPaperData.Title}</Card.Title>
    //                 <Card.Text>{wallPaperData.CreatedAt.substring(0, 10)}</Card.Text>
    //                 <Button onClick={() => activeWallPapaer(wallPaperData)}>ACTIVE</Button>
    //             </Card.Body>
    //         </Card>
    //     );
    // };

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

                    {
                        isDataAvailabel ?

                            <div>
                                <h1>Data Not Availabel</h1>
                            </div>
                            :

                            <div className="card-container" style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}>
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
                                            <Button className="inactive-button" style={{ backgroundColor: '#0000FF', fontWeight: 'bold' }} onClick={() => activeWallPapaer(data)}>ACTIVE</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                    }

                    {/* <div className="grid">{wallPaperData.map(renderWallPapers)}</div> */}

                </>
            }
        </>

    )
}

export default WallPaperHome;