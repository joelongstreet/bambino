"use strict";

let express = require("express"),
    path = require("path"),
    routes = require("./lib/routes"),
    app = express();

app.use(express.static(
    path.join(__dirname, 'public')
));

app.get("/api/sounds", routes.sounds);
app.get("/api/quiz", routes.quiz);

module.exports = app;
