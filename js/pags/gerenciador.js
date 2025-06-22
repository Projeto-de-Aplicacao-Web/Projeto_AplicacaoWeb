const usuarioLogado = localStorage.getItem("loggedInUser ");


function carregarTarefas() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || {};
  const lista = tarefas[usuarioLogado] || [];

  lista.forEach((tarefa, index) => {
    const div = document.createElement("div");
    div.classList.add("task-item");

    let conteudo = `<p>${tarefa.nome} - ${tarefa.status}</p>`;

    if (tarefa.imagem) {
      conteudo += `<img src="${tarefa.imagem}" alt="Imagem da tarefa" style="max-width: 150px; max-height: 150px; display: block; margin-top: 8px;">`;
    }

    conteudo += `
      <button onclick="finalizarTarefa(${index})">Concluir</button>
      <button onclick="deletarTarefa(${index})">Deletar</button>
    `;

    div.innerHTML = conteudo;
    taskList.appendChild(div);
  });
}

function adicionarTarefa() {
  const tarefaInput = document.getElementById("taskInput");
  const tarefaFile = document.getElementById("taskFile");
  const tarefaNome = tarefaInput.value.trim();

  if (!tarefaNome) {
    alert("Por favor, insira uma tarefa.");
    return;
  }

  function arquivoParaBase64(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  const arquivoImagem = tarefaFile.files[0];

  arquivoParaBase64(arquivoImagem)
    .then(base64Imagem => {
      const tarefas = JSON.parse(localStorage.getItem("tarefas")) || {};
      if (!tarefas[usuarioLogado]) {
        tarefas[usuarioLogado] = [];
      }

      tarefas[usuarioLogado].push({
        nome: tarefaNome,
        status: "Pendente",
        imagem: base64Imagem
      });

      localStorage.setItem("tarefas", JSON.stringify(tarefas));

      tarefaInput.value = "";
      tarefaFile.value = "";

      carregarTarefas();
    })
    .catch(err => {
      console.error("Erro ao converter imagem:", err);
      alert("Erro ao processar a imagem.");
    });
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

async function mostrarClimaBrasilia() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-15.7797&longitude=-47.9297&current_weather=true"
    );
    const data = await response.json();
    const temperatura = data.current_weather.temperature;

    const climaBox = document.getElementById("clima");
    if (climaBox) {
      climaBox.textContent = `🌤️ Brasília: ${temperatura}°C`;
    } else {
      console.warn("Elemento #clima não encontrado.");
    }
  } catch (erro) {
    console.error("Erro ao carregar clima:", erro);
  }
}


window.onload = () => {
  carregarTarefas();
  mostrarClimaBrasilia();
};
