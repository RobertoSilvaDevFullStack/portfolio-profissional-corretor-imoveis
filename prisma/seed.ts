import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Limpar banco (opcional, cuidado em produção)
  // await prisma.projectImage.deleteMany();
  // await prisma.project.deleteMany();
  // await prisma.constructor.deleteMany();
  // await prisma.region.deleteMany();

  // 1. Criar Regiões
  const zonaSul = await prisma.region.upsert({
    where: { slug: "zona-sul" },
    update: {},
    create: {
      name: "Zona Sul",
      slug: "zona-sul",
      description: "Região nobre com ótima infraestrutura.",
    },
  });

  const zonaOeste = await prisma.region.upsert({
    where: { slug: "zona-oeste" },
    update: {},
    create: {
      name: "Zona Oeste",
      slug: "zona-oeste",
      description: "Bairros modernos e alta valorização.",
    },
  });

  // 2. Criar Construtoras
  const cyrela = await prisma.constructor.upsert({
    where: { slug: "cyrela" },
    update: {},
    create: {
      name: "Cyrela",
      slug: "cyrela",
      phone: "11 99999-9999",
      email: "contato@cyrela.com.br",
    },
  });

  const gafisa = await prisma.constructor.upsert({
    where: { slug: "gafisa" },
    update: {},
    create: {
      name: "Gafisa",
      slug: "gafisa",
      phone: "11 88888-8888",
    },
  });

  // 3. Criar Projetos
  const projeto1 = await prisma.project.upsert({
    where: { slug: "reserva-parque" },
    update: {},
    create: {
      name: "Reserva do Parque",
      slug: "reserva-parque",
      type: "Residencial",
      status: "Lançamento",
      address: "Av. Ibirapuera, 1000",
      neighborhood: "Moema",
      city: "São Paulo",
      state: "SP",
      description: "Apartamentos de alto padrão com vista para o parque.",
      priceMin: 850000,
      areaMin: 65,
      areaMax: 120,
      bedrooms: 2,
      bedroomsMax: 3,
      bathrooms: 2,
      parkingSpots: 2,
      regionId: zonaSul.id,
      constructorId: cyrela.id,
      featured: true,
      condoFeatures: ["Piscina", "Academia", "Salão de Festas", "Playground"],
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
            alt: "Fachada do prédio",
            isHero: true,
            order: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
            alt: "Interior sala",
            order: 2,
          },
        ],
      },
    },
  });

  const projeto2 = await prisma.project.upsert({
    where: { slug: "horizonte-perdizes" },
    update: {},
    create: {
      name: "Horizonte Perdizes",
      slug: "horizonte-perdizes",
      type: "Residencial",
      status: "Em Construção",
      address: "Rua Cardoso de Almeida, 500",
      neighborhood: "Perdizes",
      city: "São Paulo",
      state: "SP",
      description: "O melhor de Perdizes com lazer completo.",
      priceMin: 600000,
      areaMin: 45,
      areaMax: 80,
      bedrooms: 1,
      bedroomsMax: 2,
      bathrooms: 1,
      parkingSpots: 1,
      regionId: zonaOeste.id,
      constructorId: gafisa.id,
      featured: false,
      condoFeatures: ["Rooftop", "Coworking", "Lavanderia"],
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
            alt: "Vista do prédio",
            isHero: true,
            order: 1,
          },
        ],
      },
    },
  });

  console.log("✅ Seed finalizado com sucesso!");
  console.log({ projeto1, projeto2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
