"use strict";

var path = require("path"),
    bodyParser = require("body-parser"),
    express = require("express"),
    session = require("express-session");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
app.set("/view", path.join(__dirname, "/public/view"));
app.use("/node", express.static(__dirname + "/node_modules"));

app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true
    })
);

var driveApi = require("./api/drive.api");
app.use("/api/drive", driveApi);

app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(port, function(err) {
    if (err) {
        console.error(err);
        return;
    }

    console.log("Server running on port " + port);
});
