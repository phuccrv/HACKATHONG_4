document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var player1 = document.getElementById("playerName1").value;
    var player2 = document.getElementById("playerName2").value;
    var player3 = document.getElementById("playerName3").value;
    var player4 = document.getElementById("playerName4").value;
  
    document.getElementById("errorText").style.display = "none";
  
    if (player1 && player2 && player3 && player4) {
      fetch("/", { // Đã thay đổi đường dẫn tại đây
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player1: player1,
          player2: player2,
          player3: player3,
          player4: player4,
        }),
      })
        .then(function (response) {
          if (response.ok) {
            window.location.href = "./game.html";
          } else {
            throw new Error("An error occurred while sending the request");
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      document.getElementById("errorText").style.display = "block";
    }
  });
  