### npm init -y

### npm install --save-dev typescript @types/node

### npm install express tsx

### npm install --save-dev @types/express

### npx tsc --init

### npm i cors dotenv

### npm install zod

### npm install prisma @types/node @types/pg --save-dev

### npm install @prisma/client @prisma/adapter-pg pg dotenv

### criar a hash de senha https://www.md5hashgenerator.com/ e instalar npm install jsonwebtoken

### npx prisma init

---

1. Autenticação
   ├── POST /users
   ├── POST /session
   └── GET /me

2. Projetos
   ├── POST /projects
   ├── GET /projects
   ├── GET /projects/:id
   ├── PUT /projects/:id
   └── DELETE /projects/:id

3. Kanban
   ├── Status/Colunas
   └── Tasks/Cards

4. Recursos dos Cards
   ├── Checklist
   ├── Comentários
   └── Responsáveis

5. Colaboração
   └── Membros do projeto

---

## 🔒 Rotas Públicas

- ☐ `POST /users` — Criar usuário
- ☐ `POST /session` — Login (autenticação)

## 🔐 Rotas Autenticadas

### 👤 Usuários

- ☐ `GET /me` — Obter dados do usuário logado

### 📁 Projetos

- ☑️ `POST /projects` — Criar projeto
- ☑️ `GET /projects` — Listar meus projetos
- ☑️ `GET /projects/:id` — Obter projeto
- ☐ `PUT /projects/:id` — Atualizar projeto
- ☐ `DELETE /projects/:id` — Deletar projeto

### 👥 Membros do Projeto

- ☐ `POST /projects/:id/members` — Adicionar membro ao projeto
- ☐ `GET /projects/:id/members` — Listar membros do projeto
- ☐ `DELETE /projects/:id/members/:userId` — Remover membro do projeto

### 📋 Status / Colunas do Kanban

- ☐ `POST /projects/:projectId/statuses` — Criar status/coluna
- ☐ `GET /projects/:projectId/statuses` — Listar status/colunas
- ☐ `PUT /projects/:projectId/statuses/:id` — Atualizar status/coluna
- ☐ `DELETE /projects/:projectId/statuses/:id` — Deletar status/coluna
- ☐ `PATCH /projects/:projectId/statuses/reorder` — Reordenar colunas

### 📝 Tasks / Cards

- ☐ `POST /projects/:projectId/tasks` — Criar card
- ☐ `GET /projects/:projectId/tasks` — Listar cards do projeto
- ☐ `GET /projects/:projectId/tasks/:id` — Obter card
- ☐ `PUT /projects/:projectId/tasks/:id` — Atualizar card
- ☐ `DELETE /projects/:projectId/tasks/:id` — Deletar card
- ☐ `PATCH /projects/:projectId/tasks/:id/status` — Alterar status do card
- ☐ `PATCH /projects/:projectId/tasks/reorder` — Reordenar cards

### ☑️ Checklist

- ☐ `POST /tasks/:taskId/checklist` — Criar item da checklist
- ☐ `PUT /tasks/:taskId/checklist/:id` — Atualizar item da checklist
- ☐ `DELETE /tasks/:taskId/checklist/:id` — Remover item da checklist
- ☐ `PATCH /tasks/:taskId/checklist/:id/complete` — Concluir/desmarcar item

### 💬 Comentários

- ☐ `POST /tasks/:taskId/comments` — Adicionar comentário
- ☐ `GET /tasks/:taskId/comments` — Listar comentários
- ☐ `DELETE /tasks/:taskId/comments/:id` — Deletar comentário

### 👤 Responsáveis

- ☐ `POST /tasks/:taskId/assignees` — Adicionar responsável
- ☐ `GET /tasks/:taskId/assignees` — Listar responsáveis
- ☐ `DELETE /tasks/:taskId/assignees/:userId` — Remover responsável
