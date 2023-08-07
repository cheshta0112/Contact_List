const express = require("express"); //starting express server
const path = require("path");
const port = 9000;
const app = express(); //set the firing of the express

app.set("view engine", "ejs"); //told the app to use ejs as the view engine
app.set("views", path.join(__dirname, "views")); //specify the path for the views folder

//set up the middleware to read a request from the form. it read the form data then parses into the key value pair.
app.use(express.urlencoded()); //app.use signify the middleware, express.urlencoded takes the request and read or analyze the data.
app.use(express.static("assets")); //included the static file using middleware //it tells the app to go back and look to the asserts folder whenever you need the static files

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

app.post("/create-contact", function (req, res) {
  contactList.push({
    name: req.body.name,
    phone: req.body.phone,
  });
  console.log(contactList);
  return res.redirect("back");
});

app.listen(port, function (err) {
  if (err) {
    console.log("error in running the port", err);
  }
  console.log("server is up and running on the port:", port);
});
