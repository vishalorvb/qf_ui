import axios from "axios";
import { baseUrl, authservice, biservice, dashboard, qfservice, report, userservice } from "../Environment";


export async function UpdateUser(data) {
    console.log("calllign update user");
    let x = await axios({
        method: "put",
        url: `${userservice}/user/updateUserAccountInfo?user_id=${data.user_id}&firstName=${data.firstName}&lastName=${data.lastName}&ssoId=${data.ssoid}&current_password=${data.current_password}&new_password=${data.new_password}&confirm_password=${data.confirm_password}&email=${data.email}`,

        headers: {
            Authorization: `Bearer ${data.token}`,
        },
    }).then((res) => {
        if (res.data.status == "SUCCESS") {
            return true;
        } else {
            return false;
        }
    });
    return x;
}

export async function uploadPic(userId, picfile, token) {
    let x = await axios
        .post(
            `${userservice}/user/profilePicUpload?user_id=${userId}`,
            picfile,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
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
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            const blob = new Blob([response.data], { type: "image/png" });
            callback(URL.createObjectURL(blob));
        })
        .catch((error) => {
            console.error(error);
        });
}
