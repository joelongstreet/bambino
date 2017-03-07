"use strict";

const express = require("express"),
    path = require("path"),
    routes = require("./lib/routes"),
    app = express(),
    server = require('http').Server(app),
    io = require("socket.io")(server),
    gpio = require("./lib/gpio")(io),
    port = process.env.PORT || 3000,
    menu = require("./lib/menu");

server.listen(port);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "public"));

app.use(express.static(
    path.join(__dirname, 'public')
));


// API Routes
app.get("/api/sounds", routes.sounds);
app.get("/api/book/:path", routes.book);
app.get("/api/quiz", routes.quiz);
app.get("/api/menu", (req, res) => res.send(menu));
app.get("/api/speed/:score", routes.speed);

// View Routes
app.get("/", (req, res) => res.render("index"));
menu.forEach(category => {
    app.get(`/${category.route}`, (req, res) => res.render(`${category.route}`));
});
