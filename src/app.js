const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 8080;
const bodyParser = require("body-parser");

//Route import
const routUser = require("../route/listUserRoute");// import routes user
const routPost = require("../route/listPostRoute");//import routes post
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.status(200).render("index");
// });

app.use("/api/v1/users", routUser);
app.use("/api/v1/posts", routPost);

app.listen(port, () => {
  console.log(`Link server: http://localhost:${port}`);
});
