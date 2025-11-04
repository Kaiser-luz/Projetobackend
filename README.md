# Jiromso - API de Gestão de Eventos

API RESTful completa para o projeto "Jiromso - Gestão de Eventos". Este backend, desenvolvido em Node.js e Express, segue o padrão de arquitetura MVC e inclui um sistema de autenticação de usuários baseado em JWT. Os dados são persistidos permanentemente em um banco de dados **SQLite**.

## ✨ Funcionalidades Principais

* **Arquitetura MVC:** Código organizado com separação de responsabilidades (Rotas, Controladores e Models).
* **Persistência de Dados:** Os dados de usuários e eventos são salvos em um arquivo de banco de dados SQLite (`jiromso.db`). Os dados **não são perdidos** ao reiniciar o servidor.
* **Autenticação Segura:**
    * Hashing de senhas com **bcryptjs** no momento do cadastro.
    * Sistema de login que retorna um **Token JWT** com tempo de expiração.
* **Rotas Protegidas:** As rotas de criação, atualização e deleção (`POST`, `PUT`, `DELETE`) de eventos são protegidas e só podem ser acessadas com um Token JWT válido.
* **Pronto para Front-end:** O servidor está configurado com `CORS` para permitir requisições de aplicações web (como o `index.html` fornecido).

## 🚀 Tecnologias Utilizadas

* **Node.js**
* **Express.js** (Framework do servidor)
* **SQLite3** (Driver para o banco de dados)
* **jsonwebtoken** (Autenticação JWT)
* **bcryptjs** (Hashing de senhas)
* **cors** (Habilita acesso do front-end)

---

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (v16 ou superior)
* [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
* (Opcional) Um cliente de API como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testes.
* (Opcional) Um visualizador de SQLite como o [DB Browser for SQLite](https://sqlitebrowser.org/dl/) para inspecionar o arquivo `jiromso.db`.

---

## 🖥️ Instalação e Execução (Backend)

Siga os passos para rodar o servidor da API:

**1. Clone o Repositório**
(Se não estiver em um .zip, clone o repositório)

**2. Navegue até a Pasta do Projeto**
Abra seu terminal e use o `cd` para entrar na pasta raiz do projeto:
```sh
cd caminho/para/a/pasta/jiromso-gestao-eventos
```

**3. Instale as Dependências**
Execute o comando abaixo para instalar `express`, `sqlite3`, `bcryptjs`, `jsonwebtoken` e `cors`.
```sh
npm install
```

**4. Inicie o Servidor**
Após a instalação, inicie o servidor:
```sh
node src/app.js
```

O servidor será iniciado. Na primeira execução, ele criará automaticamente o arquivo `jiromso.db` e as tabelas `eventos` e `usuarios`.

O terminal deve exibir:
```
Conectado ao banco de dados SQLite.
Servidor rodando em http://localhost:3000
```
O servidor agora está pronto para receber requisições.

---

## 🌐 Executando o Front-end (Opcional)

Um front-end simples (`index.html`) foi criado para consumir esta API (a rota pública `GET /api/eventos`).

1.  Certifique-se de que o **Backend está rodando** (Passo anterior).
2.  Navegue até a pasta `jiromso-frontend` (a pasta que está *ao lado* do backend).
3.  Abra o arquivo `index.html` diretamente no seu navegador (clique duplo).
4.  A página carregará e exibirá a lista de eventos salvos no banco de dados.

---

## ⚙️ Guia de Teste da API (Fluxo Completo)

Para testar a segurança e a persistência, siga este fluxo usando o **Postman** ou similar.

### 👤 Autenticação (Usuários)

#### 1. Cadastrar um novo usuário
* **Método:** `POST`
* **URL:** `http://localhost:3000/api/usuarios`
* **Body (raw/JSON):**
    ```json
    {
      "nome": "Professor Teste",
      "email": "professor@teste.com",
      "senha": "senha123"
    }
    ```
* **Resposta (Sucesso):** `201 Created`

#### 2. Fazer Login (Obter Token)
* **Método:** `POST`
* **URL:** `http://localhost:3000/api/usuarios/login`
* **Body (raw/JSON):**
    ```json
    {
      "email": "professor@teste.com",
      "senha": "senha123"
    }
    ```
* **Resposta (Sucesso):** `200 OK`. Copie o `token` da resposta.
    ```json
    {
      "message": "Login bem-sucedido!",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

---

### 📅 Gerenciamento de Eventos (Testando o CRUD)

#### 1. Criar um novo evento (Rota Protegida)
* **Método:** `POST`
* **URL:** `http://localhost:3000/api/eventos`
* **Autorização:**
    * Selecione a aba `Authorization`
    * Tipo: `Bearer Token`
    * Cole o `token` obtido no login.
* **Body (raw/JSON):**
    ```json
    {
        "nome": "Evento Salvo no Banco",
        "data": "2025-11-10",
        "localizacao": "Auditório",
        "descricao": "Este evento agora é permanente."
    }
    ```
* **Resposta (Sucesso):** `201 Created`.

#### 2. Listar todos os eventos (Rota Pública)
* **Método:** `GET`
* **URL:** `http://localhost:3000/api/eventos`
* **Nota:** Você verá o evento que acabou de criar (Ex: com `id: 1`).

#### 3. Teste de Persistência (O Teste Principal)
1.  No terminal, **pare o servidor** (pressione `Ctrl+C`).
2.  **Reinicie o servidor** (`node src/app.js`).
3.  No Postman, execute o **`GET /api/eventos`** novamente.
4.  **Resultado:** O "Evento Salvo no Banco" (`id: 1`) **ainda estará lá**, provando que os dados foram persistidos no arquivo `jiromso.db`.

#### 4. Atualizar um evento (Rota Protegida)
* **Método:** `PUT`
* **URL:** `http://localhost:3000/api/eventos/1` (use o ID do evento que você criou)
* **Autorização:** Use o mesmo `Bearer Token`.
* **Body (raw/JSON):**
    ```json
    {
        "nome": "Evento ATUALIZADO no Banco",
        "localizacao": "Sala 102"
    }
    ```
* **Resposta (Sucesso):** `200 OK`.

#### 5. Deletar um evento (Rota Protegida)
* **Método:** `DELETE`
* **URL:** `http://localhost:3000/api/eventos/1` (use o ID do evento)
* **Autorização:** Use o mesmo `Bearer Token`.
* **Resposta (Sucesso):** `204 No Content` (sem corpo de resposta).