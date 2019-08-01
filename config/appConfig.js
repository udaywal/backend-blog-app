let appConfig = {};

appConfig.port = 3000; // application port
appConfig.allowedCorsOrigin = "*"; // allowed domains
appConfig.env = "dev"; // environment
appConfig.db = {
    uri: 'mongodb://127.0.0.1:27017/blogBackendDb',
} // database url
appConfig.apiVersion = '/api/v1'; // api version

module.exports = {

    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    env: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion

}