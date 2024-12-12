import axios from 'axios';
import { GetHeader } from '../Store/store';

const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;

export async function PostLogin(loginInfo) {
    return await axios.post(baseApiUrl + "user/login", loginInfo);
}

export async function PostUser(userData) {
    return await axios.post(baseApiUrl + "user", userData);
}

export async function PutPassword(newPasswordBody) {
    let headers = GetHeader();
    return await axios.put(baseApiUrl + "user/password-reset/", newPasswordBody, {headers});
}

export async function PutEmail(newEmailBody) {
    let headers = GetHeader();
    return await axios.put(baseApiUrl + "user", newEmailBody, {headers});
}

export async function DeleteUser() {
    let headers = GetHeader();
    return await axios.delete(baseApiUrl + "user", {headers});
}

