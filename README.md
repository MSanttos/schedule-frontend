# 🚀 React + Vite + TypeScript + Tailwind CSS + Redux Toolkit Starter

Este projeto é um template inicial configurado com as seguintes tecnologias:

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- Suporte a variáveis de ambiente com `.env`

---
## 📦 Instalação e Configuração Inicial
```bash
npm create vite@latest my-app -- --template react-ts
cd my-app

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

npm install @reduxjs/toolkit react-redux

npm install react-router-dom
npm install -D @types/react-router-dom

npm install axios

npm run dev
```

### 📦 Criação do Projeto React com Vite (opcional)
```bash
yarn create vite my-app --template react-ts
cd my-app
yarn install
```

### Configuração do `tailwind.config.js`
```ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```
### Configuração do `postcss.config.cjs`
```ts
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};

```

### Importação dos estilos Tailwind no `index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🛠️ Organização das pastas
```bash
/src
├── /assets                  # Imagens, fontes, ícones, etc.
├── /components              # Componentes reutilizáveis (UI)
│   ├── /Button
│   ├── /Input
│   └── /Modal
├── /features                # Funcionalidades principais da aplicação
│   ├── /auth                # Login, registro, autenticação, etc.
│   ├── /dashboard           # Dashboard, gráficos, etc.
│   └── /user                # Funcionalidades relacionadas a usuários
├── /hooks                   # Custom hooks
│   ├── useAuth.ts
│   └── useFetch.ts
├── /pages                   # Páginas da aplicação (por exemplo, rotas)
│   ├── /HomePage.tsx
│   ├── /LoginPage.tsx
│   └── /ProfilePage.tsx
├── /services                # Requisições à API, integração com backend
│   ├── apiClient.ts         # Cliente HTTP (axios, fetch, etc.)
│   └── userService.ts       # Serviço relacionado aos usuários
├── /store                   # Redux store e slices
│   ├── /authSlice.ts        # Slice para autenticação
│   └── /userSlice.ts        # Slice para dados do usuário
├── /styles                  # Arquivos de estilo (geralmente para temas globais, Tailwind)
│   └── tailwind.config.ts   # Configuração do Tailwind
├── /utils                   # Funções utilitárias genéricas
│   ├── formatDate.ts        # Exemplo de utilitário
│   └── validateEmail.ts     # Exemplo de utilitário
├── /helpers                 # Funções auxiliares para negócios específicos
│   └── validatePassword.ts  # Exemplo de helper para validação de senha
├── App.tsx                  # Componente principal da aplicação
├── index.tsx                # Ponto de entrada
└── /types                   # Tipagens globais (ex: User, ResponseData, etc.)
    └── index.d.ts
```

### 1. Indice
# Estrutura de Projeto

Abaixo está uma estrutura recomendada para um projeto React com Vite, TypeScript, Tailwind CSS e Redux Toolkit. Essa organização segue boas práticas, facilitando a escalabilidade e a manutenção da aplicação.


### **/assets**
Arquivos estáticos da aplicação, como imagens, ícones, fontes, etc.

### **/components**
Componentes reutilizáveis, como botões, inputs, modais e outros elementos da UI.

### **/features**
Funcionalidades principais da aplicação, organizadas por domínios (autenticação, dashboard, usuários, etc.). Cada funcionalidade pode conter componentes, hooks e lógica de negócios relacionadas.

### **/hooks**
Hooks personalizados para abstrair a lógica reutilizável, como autenticação, requisições à API, entre outros.

### **/pages**
Componentes que representam páginas completas da aplicação, como a Home, Login, Perfil, etc.

### **/services**
Serviços responsáveis por interagir com o backend, como chamadas à API, autenticação de usuários, etc.

### **/store**
Armazenamento centralizado usando Redux Toolkit, com slices para gerenciar o estado global da aplicação.

### **/styles**
Arquivos relacionados à configuração de temas e personalizações do Tailwind CSS.

### **/utils**
Funções utilitárias genéricas que podem ser usadas em qualquer parte da aplicação.

### **/helpers**
Funções auxiliares específicas da lógica de negócios da aplicação, como validação de formulários, cálculos, etc.

### **/types**
Tipagens globais que garantem a segurança dos tipos em toda a aplicação.

---

## 2. Outras Considerações

- **React Router**: Para gerenciar navegação entre as páginas da aplicação.
- **Redux Toolkit**: Para gerenciar o estado da aplicação, como autenticação e dados do usuário.
- **Tailwind CSS**: Para estilização rápida e responsiva. Os arquivos de estilo adicionais ajudam a personalizar o comportamento visual.

---

Essa estrutura de projeto permite que você escale sua aplicação conforme ela cresce, mantendo o código organizado e de fácil manutenção.


✅ Descrição do Projeto

🚀 Como Rodar Localmente

🧱 Tecnologias Utilizadas

📁 Estrutura de Pastas (já temos!)

🧪 Testes

📦 Build e Deploy

🙋 Contribuição