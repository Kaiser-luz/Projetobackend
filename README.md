# 📅 Jiromso - Sistema de Gestão de Eventos

> **Disciplina:** Back-end | **Professor:** Sidney

Este projeto é uma aplicação **Full Stack** robusta para agendamento e gerenciamento de eventos. O sistema foi desenvolvido com foco em arquitetura **MVC**, segurança avançada com controle de acesso (RBAC), persistência de dados e qualidade de código assegurada por testes automatizados.

---

## ✨ Funcionalidades Principais

### 🔐 Segurança e Autenticação
* **Cadastro e Login:** Senhas criptografadas com **Bcrypt** e sessões gerenciadas via **JSON Web Tokens (JWT)**.
* **Controle de Acesso (RBAC):**
    * 👮‍♂️ **Administrador:** Possui permissão total (Superusuário) para criar, editar e deletar **qualquer** evento do sistema.
    * 👤 **Usuário Comum:** Pode criar eventos e visualizar a agenda completa, mas só tem permissão para editar ou deletar os eventos que **ele mesmo criou**.

### 📅 Gestão de Eventos (CRUD)
* Criação, Leitura, Atualização e Exclusão de eventos.
* Dados detalhados: Nome, Data (com calendário), Localização, Lista de Participantes e Descrição.
* **Persistência:** Dados salvos permanentemente em banco de dados **SQLite** (`jiromso.db`).

### 🎨 Interface Profissional (Front-end)
* Design responsivo nas cores institucionais (**Azul e Grená**).
* Validação de formulários em tempo real.
* Feedback visual amigável (mensagens de erro/sucesso coloridas).
* **Single Server:** O Front-end é servido automaticamente pelo Back-end, simplificando a execução.

### 🧪 Qualidade de Código
* **Testes Automatizados:** Suíte de testes (Unitários e de Integração) utilizando **Jest** e **Supertest**.
* **Mocking:** Testes isolados que não poluem o banco de dados real.

---

## 🚀 Tecnologias Utilizadas

| Categoria | Tecnologias |
| :--- | :--- |
| **Servidor** | Node.js, Express.js |
| **Banco de Dados** | SQLite3 (Serverless) |
| **Segurança** | JWT, Bcryptjs, CORS |
| **Testes (TDD)** | Jest, Supertest |
| **Front-end** | HTML5, CSS3, JavaScript Vanilla |

---

## 📦 Instalação e Execução

Siga os passos abaixo para rodar o projeto em sua máquina. Não é necessário instalar banco de dados externo.

### 1. Pré-requisitos
Tenha o [Node.js](https://nodejs.org/) instalado (versão 16 ou superior).

### 2. Instalar Dependências
Abra o terminal na pasta do projeto e execute:
```bash
npm install
```
3. Iniciar o SistemaPara rodar o servidor em modo de desenvolvimento:
```Bash npm run dev
```
O terminal deverá exibir:Conectado ao banco de dados SQLite.
Servidor rodando em http://localhost:3000
4. Acessar
Abra seu navegador favorito e acesse:👉 http://localhost:3000
🧪 Como Rodar os Testes
Para verificar a integridade do código e a segurança das rotas, execute a suíte de testes automatizados em um novo terminal:
```Bash
npm test
```
O que será testado:✅ Se a API responde corretamente (Health Check).
✅ Se as rotas protegidas bloqueiam acesso sem token.
✅ Se a lógica de criação de eventos funciona (simulado via Mocks).
📖 Guia de Demonstração (Passo a Passo)Para testar todas as funcionalidades e permissões do sistema:
1️⃣ Criar um AdministradorNa tela de login, clique em "Não possui conta? Cadastre-se aqui".Preencha os dados e selecione Perfil de Acesso: Administrador.Faça login.Crie um evento chamado "Reunião da Diretoria".Faça Logout.
2️⃣ Criar um Usuário ComumCadastre um novo usuário, selecionando Perfil de Acesso: Usuário Comum.Faça login.Crie um evento chamado "Festa do Setor".
3️⃣ Testar as Permissões (O Grande Teste)Estando logado como Usuário Comum, observe a lista de eventos.Você verá o botão DELETAR apenas no seu evento ("Festa do Setor").
O evento do Admin ("Reunião da Diretoria") aparecerá apenas para leitura.Saia e entre como Administrador.Você verá os botões de edição e exclusão em todos os eventos, comprovando o poder de gerenciamento total.
🔌 Documentação da API (Endpoints)O sistema também pode ser consumido por clientes externos (ex: Postman).
Base URL: http://localhost:3000/apiMétodoRotaDescriçãoAutenticaçãoPOST/usuariosCadastra novo usuárioPúblicaPOST/usuarios/loginRealiza login e retorna TokenPúblicaGET/eventos
Lista todos os eventos
Bearer TokenPOST/eventosCria um novo eventoBearer TokenPUT/eventos/:idAtualiza dados do eventoBearer TokenDELETE/eventos/:idRemove um evento permanentementeBearer Token
👨‍💻 Equipe de Desenvolvimento
Bernardo Canestraro
Dereck Maciel
Gabriel Santos
Gabriel França
