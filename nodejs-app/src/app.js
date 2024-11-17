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
    try {
        stompit.subscribe((result) => {
            console.log("in io to socket=" + socket + " callback with result: ", result);
            try {
                socket.emit("notify", result);
                socket.disconnect();
                console.log("end #################")
            } catch (e) {
                console.log(e);
            }
        });
    } catch (e) {
        console.log(e);
    }
});

app.post("/", (req, res) => {
    console.log(`POST / ${req.body}`);
    try {
        stompit.send(JSON.stringify(req.body));
        res.send("Message sent").status(200);
    } catch (e) {
        console.log(e);
        res.send("Error sending message").status(500);
    }
});

export default server;
