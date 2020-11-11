var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [];
var waitlist = [];

// ROUTES
// ==============================================================
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/viewTables", function(req, res) {
    res.sendFile(path.join(__dirname, "viewTables.html"));
});

app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
})


// Create New Reservations
app.post("/api/reservations", function(req, res) {
    var newReservation = req.body;

    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReservation);

    reservations.push(newReservation);

    res.json(newReservation);
});

// Create New Waitlist
app.post("/api/waitlist", function(req, res) {
    var newWaitlist = req.body;

    newWaitlist.routeName = newWaitlist.name.replace(/\s+/g, "").toLowerCase();

    console.log(newWaitlist);

    waitlist.push(newWaitlist);

    res.json(newWaitlist);
});



app.listen(PORT, function() {
    console.log("App listening on port " + PORT);
})