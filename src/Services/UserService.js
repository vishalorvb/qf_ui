import { Axios as axios } from "../utilities/Utility";
import { userservice } from "../Environment";

export async function UpdateUser(data) {
    let x = await axios({
        method: "put",
        url: `${userservice}/user/updateUserAccountInfo?user_id=${data.user_id}&firstName=${data.firstName}&lastName=${data.lastName}&ssoId=${data.ssoid}&current_password=${data.current_password}&new_password=${data.new_password}&confirm_password=${data.confirm_password}&email=${data.email}`,

        headers: {
            // Authorization: `Bearer ${data.token}`,
        },
    })
        .then((res) => {
            if (res.data.status === "SUCCESS") {
                return true;
            } else {
                return false;
            }
        })
        .catch((err) => {
            console.log(err);
        });
    return x;
}

export async function uploadPic(userId, picfile, token) {
    let x = await axios
        .post(`${userservice}/user/profilePicUpload?user_id=${userId}`, picfile, {
            headers: {
                "Content-Type": "multipart/form-data",
                // Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            // console.log(response.data);
            return true;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
    return x;
}

export function getPhoto(callback, userId, token) {

    axios
        .get(`${userservice}/user/profilePic`, {
            params: {
                user_id: userId,
            },
            responseType: "arraybuffer",
            headers: {
                // Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            const blob = new Blob([response.data], { type: "image/png" });
            callback(URL.createObjectURL(blob));
            console.log(URL.createObjectURL(blob));
        })
        .catch((error) => {
            console.error(error);
        });

}
export async function getUsers(callback, orgid, ssoid, token) {
    return await axios
        .get(`${userservice}/user/listUsers?orgId=${orgid}&ssoId=${ssoid}`, {
            headers: {
                // Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            callback(res.data.info);
            return res.data.info;
        })
        .catch((err) => {
            console.log(err);
        });
}

export async function getUserGitDetails(callback, userId) {
    return await axios
        .get(`${userservice}/userexecutionparameters/getByUserId?userId=${userId}`)
        .then((res) => {
            callback(res.data.info);
            return res.data.info;
        })
        .catch((err) => {
            console.log(err);
        });
}

export function getUserProperties(callback, userId) {
    axios
        .get(
            `${userservice}/userexecutionparameters/userproperties?userId=${userId}`
        )
        .then((res) => {
            callback(res.data.info);
            return res.data.info;
        });
}

export async function postUserProperties(postData, response) {
    return await axios
        .post(
            `${userservice}/userexecutionparameters/saveUserExecutionParameters`,
            postData
        )
        .then((response) => {
            return true;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
}
