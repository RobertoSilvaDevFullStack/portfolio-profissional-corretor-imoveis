/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.seusite.com.br",
  generateRobotsTxt: true,
  // Opcional: Personalizar a frequência e prioridade
  // changefreq: 'daily',
  // priority: 0.7,
  // sitemapSize: 5000,
  exclude: ["/admin/*"], // Excluir rotas administrativas
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/*"],
      },
    ],
  },
};
