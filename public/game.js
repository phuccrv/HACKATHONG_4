// Gọi API để lấy danh sách người chơi
fetch("/user")
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("An error occurred while retrieving player data");
    }
  })
  .then(function(data) {
    // Lấy danh sách người chơi
    var players = data.players;

    // Gọi hàm để render tên người chơi vào phần tử <th>
    renderPlayerNames(players);
  })
  .catch(function(error) {
    console.error(error);
  });

// Hàm để render tên người chơi vào phần tử <th>
function renderPlayerNames(players) {
  var thElements = document.querySelectorAll("th.player-name");

  // Sử dụng map để tạo mảng các chuỗi tên người chơi
  var playerNames = players.map(function(player) {
    return player.name;
  });

  // Duyệt qua danh sách phần tử <th> và gán tên người chơi tương ứng
  thElements.forEach(function(th, index) {
    th.textContent = playerNames[index];
  });
}
