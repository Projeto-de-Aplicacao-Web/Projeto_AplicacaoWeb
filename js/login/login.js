
      function goToCadastro() {
        window.location.href = "cadastro.html";
      }

      document
        .getElementById("loginForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();
          const username = document.getElementById("username").value.trim();
          const password = document.getElementById("password").value;
          const messageEl = document.getElementById("message");

          if (!username || !password) {
            messageEl.textContent = "Preencha todos os campos.";
            return;
          }

          const storedUsers = JSON.parse(localStorage.getItem("users")) || {};
          if (!storedUsers[username]) {
            messageEl.textContent = "Usuário não encontrado.";
            return;
          }
          if (storedUsers[username] !== password) {
            messageEl.textContent = "Senha incorreta.";
            return;
          }

          messageEl.style.color = "green";
          messageEl.textContent =
            "Login realizado com sucesso! Redirecionando...";
          localStorage.setItem("loggedInUser", username);
          setTimeout(() => {
            window.location.href = "gerenciador.html";
          }, 1500);
        });