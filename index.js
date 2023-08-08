const express = require("express"); //starting express server
const path = require("path");
const port = 8000; //choose a path

const db = require("./config/mongoose"); //including a mongoose file
const Contact = require("./models/contact");

const app = express(); //set the firing of the express

app.set("view engine", "ejs"); //told the app to use ejs as the view engine
app.set("views", path.join(__dirname, "views")); //specify the path for the views folder

//set up the middleware to read a request from the form. it read the form data then parses into the key value pair.
app.use(express.urlencoded()); //app.use signify the middleware, express.urlencoded takes the request and read or analyze the data.
app.use(express.static("assets")); //included the static file using middleware //it tells the app to go back and look to the asserts folder whenever you need the static files

app.get("/", function (req, res) {
  Contact.find({}) // Removed the callback function
    .then((contacts) => {
      return res.render("home", {
        title: "Contact List",
        contact_list: contacts,
      });
    })
    .catch((err) => {
      console.log("error in fetching contacts from db", err);
      return;
    });
});

app.post("/create-contact", function (req, res) {
  Contact.create({
    name: req.body.name,
    phone: req.body.phone,
  })
    .then((newContact) => {
      console.log("******", newContact);
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("Error in creating a contact!", err);
      return;
    });
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log("Yup!My Server is running on Port", port);
});

app.get("/delete-contact/", function (req, res) {
  let id = req.query.id;

  Contact.findOneAndDelete({ _id: id }) // Pass the query as an object
    .then(() => {
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("error in deleting the object", err);
      return;
    });
});
