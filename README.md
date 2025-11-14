# Jiromso - API de Gestão de Eventos

API RESTful completa para o projeto "Jiromso - Gestão de Eventos". Este backend, desenvolvido em Node.js e Express, segue o padrão de arquitetura MVC e inclui um sistema de autenticação de usuários baseado em JWT.

Diferente de versões anteriores, este projeto agora implementa **persistência de dados permanente** com **SQLite** e possui uma suíte de **testes automatizados** com **Jest** e **Supertest**.

## ✨ Funcionalidades Principais

* **Arquitetura MVC:** Código organizado com separação de responsabilidades (Rotas, Controladores e Models).
* **Persistência de Dados (SQLite):** Os dados de usuários e eventos são salvos permanentemente no arquivo `jiromso.db`. Os dados **não são perdidos** ao reiniciar o servidor.
* **Autenticação Segura (JWT):**
    * Hashing de senhas com **bcryptjs** no momento do cadastro.
    * Sistema de login que retorna um Token JWT com tempo de expiração.
* **Rotas Protegidas:** Rotas de `POST`, `PUT`, `DELETE` de eventos são protegidas e só podem ser acessadas com um Token JWT válido.
* **Testes Automatizados (TDD):**
    * O projeto é configurado com **Jest** e **Supertest**.
    * Testes de integração "mockam" (simulam) o banco de dados para velocidade e isolamento.
    * Testes unitários validam a lógica dos controladores.
* **Pronto para Front-end:** O servidor está configurado com `CORS` para permitir requisições de aplicações web.

## 🚀 Tecnologias Utilizadas

* **Node.js** / **Express.js** (Servidor)
* **SQLite3** (Banco de Dados)
* **jsonwebtoken** (Autenticação JWT)
* **bcryptjs** (Hashing de senhas)
* **cors** (Habilita acesso do front-end)
* **Jest** (Framework de Testes)
* **Supertest** (Testes de API HTTP)
* **Nodemon** (Desenvolvimento)

---

## 🖥️ Instalação e Execução

Siga os passos para rodar o projeto localmente.

### 1. Pré-requisitos

* [Node.js](https://nodejs.org/) (v16 ou superior)
* [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)

### 2. Instalação

Navegue até a pasta raiz do projeto (`jiromso-gestao-eventos`) e execute o comando abaixo. Ele instalará **todas** as dependências necessárias, incluindo as de desenvolvimento (`jest`, `nodemon`, etc.).

```sh
npm install
```

### 3. Executando o Servidor

Após a instalação, você pode iniciar o servidor de duas formas:

**A) Modo de Produção (Recomendado para testes simples):**

```sh
node server.js
```

**B) Modo de Desenvolvimento (com Nodemon):**
Este modo reinicia o servidor automaticamente a cada mudança nos arquivos `.js`.

```sh
npm run dev
```

Ao iniciar, o servidor criará automaticamente o arquivo `jiromso.db` (caso não exista) e exibirá a mensagem:
`Conectado ao banco de dados SQLite.`
`Servidor rodando em http://localhost:3000`

---

## 🧪 Como Rodar os Testes Automatizados

Configuramos uma suíte de testes com Jest para garantir a qualidade do código. Os testes **não tocam no banco de dados real**; eles usam "mocks" para simular o `eventoModel`.

Para executar todos os testes (unitários e de integração), rode:

```sh
npm test
```

Você verá um relatório detalhado de todos os testes passando, incluindo a verificação das rotas, a lógica dos controladores e a segurança das rotas protegidas.

---

## ⚙️ Guia de Teste Manual (Postman)

Para testar manualmente a API e a persistência de dados.

### 1. Cadastrar um Usuário
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

### 2. Fazer Login (Obter Token)
* **Método:** `POST`
* **URL:** `http://localhost:3000/api/usuarios/login`
* **Body (raw/JSON):**
    ```json
    {
      "email": "professor@teste.com",
      "senha": "senha123"
    }
    ```
* **Ação:** Copie o `token` da resposta.

### 3. Criar um Evento (Rota Protegida)
* **Método:** `POST`
* **URL:** `http://localhost:3000/api/eventos`
* **Autorização:**
    * Tipo: `Bearer Token`
    * Cole o `token` obtido no login.
* **Body (raw/JSON):**
    ```json
    {
        "nome": "Evento Salvo no Banco",
        "data": "2025-11-10",
        "localizacao": "Auditório"
    }
    ```

### 4. Listar Eventos (Rota Pública)
* **Método:** `GET`
* **URL:** `http://localhost:3000/api/eventos`
* **Resultado:** Você verá o "Evento Salvo no Banco" na lista.

### 5. Teste de Persistência (O Teste Principal)
1.  No terminal, **pare o servidor** (`Ctrl+C`).
2.  **Reinicie o servidor** (`npm run dev` ou `node server.js`).
3.  No Postman, execute o **`GET /api/eventos`** novamente.
4.  **Resultado:** O evento **ainda estará lá**, provando que foi salvo no arquivo `jiromso.db`.

### 6. Deletar um Evento (Rota Protegida)
* **Método:** `DELETE`
* **URL:** `http://localhost:3000/api/eventos/1` (use o ID do evento que você criou)
* **Autorização:** Use o mesmo `Bearer Token`.
* **Resposta (Sucesso):** `204 No Content`.
