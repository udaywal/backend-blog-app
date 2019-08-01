const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser')
const fs = require('fs')

const app = express();

const appConfig = require('./config/appConfig')

app.listen(appConfig.port, ()=>{
    console.log(`Server Created Successfully! Listen on port ${appConfig.port}`)
    mongoose.connect(appConfig.db.uri, { useNewUrlParser: true })
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Bootstrap route
let routesPath = './routes';
fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});

// handling mongoose connection error
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)
});
// handling mongoose success event
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);
    } else {
        console.log("database connection open success");
    }
});