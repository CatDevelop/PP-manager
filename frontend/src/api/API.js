import {HOST} from './host';

const USER = `${HOST}/user`;
const AUTH = `${HOST}/auth`;
const ACTIVATION = `${HOST}/activate`;

const GET_PROJECTS = `${HOST}/project`;
const PARSE_PROJECTS = `${HOST}/teamproject/parse`;

const API = {
    USER,
    AUTH,
    ACTIVATION,
    GET_PROJECTS,
    PARSE_PROJECTS
};

export default API;
