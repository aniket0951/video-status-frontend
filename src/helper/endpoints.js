
const BASE_URL = "http://localhost:8080/api/"


const CREATE_ADMIN_USER = BASE_URL + "create-admin-user"
const ADMIN_USER_LOGIN = BASE_URL + 'login-admin?'
const USERNAME = ""
const USER_BY_ID = BASE_URL + "get-user-byID"
const GET_ALL_ADMIN_USERS = BASE_URL + "admin-users/"
const UPDATE_ADMIN_USER = BASE_URL + "update-admin-user"
const DELETE_ADMIN_USER = BASE_URL + "delete-admin-user"

const GET_ALL_VIDEO_CATEGORY = BASE_URL  + "video-category/all-category"
const ADD_VIDEO_CATEGORY = BASE_URL + "video-category/create-category"
const DELETE_VIDEO_CATEGORY = BASE_URL + "video-category/delete-category"
const UPDATE_VIDEO_CATEGORY = BASE_URL + "video-category/update-category"

const GET_ALL_VIDEOS_BY_ADMIN = BASE_URL + "admin-videos"
const UPLOAD_VIDEO = BASE_URL + "upload-video"
const DELETE_VIDEO = BASE_URL + "videos/delete-video"
const FETCH_VERIFY_VIDEOS = BASE_URL + "admin-videos/verify-videos"

// verification process failed 
const UNVERIFY_VIDEO = BASE_URL + "admin-videos/make-verification-failed"
const REJECT_PUBLISH_VIDEO = BASE_URL + "admin-videos/make-unpublish-video"

const UPDATE_VIDEO_STATUS = BASE_URL + "admin-videos/update-status?"
const PUBLISH_VIDEO = BASE_URL + "admin-videos/publish-video"
const FETCH_PUBLISH_VIDEO = BASE_URL + "published-videos"
const FETCH_UNPUBLISH_VIDEO = BASE_URL + "unpublished-videos"
const UNPUBLISH_VIDEO = BASE_URL + "published-videos/unpublish-videos"

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
    GET_ALL_VIDEOS_BY_ADMIN:GET_ALL_VIDEOS_BY_ADMIN,
    UPLOAD_VIDEO:UPLOAD_VIDEO,
    DELETE_VIDEO:DELETE_VIDEO,
    UPDATE_VIDEO_STATUS:UPDATE_VIDEO_STATUS,
    FETCH_VERIFY_VIDEOS:FETCH_VERIFY_VIDEOS,
    PUBLISH_VIDEO:PUBLISH_VIDEO,
    FETCH_PUBLISH_VIDEO:FETCH_PUBLISH_VIDEO,
    UNPUBLISH_VIDEO:UNPUBLISH_VIDEO,
    FETCH_UNPUBLISH_VIDEO:FETCH_UNPUBLISH_VIDEO,
    UNVERIFY_VIDEO:UNVERIFY_VIDEO,
    REJECT_PUBLISH_VIDEO:REJECT_PUBLISH_VIDEO
}
 