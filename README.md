<<<<<<< Updated upstream
# Projetobackend
=======
# Jiromso - API de Gestão de Eventos

Esta é uma API RESTful para o projeto "Jiromso - Gestão de Eventos", desenvolvida como parte da avaliação da matéria de Backend.

A API permite operações CRUD (Criar, Ler, Atualizar, Deletar) para gerenciar eventos e inclui um sistema de autenticação de usuários baseado em JWT (JSON Web Tokens) para proteger rotas sensíveis.

## Funcionalidades

* **Autenticação de Usuários:**
    * `POST /api/usuarios`: Cadastro de novos usuários (com hash de senha usando `bcryptjs`).
    * `POST /api/usuarios/login`: Login de usuários, retornando um Token JWT.
* **Gerenciamento de Eventos (CRUD):**
    * `GET /api/eventos`: Lista todos os eventos (Rota Pública).
    * `GET /api/eventos/:id`: Busca um evento específico por ID (Rota Pública).
    * `POST /api/eventos`: Cria um novo evento (Rota Protegida).
    * `PUT /api/eventos/:id`: Atualiza um evento existente (Rota Protegida).
    * `DELETE /api/eventos/:id`: Deleta um evento (Rota Protegida).

## Tecnologias Utilizadas

* **Node.js:** Ambiente de execução JavaScript no servidor.
* **Express.js:** Framework para construção da API.
* **JSON Web Token (jsonwebtoken):** Para geração e verificação de tokens de autenticação.
* **bcryptjs:** Para criptografia (hashing) de senhas.

---

## Pré-requisitos

Para rodar este projeto, você precisará ter instalado em sua máquina:

* [Node.js](https://nodejs.org/) (que inclui o `npm`).

## Como Instalar e Rodar

Siga os passos abaixo para executar o projeto localmente.

### 1. Clone ou Baixe o Repositório

Primeiro, obtenha os arquivos do projeto. Se estiver em um `.zip`, apenas extraia-o.

### 2. Navegue até a Pasta do Projeto

Abra seu terminal (Prompt de Comando, PowerShell, etc.) e navegue até a pasta raiz do projeto:

```sh
cd caminho/para/a/pasta/jiromso-gestao-eventos
```

### 3. Instale as Dependências

Dentro da pasta raiz do projeto, execute o comando abaixo para instalar todas as bibliotecas necessárias (`express`, `jsonwebtoken`, `bcryptjs`):

```sh
npm install
```

### 4. Inicie o Servidor

Após a instalação das dependências, inicie o servidor com o seguinte comando:

```sh
node src/app.js
```

Se tudo ocorrer bem, você verá a seguinte mensagem no terminal:

```
Servidor rodando em http://localhost:3000
Para parar o servidor, pressione Ctrl+C no terminal.
```

---

## Como Testar a API (Usando Postman ou Insomnia)

A API armazena os dados em memória, então os dados serão reiniciados toda vez que o servidor parar.

### Fluxo de Teste Completo

O fluxo de teste recomendado é:
1.  Cadastrar um usuário.
2.  Fazer login com esse usuário para obter um Token.
3.  Usar esse Token para criar, atualizar e deletar eventos.

---

### Passo 1: Cadastrar um Usuário

* **Método:** `POST`
* **URL:** `http://localhost:3000/api/usuarios`
* **Body (raw/JSON):**
    ```json
    {
      "nome": "Professor Teste",
      "email": "professor@teste.com",
      "senha": "senhaforte123"
    }
    ```
* **Resposta:** `201 Created` com os dados do usuário (sem a senha).

---

### Passo 2: Fazer Login (Obter o Token)

* **Método:** `POST`
* **URL:** `http://localhost:3000/api/usuarios/login`
* **Body (raw/JSON):**
    ```json
    {
      "email": "professor@teste.com",
      "senha": "senhaforte123"
    }
    ```
* **Resposta:** `200 OK` com a mensagem de sucesso e o **Token JWT**.
    ```json
    {
      "message": "Login bem-sucedido!",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
* **Ação:** **Copie o `token`** para usar nos próximos passos.

---

### Passo 3: Criar um Evento 

* **Método:** `POST`
* **URL:** `http://localhost:3000/api/eventos`
* **Autorização:**
    * Tipo: **Bearer Token**
    * Cole o `token` obtido no Passo 2.
* **Body (raw/JSON):**
    ```json
    {
        "nome": "Evento de Teste",
        "data": "2025-12-01",
        "localizacao": "Laboratório C1",
        "descricao": "Teste da API de eventos."
    }
    ```
* **Resposta:** `201 Created` com os dados do evento criado. (Ex: ID 2).

---

### Passo 4: Atualizar um Evento (Rota Protegida)

* **Método:** `PUT`
* **URL:** `http://localhost:3000/api/eventos/[ID_DO_EVENTO]` (Ex: `http://localhost:3000/api/eventos/4`)
* **Autorização:**
    * Tipo: **Bearer Token**
    * Cole o mesmo `token`.
* **Body (raw/JSON):** 
    ```json
    {
        "nome": "Evento ATUALIZADO",
        "localizacao": "Auditório Principal"
    }
    ```
* **Resposta:** `200 OK` com o objeto do evento atualizado.

---

### Passo 5: Deletar um Evento (Rota Protegida)

* **Método:** `DELETE`
* **URL:** `http://localhost:3000/api/eventos/[ID_DO_EVENTO]` (Ex: `http://localhost:3000/api/eventos/4`)
* **Autorização:**
    * Tipo: **Bearer Token**
    * Cole o mesmo `token`.
* **Resposta:** `204 No Content`. A resposta virá vazia, indicando sucesso na deleção.

---

### Teste (Rotas Públicas)

A qualquer momento, você pode verificar a lista de eventos sem precisar de token:

* **Método:** `GET`
* **URL:** `http://localhost:3000/api/eventos`
* **Resposta:** `200 OK` com a lista de todos os eventos atualmente em memória.
>>>>>>> Stashed changes
