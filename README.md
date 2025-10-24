# Projetobackend
API de Gestão de Eventos - Jiromso
Esta é uma API RESTful para agendar e gerenciar eventos, desenvolvida com Node.js e Express. O projeto inclui funcionalidades de CRUD (Criar, Ler, Atualizar, Deletar) para eventos e um sistema de autenticação de usuários baseado em JWT (JSON Web Tokens).

Tecnologias Utilizadas
Node.js: Ambiente de execução para JavaScript no servidor.

Express.js: Framework para construção de APIs e aplicações web.

jsonwebtoken: Para gerar e verificar tokens de autenticação (JWT).

bcryptjs: Para criptografar e comparar senhas de forma segura.

Pré-requisitos
Antes de começar, certifique-se de ter o Node.js (versão LTS recomendada) instalado em sua máquina. O NPM (Node Package Manager) é instalado automaticamente com o Node.js.

Você pode verificar suas versões com os comandos:

Bash

node -v
npm -v
Instalação e Configuração
Siga os passos abaixo para configurar o ambiente de desenvolvimento.

Clone o Repositório (Se o projeto estiver no Git)

Bash

git clone <URL-do-seu-repositorio>
cd jiromso-gestao-eventos
(Ou, se você tiver os arquivos localmente, apenas navegue até a pasta do projeto)

Bash

cd caminho/para/jiromso-gestao-eventos
Instale as Dependências Execute o comando abaixo para instalar todas as bibliotecas listadas no package.json.

Bash

npm install
Como Executar o Projeto
Para iniciar o servidor da API, execute o seguinte comando no terminal, a partir da raiz do projeto:

Bash

node src/app.js
Você verá uma mensagem no console confirmando que o servidor está ativo e escutando na porta 3000:

Servidor rodando em http://localhost:3000
Para parar o servidor, pressione Ctrl+C no terminal.
Endpoints da API
A seguir está a lista de todos os endpoints disponíveis na API.

Autenticação e Usuários
Método	Endpoint	Descrição	Autenticação	Corpo da Requisição (Exemplo)
POST	/api/usuarios	Cadastra um novo usuário.	Não	{ "nome": "Alice", "email": "alice@email.com", "senha": "123" }
POST	/api/usuarios/login	Autentica um usuário e retorna um token JWT.	Não	{ "email": "alice@email.com", "senha": "123" }

Eventos
Nota: Para acessar as rotas protegidas, você deve incluir o token JWT no cabeçalho Authorization de sua requisição, no formato Bearer <seu-token-aqui>.

Método	Endpoint	Descrição	Autenticação	Corpo da Requisição (Exemplo)
GET	/api/eventos	Lista todos os eventos.	Não	N/A
GET	/api/eventos/:id	Busca um evento por ID.	Não	N/A
POST	/api/eventos	Cria um novo evento.	Requerida	{ "nome": "Evento X", "data": "2025-12-25", "localizacao": "Online" }
PUT	/api/eventos/:id	Atualiza um evento por ID.	Requerida	{ "nome": "Evento X Atualizado", "localizacao": "Presencial" }
DELETE	/api/eventos/:id	Deleta um evento por ID.	Requerida	N/A
