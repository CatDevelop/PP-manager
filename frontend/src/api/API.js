import HOST from './host';

const USER = `${HOST}/user`;
const AUTH = `${HOST}/auth`;
const ACTIVATION = `${HOST}/activate`;

const GET_PROJECTS = `${HOST}/project/all`;
const GET_PROJECT = `${HOST}/project`;
const GET_TAGS = `${HOST}/tag/all`;
const GET_PASSPORTS = `${HOST}/passport/all`;
const GET_PERIODS = `${HOST}/period/all`;
const GET_PASSPORT = `${HOST}/passport`;
const GET_REQUESTS = `${HOST}/request/all`;
const GET_STUDENTS = `${HOST}/student/all`;
const GET_STUDENT = `${HOST}/student`;
const GET_CUSTOMER_COMPANIES = `${HOST}/customer-company/all`;
const GET_CUSTOMER_USERS = `${HOST}/customer-user/all`;
const GET_MAIN_ANALYTICS = `${HOST}/analytic/main`;
const PARSE_PROJECTS = `${HOST}/teamproject/parse`;
const UPDATE_REQUEST = `${HOST}/request`;
const UPDATE_PASSPORT = `${HOST}/passport`;

const API = {
    USER,
    AUTH,
    GET_STUDENTS,
    GET_STUDENT,
    ACTIVATION,
    GET_PROJECTS,
    PARSE_PROJECTS,
    GET_PASSPORTS,
    GET_REQUESTS,
    GET_PERIODS,
    GET_MAIN_ANALYTICS,
    GET_CUSTOMER_COMPANIES,
    GET_CUSTOMER_USERS,
    GET_TAGS,
    GET_PASSPORT,
    UPDATE_REQUEST,
    UPDATE_PASSPORT,
    GET_PROJECT
};

export default API;
