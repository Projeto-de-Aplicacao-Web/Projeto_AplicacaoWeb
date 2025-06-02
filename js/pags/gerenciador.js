
      const usuarioLogado = localStorage.getItem("loggedInUser ");
      const taskListElement = document.getElementById("taskList");

      function carregarTarefas() {
        const tarefas = JSON.parse(localStorage.getItem("tarefas")) || {};
        const tarefasUsuario = tarefas[usuarioLogado] || [];
        taskListElement.innerHTML = "";

        tarefasUsuario.forEach((tarefa, index) => {
          const tarefaDiv = document.createElement("div");
          tarefaDiv.className = "task-item";
          tarefaDiv.innerHTML = `
                    <span>${tarefa.nome} <span class="task-status">(${tarefa.status})</span></span>
                    <div>
                        <button onclick="finalizarTarefa(${index})">Finalizar</button>
                        <button onclick="deletarTarefa(${index})">Deletar</button>
                    </div>
                `;
          taskListElement.appendChild(tarefaDiv);
        });
      }

      function adicionarTarefa() {
        const tarefaInput = document.getElementById("taskInput");
        const tarefaNome = tarefaInput.value.trim();

        if (!tarefaNome) {
          alert("Por favor, insira uma tarefa.");
          return;
        }

        const tarefas = JSON.parse(localStorage.getItem("tarefas")) || {};
        if (!tarefas[usuarioLogado]) {
          tarefas[usuarioLogado] = [];
        }

        tarefas[usuarioLogado].push({ nome: tarefaNome, status: "Pendente" });
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        tarefaInput.value = "";
        carregarTarefas();
      }

      function finalizarTarefa(index) {
        const tarefas = JSON.parse(localStorage.getItem("tarefas")) || {};
        const tarefasUsuario = tarefas[usuarioLogado];

        if (tarefasUsuario && tarefasUsuario[index]) {
          tarefasUsuario[index].status = "Concluída";
          localStorage.setItem("tarefas", JSON.stringify(tarefas));
          carregarTarefas();
        }
      }

      function deletarTarefa(index) {
        const tarefas = JSON.parse(localStorage.getItem("tarefas")) || {};
        const tarefasUsuario = tarefas[usuarioLogado];

        if (tarefasUsuario && tarefasUsuario[index]) {
          tarefasUsuario.splice(index, 1);
          localStorage.setItem("tarefas", JSON.stringify(tarefas));
          carregarTarefas();
        }
      }

      // Carregar tarefas ao iniciar a página
      window.onload = carregarTarefas;