
import axios from "axios";
import { baseUrl } from "../Environment";




export async function UpdateUser(data) {
    console.log("calllign update user")
    let x = await axios({
        method: 'post',
        url: `${baseUrl}/qfuserservice/user/updateUserAccountInfo?user_id=${data.user_id}&firstName=${data.firstName}&lastName=${data.lastName}&ssoId=${data.ssoid}&current_password=${data.current_password}&new_password=${data.new_password}&confirm_password=${data.confirm_password}&email=${data.email}`,

        headers: {
            'Authorization': `Bearer ${data.token}`
        }

    }).then(res => {
        if (res.data.status == 'SUCCESS') { return true } else { return false }
    })
    return x
}


export async function uploadPic(userId, picfile, token) {
    let x = await axios.get(`${baseUrl}/qfuserservice/user/profilePic?user_id=${userId}`,{
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            console.log(response.data);
            return true
        })
        .catch(error => {
            console.log(error);
            return false
        });
    return x
}