
// const BASE_URL = "http://localhost:5000/api/"
const BASE_URL = "http://13.233.96.169:8080/api/"


const CREATE_ADMIN_USER = BASE_URL + "create-admin-user"
const ADMIN_USER_LOGIN = BASE_URL + "admin-user-login"
const USERNAME = ""
const USER_BY_ID = BASE_URL + "get-user-byID"
const GET_ALL_ADMIN_USERS = BASE_URL + "get-admin-users"
const UPDATE_ADMIN_USER = BASE_URL + "update-admin-user"
const DELETE_ADMIN_USER = BASE_URL + "delete-admin-user"

const GET_ALL_VIDEO_CATEGORY = BASE_URL  + "video-category/all-category"
const ADD_VIDEO_CATEGORY = BASE_URL + "video-category/create-category"
const DELETE_VIDEO_CATEGORY = BASE_URL + "video-category/delete-category"
const UPDATE_VIDEO_CATEGORY = BASE_URL + "video-category/update-category"

const GET_ALL_VIDEOS = BASE_URL + "videos/get-all-videos"
const UPLOAD_VIDEO = BASE_URL + "videos/add-video"
const DELETE_VIDEO = BASE_URL + "videos/delete-video"
const ACTIVE_VIDEOS = BASE_URL + "inactive-video/"

// WallPaper
const UPLOAD_WALLPAPER = BASE_URL + "add-wallpaper"
const GET_ALL_WALLPAPER = BASE_URL + "get-wallpapers"
const ACTIVE_WALLPAPER = BASE_URL + "active-wallpaper/"

export const ENDPOINTS = {
    ADMIN_USER_LOGIN:ADMIN_USER_LOGIN,
    USERNAME:USERNAME,
    GET_ALL_VIDEO_CATEGORY:GET_ALL_VIDEO_CATEGORY,
    ADD_VIDEO_CATEGORY:ADD_VIDEO_CATEGORY,
    DELETE_VIDEO_CATEGORY:DELETE_VIDEO_CATEGORY,
    UPDATE_VIDEO_CATEGORY:UPDATE_VIDEO_CATEGORY,
    USER_BY_ID:USER_BY_ID,
    GET_ALL_ADMIN_USERS:GET_ALL_ADMIN_USERS,
    CREATE_ADMIN_USER:CREATE_ADMIN_USER,
    UPDATE_ADMIN_USER:UPDATE_ADMIN_USER,
    DELETE_ADMIN_USER:DELETE_ADMIN_USER,
    GET_ALL_VIDEOS:GET_ALL_VIDEOS,
    UPLOAD_VIDEO:UPLOAD_VIDEO,
    DELETE_VIDEO:DELETE_VIDEO,
    UPLOAD_WALLPAPER:UPLOAD_WALLPAPER,
    GET_ALL_WALLPAPER:GET_ALL_WALLPAPER,
    ACTIVE_WALLPAPER:ACTIVE_WALLPAPER,
    ACTIVE_VIDEOS:ACTIVE_VIDEOS
}
 