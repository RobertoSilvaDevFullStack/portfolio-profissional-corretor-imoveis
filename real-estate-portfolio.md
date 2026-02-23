# Plano de Implementação - Portfólio de Corretor de Imóveis

## Objetivo

Criar um site de portfólio profissional para corretor de imóveis de alto desempenho e otimizado para SEO, baseado nos designs do app "Stitch". O site deve ser moderno, fácil de atualizar e integrado com ferramentas de marketing (GTM, Meta Pixel).

## Revisão do Usuário Necessária

> [!IMPORTANT]
> **Seleção da Stack Tecnológica**: Estamos usando **Next.js 14+ (App Router)** com **Tailwind CSS** e **TypeScript**. Isso oferece o melhor desempenho, capacidades de SEO e experiência de desenvolvimento para este tipo de projeto.
>
> **Ativos de Design**: Estamos assumindo que as imagens fornecidas são a referência para o design visual. Vamos aproximar as fontes e cores caso os ativos exatos não sejam fornecidos, visando um visual "Premium".

## Stack Tecnológica Proposta

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + `clsx`/`tailwind-merge`
- **Ícones**: Lucide React
- **SEO**: `next-sitemap`, API de Metadados Integrada
- **Analytics**: `@next/third-parties` (GTM), Componente de Pixel Personalizado

## Estrutura de Arquivos e Componentes Chave

### [Raiz do Projeto]

#### [NOVO] `tsconfig.json`, `next.config.js`, `tailwind.config.ts`

### `app/`

- `layout.tsx`: Layout raiz com Fontes (Inter/Playfair Display), scripts GTM e Pixel.
- `page.tsx`: Composição das seções da landing page.
- `globals.css`: Diretivas do Tailwind e estilos base.

### `components/layout/`

- `Header.tsx`: Barra de navegação.
- `Footer.tsx`: Informações de contato e links.
- `Section.tsx`: Wrapper reutilizável para seções distintas com padding/gerenciamento consistente.

### `components/sections/`

- `Hero.tsx`: "Mais do que um corretor..." + Imagem + CTA.
- `About.tsx`: "Por que faço o que faço".
- `Journey.tsx`: "Minha Jornada em Imagens" (Carrossel ou Grid).
- `Pillars.tsx`: "Pilares do Meu Trabalho".
- `Regions.tsx`: "Regiões Atendidas" mapa/visuais.
- `Contact.tsx`: Formulário de captura de leads / CTA para WhatsApp.

### `components/ui/`

- `Button.tsx`: Variantes Primária/Secundária.
- `Card.tsx`: Para exibir serviços/imóveis.

## Estratégia de SEO e Analytics

### Google Tag Manager (GTM)

Integração via `@next/third-parties/google`.

- Configurado em `layout.tsx` com ID fornecido pelo usuário (ou placeholder).

### Meta Pixel

Componente `MetaPixel` personalizado em `components/analytics/MetaPixel.tsx`.

- Gerencia visualizações de página (page views) e eventos padrão.

### Sitemap

Usando o pacote `next-sitemap`.

- Configurado em `next-sitemap.config.js` para gerar automaticamente `sitemap.xml` e `robots.txt` no build.

## Plano de Verificação

### Verificação Automatizada

- **Linting**: `npm run lint` para garantir a qualidade do código.
- **Verificação de Tipos**: `npx tsc --noEmit` para verificar a segurança de tipos.
- **Teste de Build**: `npm run build` para garantir prontidão para produção.
- **Lighthouse**: Executar auditoria padronizada do Lighthouse para Desempenho, Acessibilidade, Boas Práticas e SEO.

### Verificação Manual

1.  **Consistência Visual**: Comparar páginas construídas com as imagens de design fornecidas.
2.  **Responsividade**: Verificar layout em Mobile (375px), Tablet (768px) e Desktop (1440px).
3.  **Elementos Interativos**: Testar todos os Botões, Formulários e links de Navegação.
4.  **Analytics**: Verificar se os scripts GTM e Pixel estão presentes no DOM (ver código-fonte).
