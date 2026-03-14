# LogFit-2.0
O LogFit é uma aplicação fullstack projetada para ajudar usuários a monitorar sua ingestão diária de água e calorias. Esta versão 2.0 evolui de um sistema baseado em armazenamento local para uma plataforma robusta com autenticação, persistência em nuvem e consumo de APIs nutricionais.

---

Tecnologias:

Frontend
- React (Vite): Biblioteca principal para a interface.
- TypeScript: Tipagem estática para maior segurança e produtividade.
- Tailwind CSS: Estilização baseada em classes utilitárias.
- React Router: Gerenciamento de rotas (Login, Cadastro, Dashboard).
- Zustand: Gerenciamento de estado global simplificado.
- Axios: Cliente HTTP para comunicação com o Backend.

Backend
- Node.js & Express: Servidor e gerenciamento de rotas.
- MongoDB & Mongoose: Banco de dados NoSQL e modelagem de dados.
- JWT (JSON Web Token): Autenticação e segurança de rotas.
- Winston & Morgan: Sistema de logs e monitoramento de requisições.
- Bcrypt: Criptografia de senhas para segurança do usuário.

---

Arquitetura do Sistema

A aplicação segue o modelo de arquitetura cliente-servidor, garantindo que os dados do usuário sejam persistidos de forma segura e acessíveis de qualquer lugar.

---

Funcionalidades Planejadas (MVP)

1. Gestão de Usuários
- Cadastro de novos usuários com senha criptografada.
- Login com geração de token JWT.
- Proteção de rotas (apenas usuários logados acessam o Dashboard).

2. Módulo de Hidratação
- Registro de ingestão de água (ml/litros).
- Visualização da soma total consumida nas últimas 24 horas.
- Histórico de registros com timestamp.

3. Módulo de Calorias
- Busca de alimentos via API externa (FatSecret).
- Cálculo automático de calorias com base na porção informada.
- Soma diária de calorias consumidas com reset automático de visualização após 24h.
