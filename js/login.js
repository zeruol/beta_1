document.querySelector("#login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
  
    const accounts = [
      { username: "user1", password: "1111" },
      { username: "user2", password: "2222" },
      { username: "admin", password: "1234" }
    ];
  
    const account = accounts.find(acc => acc.username === username && acc.password === password);
  
    if (username === "" || password === "") {
      alert("Please enter both username and password.");
    } else if (account) {
      alert("Login successful!");
      localStorage.setItem("loggedInUser", username);
      window.location.href = "../index.html"; // Chuyển về trang chủ
    } else {
      alert("Invalid username or password.");
    }
  });