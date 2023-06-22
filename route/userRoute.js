const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const playersFilePath = path.join(__dirname, "../dataGame/game.json");

router.get("/", (req, res) => {
  if (!fs.existsSync(playersFilePath)) {
    return res.status(404).send("Tệp tin không tồn tại");
  }

  const playersData = fs.readFileSync(playersFilePath, "utf-8");
  const players = JSON.parse(playersData);

  res.send(players);
});

router.post("/", (req, res) => { 
  const { player1, player2, player3, player4 } = req.body;

  if (!player1 || !player2 || !player3 || !player4) {
    return res.status(400).send("Tên người chơi không được bỏ trống");
  }

  let players = { players: [] };
  if (fs.existsSync(playersFilePath)) {
    const playersData = fs.readFileSync(playersFilePath, "utf-8");
    players = JSON.parse(playersData);
  }

  players.players = [
    { namePlayer1: player1 },
    { namePlayer2: player2 },
    { namePlayer3: player3 },
    { namePlayer4: player4 },
  ];

  fs.writeFileSync(playersFilePath, JSON.stringify(players, null, 2));

  res.status(200).send("Thêm người chơi thành công");
});

module.exports = router;
