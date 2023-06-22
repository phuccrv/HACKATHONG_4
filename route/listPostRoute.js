const express = require("express");
const route = express.Router();
const fs = require("fs");
const path = require("path");

// lấy ra danh sách post
const listPost = path.join(__dirname, "../user-post-api/posts.json");
console.log("danh sách post", listPost);//log xem danh sách post

// GET 1 post
route.get("/:id", (req, res) => {
  const postId = req.params.id;
  fs.readFile(listPost, (err, data) => {
    if (err) {
      res.status(500).send("Lỗi khi đọc dữ liệu");
      return;
    }
    const posts = JSON.parse(data);
    const post = posts.find((post) => post.id.toString() === postId);
    if (!post) {
      res.status(404).send("Bài viết không tồn tại");
      return;
    }
    res.status(200).json(post);
  });
});

//  GET ALL POST

route.get("/", (req, res) => {
  fs.readFile(listPost, (err, data) => {
    if (err) {
      res.status(500).send("Lỗi khi đọc dữ liệu");
      return;
    }
    const posts = JSON.parse(data);
    res.status(200).json(posts);
  });
});

// POST 1 post

function generateNewPostId(posts) {
  let maxId = 0;
  for (const post of posts) {
    if (post.id > maxId) {
      maxId = post.id;
    }
  }
  return maxId + 1;
}
route.post("/posts", (req, res) => {
  const newPost = req.body;
  fs.readFile(listPost, (err, data) => {
    if (err) {
      res.status(500).send("Lỗi khi đọc dữ liệu");
      return;
    }
    const posts = JSON.parse(data);
    const newPostId = generateNewPostId(posts);
    newPost.id = newPostId;
    posts.push(newPost);
    fs.writeFile(listPost, JSON.stringify(posts), (err) => {
      if (err) {
        res.status(500).send("Lỗi khi ghi dữ liệu");
        return;
      }
      res.status(200).json(newPost);
    });
  });
});

// PUT 1 POST

route.put("/posts/:id", (req, res) => {
  const postId = req.params.id;
  const updatedPostData = req.body;
  // đọc file
  fs.readFile(listPost, (err, data) => {
    if (err) {
      res.status(500).send("Lỗi khi đọc dữ liệu");
      return;
    }

    const posts = JSON.parse(data);
    const postIndex = posts.findIndex((post) => post.id.toString() === postId);
    if (postIndex === -1) {
      res.status(404).send("Bài viết không tồn tại");
      return;
    }
    const updatedPost = { ...posts[postIndex], ...updatedPostData };
    posts[postIndex] = updatedPost;

    fs.writeFile(listPost, JSON.stringify(posts), (err) => {
      if (err) {
        res.status(500).send("Lỗi khi ghi dữ liệu");
        return;
      }
      res.status(200).json(updatedPost);
    });
  });
});

// DELETE 1 POST
route.delete("/posts/:id", (req, res) => {
  const postId = req.params.id;

  fs.readFile(listPost, (err, data) => {
    if (err) {
      res.status(500).send("Lỗi khi đọc dữ liệu");
      return;
    }

    const posts = JSON.parse(data);
    const postIndex = posts.findIndex((post) => post.id.toString() === postId);
    if (postIndex === -1) {
      res.status(404).send("Bài viết không tồn tại");
      return;
    }

    const deletedPost = posts.splice(postIndex, 1)[0];

    fs.writeFile(listPost, JSON.stringify(posts), (err) => {
      if (err) {
        res.status(500).send("Lỗi khi ghi dữ liệu");
        return;
      }
      res.status(200).json(deletedPost);
    });
  });
});

module.exports = route;
