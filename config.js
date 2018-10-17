module.exports = {
    jwtSecret: 'somesecretkeyforjwt',
    mongodburi: 'mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@ds233763.mlab.com:33763/basic-mern-stack-app'
};