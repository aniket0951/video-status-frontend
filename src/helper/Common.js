import Cookies from "js-cookie";
import Swal from "sweetalert2";

const userAuthToken = Cookies.get("authToken")

const Headers = () => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: userAuthToken,
    };
    console.log("user auth token", userAuthToken)
    return headers
}

const MultipartHeader = () => {
    const multiPartHeadr = {
        "Content-Type": "multipart/form-data",
        Authorization: userAuthToken,
    }
    return multiPartHeadr
}

export const getHeaders = Headers()
export const getMultipartHeaders = MultipartHeader()