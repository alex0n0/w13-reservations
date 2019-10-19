//asdf
// Dependencies
var express = require("express");
var path = require("path");

// Create a basic server using Express.JS
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Create a few array variables that will hold the data
var reservations = [
  {
    routeName: "liz",
    name: "Liz",
    number: "000 000 000",
    email: 2000,
    uniqueID: 1
  }
];

var waitingList = [];

// * Create a set of routes for getting and posting table data

app.get("/api/tables", function(req, res) {
  //   var chosen = req.params.reservations;

  console.log(reservations);
  return res.json(reservations);
});

app.get("/api/tables/:table", function(req, res) {
  // * Create a set of routes for displaying the HTML pages
  // app.get("/", function(req, res) {
  //   res.send("Testing hot table!");
  return res.json(reservations[0]);
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "/assets/pages/reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "/assets/pages/table.html"));
});

app.get("/api/tables", function(req, res) {
  return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitingList);
});

// * Use jQuery to run AJAX calls to GET and POST data from users to the Express server

app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  if (reservations.length < 5) {
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.routeName = newReservation.name
      .replace(/\s+/g, "")
      .toLowerCase();

    console.log(newReservation);

    reservations.push(newReservation);

    res.json({
      status: "added-reservation",
      table: reservations
    });
  } else {
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.routeName = newReservation.name
      .replace(/\s+/g, "")
      .toLowerCase();

    console.log(newReservation);

    waitingList.push(newReservation);

    res.json({
      status: "added-waitingList",
      table: reservations
    });
  }
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// check

// Your server at this point should do the BARE MINIMUM. (Effectively, it should just say: "Listening at PORT 3000" when the command node server.js is run.)
