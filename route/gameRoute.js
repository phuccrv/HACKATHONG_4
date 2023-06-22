const express = require("express");
const router = express.Router();
const path = require("path");

// Tuyến đường GET cho trang chơi trò chơi
router.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, '..', "../public/game.html"));
});

// Các tuyến đường khác liên quan đến trò chơi có thể được thêm sau

module.exports = router;
