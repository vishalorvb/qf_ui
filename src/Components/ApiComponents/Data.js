


export let authdata = {
        "authtype": "",
        "basicauth": {
            "username": "",
            "password": ""
        },
        "apikey": {
            "key": "",
            "value": "",
            "addto": "header"
        },
        "bearertoken": {
            "token": ""
        },
        "oauth2": {
            "tokenurl": "",
            "clientid": "",
            "clientsecret": ""
        }
}




export let Apidata = {
    "api_url": "",
    "api_name": "",
    "module_id": 0,
    "request_type": 1,
    "body_type": 0,
    "api_description": "",
    "params_list": [

    ],
    "apiLinkProperties": [

    ],
    "successResponseProperties": [

    ],
    "body_form_data_list": [],
    "body_form_url_encoded_list": [],
    "body_raw": {
        "raw_text": "",
        "raw_type_id": 0
    },
    "auth": {
        "auth_data": "{\"authtype\":\"bearertoken\",\"basicauth\":{\"username\":\"\",\"password\":\"\"},\"apikey\":{\"key\":\"\",\"value\":\"\",\"addto\":\"header\"},\"bearertoken\":{\"token\":\"qwert\"},\"oauth2\":{\"tokenurl\":\"\",\"clientid\":\"\",\"clientsecret\":\"\"}}"
    }
}

export function resetApiData() {

    Apidata = {
        "api_url": "",
        "api_name": "",
        "module_id": 0,
        "request_type": 1,
        "body_type": 0,
        "api_description": "",
        "params_list": [

        ],
        "apiLinkProperties": [

        ],
        "successResponseProperties": [

        ],
        "body_form_data_list": [],
        "body_form_url_encoded_list": [],
        "body_raw": {
            "raw_text": "",
            "raw_type_id": 0
        },
        "auth": {
            "auth_data": "{\"authtype\":\"bearertoken\",\"basicauth\":{\"username\":\"\",\"password\":\"\"},\"apikey\":{\"key\":\"\",\"value\":\"\",\"addto\":\"header\"},\"bearertoken\":{\"token\":\"qwert\"},\"oauth2\":{\"tokenurl\":\"\",\"clientid\":\"\",\"clientsecret\":\"\"}}"
        }
    }
}


