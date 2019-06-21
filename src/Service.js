import axios from "axios/index";

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
            'http://localhost:8081/spring-security-oauth-server/oauth/token',
            params.toString(),
            {headers: headers}
        );
    }

    getResource(url, token) {
        const headers = {
            Authorization: 'Bearer ' + token
        };
        return axios.get(url, {headers: headers});
    }

    postResource(url, token, params) {
        const headers = {
            Authorization: 'Bearer ' + token
        };
        return axios.post(url, params, {headers: headers});
    }
}

export default Service;
