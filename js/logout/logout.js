
      function goToLogin() {
        window.location.href = "login.html";
      }

      document
        .getElementById("cadastroForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();
          const username = document.getElementById("username").value.trim();
          const password = document.getElementById("password").value;
          const messageEl = document.getElementById("message");

          if (!username || !password) {
            messageEl.textContent = "Preencha todos os campos.";
            return;
          }
          if (password.length < 8 || password.length > 20) {
            messageEl.textContent = "A senha deve ter entre 8 e 20 caracteres.";
            return;
          }

          const storedUsers = JSON.parse(localStorage.getItem("users")) || {};

          if (storedUsers[username]) {
            messageEl.textContent = "Usuário já cadastrado.";
            return;
          }

          storedUsers[username] = password;
          localStorage.setItem("users", JSON.stringify(storedUsers));

          messageEl.style.color = "green";
          messageEl.textContent =
            "Cadastro realizado com sucesso! Redirecionando para login...";

          setTimeout(() => {
            window.location.href = "login.html";
          }, 1500);
        });