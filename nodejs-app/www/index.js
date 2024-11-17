let socket = io();
socket.on("notify", function (msg) {
    console.log(msg);
    console.log(typeof msg);
    let elem = document.createElement("div");
    elem.setAttribute("class", "personne");
    elem.setAttribute("id", counterDiv);
    counterDiv++;
    elem.innerHTML = msg;
    let count = msg.split("{").length;
    elem.setAttribute("id", count);
    document.getElementById("personnes").appendChild(elem);
});

let counterDiv = 0;
function go() {
    let name = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    console.log("POST /", name, prenom);
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
