"use strict";

let express = require("express"),
    path = require("path"),
    routes = require("./lib/routes"),
    app = express(),
    server = require('http').Server(app),
    io = require("socket.io")(server),
    gpio = require("./lib/gpio")(io),
    port = process.env.PORT || 3000,
    categories = ["alphabet", "numbers", "quiz", "signs"];

server.listen(port);

app.set("view engine", "pug");
app.set("views", "./public");

app.use(express.static(
    path.join(__dirname, 'public')
));

app.get("/api/sounds", routes.sounds);
app.get("/api/signs", routes.signs);
app.get("/api/quiz", routes.quiz);
app.get("/api/menu", (req, res) => res.send(categories));


app.get("/", (req, res) => res.render("index"));
categories.forEach(category => {
    app.get(`/${category}`, (req, res) => res.render(`${category}`));
});
