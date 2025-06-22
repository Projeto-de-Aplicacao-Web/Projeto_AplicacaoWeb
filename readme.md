## Projeto Desenvolvimento Web

## Grupo:

Amanda Ramos, Fellipe Andrade, Grazielle Rezende, Lorrany Estrela, Thauan Barbosa.

## Problema:

Nosso usuário enfrenta dificuldades para organizar suas atividades diárias, o que compromete sua produtividade e gera estresse. Queremos desenvolver uma solução que simplifique essa organização, tornando o cotidiano mais fácil, fluido e eficiente, ajudando o usuário a gerenciar melhor seu tempo e tarefas.

## Objetivo:

Proporcionar ao usuário uma experiência que torne sua vida mais organizada e prazerosa, facilitando o gerenciamento de suas atividades diária e promover maior produtividade e bem-estar.
Funcionalidades a serem criadas:

1. Cadastrar
   Permite registrar novos usuários ou dados no sistema.
2. Criar Lista
   Possibilita a criação de listas para organização de tarefas ou atividades.
3. Listar
   Exibe todas as listas ou itens criados pelo usuário.
4. Marcar como Concluído
   Permite ao usuário sinalizar tarefas como finalizadas.
5. Status
   Apresenta o status atual das tarefas (pendente, em andamento, concluído).
6. Editar
   Permite modificar informações das tarefas ou listas existentes.
7. Deletar
   Permite remover tarefas, listas ou dados indesejados.
8. Personalizar
   Oferece opções para customizar listas, perfis ou configurações do sistema.
9. Imagem
   Permite adicionar imagens para melhor identificação ou personalização das tarefas ou listas.
10. Mostrar Clima
    Exibe informações atualizadas sobre o clima, ajudando o usuário a se planejar melhor.

## Possível API:

Open-Meteo Link: https://open-meteo.com 

- Possível endpoint a serem consumidos:
  • Cadastrar Usuário
  POST /users
- Cria um novo usuário no sistema.
  • Criar Lista
  POST /lists
- Cria uma nova lista de tarefas.
  • Listar Listas
  GET /lists
- Retorna todas as listas do usuário.
  • Marcar Tarefa como Concluída
  PATCH /tasks/{taskId}/complete
- Atualiza o status da tarefa para concluída.
  • Obter Status da Tarefa
  GET /tasks/{taskId}/status
- Retorna o status atual da tarefa.
  • Editar Tarefa ou Lista
  PUT /tasks/{taskId} ou PUT /lists/{listId}
- Atualiza as informações da tarefa ou lista.
  • Deletar Tarefa ou Lista
  DELETE /tasks/{taskId} ou DELETE /lists/{listId}
- Remove a tarefa ou lista do sistema.
  • Personalizar Lista ou Perfil
  PATCH /users/{userId}/customize ou PATCH /lists/{listId}/customize
- Atualiza preferências de personalização.
  • Adicionar Imagem à Tarefa ou Lista
  POST /tasks/{taskId}/image ou POST /lists/{listId}/image
- Adiciona uma imagem relacionada.
  • Mostrar Clima
  GET /v1/forecast
   • Retorna previsão do tempo para uma localização específica
  GET /V1/archive
   • 	Retorna dados históricos do clima