import http from "http";
import exp from "express";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import stompit from "./stompit.js";

const app = exp();
const server = http.createServer(app);
const ioServer = new Server(server);

app.use(exp.static("www"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

ioServer.on("connection", function (socket) {
    console.log("a user connected");

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

app.post("/", (req, res) => {
    console.log(`POST / ${req.body}`);
    stompit.send(JSON.stringify(req.body));
    res.send("Message sent").status(200);
});

stompit.subscribe((msg) => {
    console.log("SOCKET: sending mesg to client" + msg);
    ioServer.emit("notify", msg);
    console.log("SOCKET: message sent to client");
});

export default server;
