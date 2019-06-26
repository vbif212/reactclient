import axios from "axios/index";
import config from "../config"

class Service {
    obtainAccessToken(username, password) {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('grant_type', 'password');
        params.append('client_id', 'clientIdPassword');
        const headers = {
            'Content-type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa('clientIdPassword:secret')
        };
        return axios.post(
            config.tokenUrl,
            params.toString(),
            {headers: headers}
        );
    }

    getResource(urlPath, token) {
        const headers = {
            Authorization: 'Bearer ' + token
        };
        return axios.get(config.resourceUrl + urlPath, {headers: headers});
    }

    postResource(urlPath, token, params) {
        const headers = {
            Authorization: 'Bearer ' + token
        };
        return axios.post(config.resourceUrl + urlPath, params, {headers: headers});
    }

    deleteResource(urlPath, token) {
        const headers = {
            Authorization: 'Bearer ' + token
        };
        return axios.delete(config.resourceUrl + urlPath, {headers: headers});
    }
}

export default Service;
