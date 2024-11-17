import Stomp from "stompit";

class Stompit {
    static connectionOptions = {
        host: "localhost",
        port: 61613,
        connectHeaders: {
            host: "/",
            login: "myuser",
            passcode: "mypwd",
            "heart-beat": "5000,5000",
        },
    };

    static receiveHeaders = {
        destination: "fr.cpe.nodejs-app.in",
        ack: "client-individual",
    };
    static sendHeaders = {
        destination: "fr.cpe.spring-app.in",
        "content-type": "text/plain",
    };

    constructor({}) {
        this.connectionOptions = Stompit.connectionOptions;
        this.connectHeaders = Stompit.connectHeaders;
        this.receiveHeaders = Stompit.receiveHeaders;
        this.sendHeaders = Stompit.sendHeaders;
    }

    /**
     *
     * @param {String} msg
     */
    send(msg) {
        Stomp.connect(this.connectionOptions, (error, client) => {
            if (error) {
                console.log("connect error " + error);
                return;
            }

            console.log("STOMPIT: sending message: " + msg, " of type: " + typeof msg);
            const frame = client.send(this.sendHeaders);
            frame.write(msg);
            frame.end();

            client.disconnect();
            console.log("STOMPIT: message sent, disconnect");
        });
    }

    subscribe(callback) {
        Stomp.connect(this.connectionOptions, (error, client) => {
            if (error) {
                return console.error(error);
            }
            console.log("STOMPIT: connected to subscribe event");
            client.subscribe(this.receiveHeaders, (error, message) => {
                if (error) {
                    return console.error(error);
                }

                message.readString("utf-8", (error, body) => {
                    if (error) {
                        return console.error(error);
                    }
                    console.log("STOMPIT: received message: " + body);
                    callback(body);
                    client.ack(message);
                    // client.disconnect();
                });
            });
        });
    }
}

export default new Stompit({});
