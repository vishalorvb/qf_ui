export let authdata = {
    "authtype":"noauth",
    "username":"",
    "password":"",
    "key":"",
    "value":"",
    "addto":"header",
    "token":"",
    "tokenurl":"",
    "clientid":"",
    "clientsecret":"",

}

export let Apidata = {
    "api_url": "",
    "api_name": "",
    "module_id": 0,
    "request_type": 1,
    "body_type": 0,
    "api_description": "",
    "body_form_data_list": [],
    "body_form_url_encoded_list": [],
    "body_raw": {
        "raw_text": "",
        "raw_type_id": 1
    },
    "auth": {
        "auth_data": "{\"authtype\":\""+ authdata.authtype+"\",\"basicauth\":{\"username\":\""+ authdata.username+" \",\"password\":\""+ authdata.password+"\"},\"apikey\":{\"key\":\""+ authdata.key+"\",\"value\":\""+ authdata.value+"\",\"addto\":\""+authdata.addto +"\"},\"bearertoken\":{\"token\":\""+ authdata.token+"\"},\"oauth2\":{\"tokenurl\":\""+ authdata.tokenurl+"\",\"clientid\":\""+ authdata.clientid+"\",\"clientsecret\":\""+ authdata.clientsecret+"\"}}"
    }
}


export function resetApiData(){

    Apidata = {
        "api_url": "",
        "api_name": "",
        "module_id": 0,
        "request_type": 1,
        "body_type": 0,
        "api_description": "",
        "body_form_data_list": [],
        "body_form_url_encoded_list": [],
        "body_raw": {
            "raw_text": "",
            "raw_type_id": 1
        },
        "auth": {
            "auth_data": "{\"authtype\":\""+ authdata.authtype+"\",\"basicauth\":{\"username\":\""+ authdata.username+" \",\"password\":\""+ authdata.password+"\"},\"apikey\":{\"key\":\""+ authdata.key+"\",\"value\":\""+ authdata.value+"\",\"addto\":\""+authdata.addto +"\"},\"bearertoken\":{\"token\":\""+ authdata.token+"\"},\"oauth2\":{\"tokenurl\":\""+ authdata.tokenurl+"\",\"clientid\":\""+ authdata.clientid+"\",\"clientsecret\":\""+ authdata.clientsecret+"\"}}"
        }
    }
}


