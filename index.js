const express = require("express"); //starting express server
const path = require("path");
const port = 9000;
const app = express(); //set the firing of the express

app.set("view engine", "ejs"); //told the app to use ejs as the view engine
app.set("views", path.join(__dirname, "views")); //specify the path for the views folder

var contactList = [
  {
    name: "cheshta",
    phone: "7988639244",
  },
  {
    name: "raghav",
    phone: "9015070880",
  },
  {
    name: "priya",
    phone: "68568565",
  },
];
app.get("/", function (req, res) {
  return res.render("home", {
    title: "Contacts List",
    contact_list: contactList,
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log("error in running the port", err);
  }
  console.log("server is up and running on the port:", port);
});
