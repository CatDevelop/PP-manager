import {HOST} from './host';

const USER = `${HOST}/user`;
const AUTH = `${HOST}/auth`;
const ACTIVATION = `${HOST}/activate`;

const GET_PROJECTS = `${HOST}/project`;
const GET_PASSPORTS = `${HOST}/passport/all`;
const GET_REQUESTS = `${HOST}/request/all`;
const GET_CUSTOMER_COMPANIES = `${HOST}/customer-company/all`;
const GET_MAIN_ANALYTICS = `${HOST}/analytic/main`;
const PARSE_PROJECTS = `${HOST}/teamproject/parse`;

const API = {
    USER,
    AUTH,
    ACTIVATION,
    GET_PROJECTS,
    PARSE_PROJECTS,
    GET_PASSPORTS,
    GET_REQUESTS,
    GET_MAIN_ANALYTICS,
    GET_CUSTOMER_COMPANIES
};

export default API;
