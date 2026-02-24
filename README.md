# Portfólio Profissional – Corretor de Imóveis

Aplicação em **Next.js 14 (App Router)** para apresentar o portfólio de um corretor de imóveis, com:

- Site institucional focado em captação de leads
- Listagem de empreendimentos/imóveis
- Páginas de detalhes com galeria, mapa e informações completas
- Área administrativa para gestão de projetos, construtoras e regiões

---

## Tecnologias principais

- [Next.js](https://nextjs.org) (App Router)
- React
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL (ou banco compatível com Prisma)

---

## Como rodar o projeto localmente

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Use o arquivo `.env.example` como base e crie um `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Preencha os valores necessários (ex.: URL do banco de dados).

### 3. Executar migrações do Prisma

```bash
npx prisma migrate dev
```

### 4. Rodar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse em: [http://localhost:3000](http://localhost:3000)

---

## Scripts disponíveis

No `package.json` você encontra, entre outros:

- `npm run dev` – inicia o servidor de desenvolvimento
- `npm run build` – gera o build de produção
- `npm start` – sobe o servidor em modo produção
- `npm run lint` – executa a análise estática (ESLint)

---

## Estrutura geral (alta visão)

Algumas pastas importantes:

- `app/` – rotas e páginas (públicas e administrativas)
- `components/` – componentes reutilizáveis (layout, UI, cards, etc.)
- `lib/` – utilitários, auth e configuração do Prisma
- `prisma/` – esquema do banco (`schema.prisma`)
- `public/` – imagens e assets estáticos

---

## Deploy

O projeto pode ser deployado em qualquer plataforma compatível com Next.js (ex.: Vercel, Railway, etc.).

Passos gerais:

1. Configurar variáveis de ambiente na plataforma de deploy
2. Garantir acesso ao banco de dados
3. Rodar as migrações do Prisma no ambiente remoto
4. Executar `npm run build` e iniciar a aplicação

---

## Próximos passos

- Detalhar credenciais e fluxo de acesso da área administrativa
- Documentar endpoints principais das APIs (`/app/api/*`)
- Adicionar exemplos de payloads para criação/edição de projetos
