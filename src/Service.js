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
}

export default Service;
