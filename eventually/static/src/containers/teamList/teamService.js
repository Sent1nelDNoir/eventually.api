import axios from 'axios';

const appPath = '/api/v1/team/';
const getMembers = '/api/v1/user/';
const getUsers = '/api/v1/user/all/';

const teamServicePost = (data) => {
    let url = appPath + 'new/';
    return axios.post(url, data);
};

const usersServiceGet = () => {
    return axios.get(getUsers);
};

const teamServiceGet = () => {
    return axios.get(appPath);
};

const teamServiceGetMembers = id => {
    return axios.get(getMembers+id+'/');
};

const teamServicePut = (id, name, description, image) => {
    return axios.put(appPath + id + '/', {name, description, image});
};


export {teamServiceGet, teamServicePut, teamServiceGetMembers, teamServicePost, usersServiceGet};
