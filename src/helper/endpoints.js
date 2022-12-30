
const BASE_URL = "http://localhost:5000/api/"


const ADMIN_USER_LOGIN = BASE_URL + "admin-user-login"
const USERNAME = ""
const USER_BY_ID = BASE_URL + "get-user-byID"


const GET_ALL_VIDEO_CATEGORY = BASE_URL  + "video-category/all-category"
const ADD_VIDEO_CATEGORY = BASE_URL + "video-category/create-category"
const DELETE_VIDEO_CATEGORY = BASE_URL + "video-category/delete-category"
const UPDATE_VIDEO_CATEGORY = BASE_URL + "video-category/update-category"

export const ENDPOINTS = {
    ADMIN_USER_LOGIN:ADMIN_USER_LOGIN,
    USERNAME:USERNAME,
    GET_ALL_VIDEO_CATEGORY:GET_ALL_VIDEO_CATEGORY,
    ADD_VIDEO_CATEGORY:ADD_VIDEO_CATEGORY,
    DELETE_VIDEO_CATEGORY:DELETE_VIDEO_CATEGORY,
    UPDATE_VIDEO_CATEGORY:UPDATE_VIDEO_CATEGORY,
    USER_BY_ID:USER_BY_ID,
}
 