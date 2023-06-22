const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 8080;
const bodyParser = require("body-parser");

//Route import

app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());
// app.get("/", (req, res) => {
//   res.status(200).render("index");
// });

const gameRoute = require('../route/gameRoute');
const userRoute = require('../route/userRoute');

// Sử dụng các tệp route
app.use('/api/v1/game', gameRoute);
app.use('/api/v1/user', userRoute);


app.listen(port, () => {
    console.log(`Link server: http://localhost:${port}`);
});
