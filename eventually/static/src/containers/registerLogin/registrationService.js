import axios from 'axios';
import {apiUrl} from 'src/helper';

const appPath = apiUrl + 'user/',
    loginUrl = appPath + 'login/',
    logoutUrl = appPath + 'logout/',
    registerUrl = appPath + 'register/',
    forgetPasswordUrl = appPath + 'forget_password/';

const registerService = (email, password) => {
    return axios.post(registerUrl, {email, password});
};

const loginService = (email, password) => {
    return axios.post(loginUrl, {email, password});
};

const logoutService = () => {
    return axios.get(logoutUrl);
};

const forgetPasswordService = email => {
    return axios.post(forgetPasswordUrl, {email});
};

const putNewPasswordService = (token, newPassword) => {
    return axios.put(forgetPasswordUrl+token, {'new_password' : newPassword});
};

export {loginService, forgetPasswordService, registerService, logoutService, putNewPasswordService};
