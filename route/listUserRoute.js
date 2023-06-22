const express = require("express");
const route = express.Router();
const fs = require("fs");
const path = require("path");
// lấy ra danh sách users
const listUsers = path.join(__dirname, "../user-post-api/users.json");


// GET users
route.route("/").get((req, res) => {
  fs.readFile(listUsers, (err, data) => {
    if (err) {
      res.status(500).send("dữ liệu lỗi");
      return;
    }
    const user = JSON.parse(data);
    res.status(200).json(user);
  });
});

// GET 1 user
route.route("/:id/").get((req, res) => {
  const userId = req.params.id;
  fs.readFile(listUsers, (err, data) => {
    if (err) {
      res.status(500).send("Lỗi khi đọc dữ liệu");
      return;
    }
    const users = JSON.parse(data);

    const user = users.find((user) => user.id.toString() === userId);
    console.log("user tại đây", users);
    if (!user) {
      res.status(404).send("Người dùng không tồn tại");
      return;
    }
    res.status(200).json(user);
    console.log(users);
  });
});


// POST user

route.post("/", (req, res) => {
    const newUser = req.body; 
    fs.readFile(listUsers, (err, data) => {
      if (err) {
        res.status(500).send("Lỗi khi đọc dữ liệu");
        return;
      }
      const users = JSON.parse(data);
      users.push(newUser); 
      fs.writeFile(listUsers, JSON.stringify(users), (err) => {
        if (err) {
          res.status(500).send("Lỗi khi ghi dữ liệu");
          return;
        }
        res.status(200).json(newUser);
      });
    });
  });

// PUT user

route.put("/:id", (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
    fs.readFile(listUsers, (err, data) => {
      if (err) {
        res.status(500).send("Lỗi khi đọc dữ liệu");
        return;
      }
      const users = JSON.parse(data);
      const user = users.find((user) => user.id === userId);
      if (!user) {
        res.status(404).send("Người dùng không tồn tại");
        return;
      }
      user.email = updatedUserData.email;
      fs.writeFile(listUsers, JSON.stringify(users), (err) => {
        if (err) {
          res.status(500).send("Lỗi khi ghi dữ liệu");
          return;
        }
        res.status(200).json(user);
      });
    });
  });

//   DELETE user
route.delete("/:id", (req, res) => {
    const userId = req.params.id;
    fs.readFile(listUsers, (err, data) => {
      if (err) {
        res.status(500).send("Lỗi khi đọc dữ liệu");
        return;
      }
      const users = JSON.parse(data);
      const userIndex = users.findIndex((user) => user.id === userId);
      if (userIndex === -1) {
        res.status(404).send("Người dùng không tồn tại");
        return;
      }
      const deletedUser = users.splice(userIndex, 1)[0]; 
      fs.writeFile(listUsers, JSON.stringify(users), (err) => {
        if (err) {
          res.status(500).send("Lỗi khi ghi dữ liệu");
          return;
        }
        res.status(200).json(deletedUser); 
      });
    });
  });
  



module.exports = route;
