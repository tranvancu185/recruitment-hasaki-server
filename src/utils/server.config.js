require('dotenv').config()

const ENV_BASE_URL= process.env.BASE_URL ?? "http://localhost:3000";

const APP_ENV= process.env.APP_ENV ?? "development";

const ENV_PORT= process.env.PORT ?? 3000;

const USER_DEFAULT_ROLE = 1;

const API_TOKEN_KEY= process.env.API_TOKEN_KEY ?? 'token_user';

const TELEGRAM_TOKEN= process.env.TELEGRAM_TOKEN ?? '6675630507:AAHke4RYTacv3jU47JQ_gEq6xwTYGcQPe8w';
const TELEGRAM_CHAT_ID= process.env.API_TOKEN_KEY ?? '-1001845293017';

const APP_NOTI_TYPE = {
    INFO: 'info',
    ERROR: 'error',
    WARN: 'warn',
}

const USERS_STATUS = {
    WAITING: 0,
    PENDING: 1,
    ACTIVE: 2,
    PASSED: 3,
    CANCEL: 4,
    DRAFT: 5,
}

const USER_STATUS= {
    PENDING: 1,
    PASSED: 2,
    REJECTED: 3,
    CANCEL: 4,
};

const APP_ROLE_ID = {
    ROLE_ADMIN: 1,
    ROLE_HR: 2,
    ROLE_REVIEWER: 3,
    ROLE_CANDIATE: 4,
}

module.exports = {
    ENV_BASE_URL,
    APP_ENV,
    ENV_PORT,
    USER_DEFAULT_ROLE,
    API_TOKEN_KEY,
    USER_STATUS,
    APP_NOTI_TYPE,
    TELEGRAM_TOKEN,
    TELEGRAM_CHAT_ID,
    APP_ROLE_ID,
    USERS_STATUS
};