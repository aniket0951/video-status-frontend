import Cookies from "js-cookie";

const userAuthToken = Cookies.get("authToken")

const Headers = () => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: userAuthToken,
    };

    return headers
}

const MultipartHeader= () => {
    const multiPartHeadr = {
        "Content-Type": "multipart/form-data",
        Authorization: userAuthToken,
    }
    return multiPartHeadr
}

export const getHeaders = Headers()
export const getMultipartHeaders = MultipartHeader()