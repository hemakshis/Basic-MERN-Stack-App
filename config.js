const JWTSECRET = process.env.JWTSECRET;
const DB_URL = process.env.DB_URL;

module.exports = {
    jwtSecret: JWTSECRET,
    mongodburi: DB_URL
};
