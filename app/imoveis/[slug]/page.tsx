import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  MapPin,
  Ruler,
  BedDouble,
  Bath,
  Car,
  Check,
  FileText,
  MessageCircle,
  Share2,
  Download,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProjectGallery } from "../../../components/projects/ProjectGallery";
import { ProjectMap } from "../../../components/projects/ProjectMap";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      region: true,
      constructor: true,
      images: { orderBy: { order: "asc" } },
      floorPlans: { orderBy: { order: "asc" } },
      files: true,
      typologies: true,
    },
  });

  if (!project) {
    notFound();
  }

  // Format currency helper
  const formatPrice = (value: number | null) => {
    if (!value) return "Sob Consulta";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/imoveis" className="hover:text-blue-600">
            Imóveis
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/imoveis?region=${project.region.slug}`}
            className="hover:text-blue-600"
          >
            {project.region.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-medium truncate">
            {project.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN (Main Content) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Mobile (visible only on small screens) */}
            <div className="lg:hidden">
              <h1 className="text-2xl font-bold text-slate-900">
                {project.name}
              </h1>
              <p className="text-slate-500 mt-1 flex items-center">
                <MapPin className="mr-1 h-4 w-4" /> {project.neighborhood},{" "}
                {project.city}
              </p>
            </div>

            {/* Gallery */}
            <ProjectGallery
              images={project.images.map((img: any) => ({ url: img.url }))}
              projectName={project.name}
            />

            {/* Header Desktop & Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="hidden lg:block mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                      {project.name}
                    </h1>
                    <div className="flex items-center mt-2 text-slate-500">
                      <MapPin className="mr-1.5 h-4 w-4" />
                      {project.address} - {project.neighborhood}, {project.city}
                      /{project.state}
                    </div>
                  </div>
                  {project.constructor.logoUrl && (
                    <div className="h-12 w-24 relative">
                      <Image
                        src={project.constructor.logoUrl}
                        alt={project.constructor.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Key Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-slate-100">
                <div className="text-center md:text-left">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    Área
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                    <Ruler className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-slate-900">
                      {project.areaMin}{" "}
                      {project.areaMax ? `a ${project.areaMax}` : ""} m²
                    </span>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    Quartos
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                    <BedDouble className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-slate-900">
                      {project.bedrooms}{" "}
                      {project.bedroomsMax ? `a ${project.bedroomsMax}` : ""}
                    </span>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    Suítes
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                    <Bath className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-slate-900">
                      {project.suites || "-"}
                    </span>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    Vagas
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                    <Car className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-slate-900">
                      {project.parkingSpots || "-"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Sobre o Imóvel
                </h3>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {project.description}
                </div>
              </div>
            </div>

            {/* Condo Features */}
            {project.condoFeatures.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Lazer e Condomínio
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.condoFeatures.map((feature: string, idx: number) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                    >
                      <Check className="mr-1.5 h-3 w-3 text-green-600" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Unit Features */}
            {project.unitFeatures.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Diferenciais da Unidade
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.unitFeatures.map((feature: string, idx: number) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700"
                    >
                      <Check className="mr-1.5 h-3 w-3 text-blue-600" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Typologies Table */}
            {project.typologies.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 overflow-hidden">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Tipologias Disponíveis
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                          Tipo
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase">
                          Área
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase">
                          Dorms
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase">
                          Suítes
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase">
                          Vagas
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase">
                          Preço
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {project.typologies.map((t: any) => (
                        <tr key={t.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 text-sm font-medium text-slate-900">
                            {t.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-center text-slate-500">
                            {t.area}m²
                          </td>
                          <td className="px-4 py-3 text-sm text-center text-slate-500">
                            {t.bedrooms}
                          </td>
                          <td className="px-4 py-3 text-sm text-center text-slate-500">
                            {t.suites}
                          </td>
                          <td className="px-4 py-3 text-sm text-center text-slate-500">
                            {t.parkingSpots}
                          </td>
                          <td className="px-4 py-3 text-sm text-right font-medium text-blue-700">
                            {formatPrice(t.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Floor Plans */}
            {project.floorPlans.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Plantas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.floorPlans.map((plan: any) => (
                    <div
                      key={plan.id}
                      className="group relative rounded-lg border border-slate-200 overflow-hidden bg-slate-50 p-2"
                    >
                      <div className="aspect-square relative flex items-center justify-center">
                        <Image
                          src={plan.imageUrl}
                          alt={plan.name}
                          width={500}
                          height={500}
                          className="object-contain max-h-full max-w-full transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-2 text-center text-sm font-medium text-slate-700">
                        {plan.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN (Sidebar with Sticky Price & CTA) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Key Info Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
                <div className="mb-4">
                  <p className="text-sm text-slate-500">A partir de</p>
                  <p className="text-3xl font-bold text-blue-700">
                    {formatPrice(project.priceMin)}
                  </p>
                  {project.condoFee && (
                    <p className="text-xs text-slate-400 mt-1">
                      Condomínio: {formatPrice(project.condoFee)}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <a
                    href={`https://wa.me/55${
                      project.constructor.phone?.replace(/\D/g, "") ||
                      "11999999999" // Fallback to provided phone or default
                    }?text=Olá, gostaria de mais informações sobre o ${project.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-lg bg-green-600 px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-green-700"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Solicitar Proposta
                  </a>

                  <button className="flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Construtora</p>
                      <p className="font-bold text-slate-900">
                        {project.constructor.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Files / Downloads */}
              {project.files.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                    Arquivos e Documentos
                  </h3>
                  <div className="space-y-3">
                    {project.files.map((file: any) => (
                      <a
                        key={file.id}
                        href={file.fileUrl}
                        target="_blank"
                        download
                        className="flex items-center p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200"
                      >
                        <FileText className="h-5 w-5 text-red-500 mr-3" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-700 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-slate-400 uppercase">
                            {file.fileType}
                          </p>
                        </div>
                        <Download className="h-4 w-4 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Map Placeholder */}
              {project.address && (
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
                  <div className="bg-slate-200 h-48 w-full flex items-center justify-center">
                    {/* Future: Dynamic Map */}
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-500 font-medium">
                        Mapa do Imóvel
                      </p>
                      <p className="text-xs text-slate-400 px-4 mt-1">
                        {project.address}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 text-center">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.address + " " + project.city)}`}
                      target="_blank"
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Ver no Google Maps
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
