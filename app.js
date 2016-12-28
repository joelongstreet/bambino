"use strict";

let express = require("express"),
    path = require("path"),
    routes = require("./lib/routes"),
    app = express(),
    server = require('http').Server(app),
    io = require("socket.io")(server),
    gpio = require("./lib/gpio")(io),
    port = process.env.PORT || 3000;

server.listen(port);

app.use(express.static(
    path.join(__dirname, 'public')
));

app.get("/api/menu", routes.menu);
app.get("/api/sounds", routes.sounds);
app.get("/api/signs", routes.signs);
app.get("/api/quiz", routes.quiz);
