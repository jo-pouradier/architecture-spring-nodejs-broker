let counterDiv = 0;

function go() {
    let name = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    console.log("POST /", name, prenom);

    // Connect to the socket
    let socket = io();

    // Set up the listener for the "notify" event
    socket.on("notify", function (msg) {
        console.log(msg);
        console.log(typeof msg);

        let elem = document.createElement("div");
        elem.setAttribute("class", "personne");
        elem.setAttribute("id", counterDiv);
        counterDiv++;
        elem.innerHTML = msg;
        document.getElementById("personnes").appendChild(elem);

        // Disconnect the socket after receiving the message
        socket.disconnect();
        console.log("Socket disconnected after receiving message.");
    });

    // Send the POST request
    fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, prenom }),
    })
        .then((res) => res.text())
        .then((res) => {
            console.log("POST: result=", res);
        });
}

