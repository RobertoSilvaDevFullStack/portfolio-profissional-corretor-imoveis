"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Info,
  MapPin,
  Image as ImageIcon,
  List,
  FileText,
  LayoutTemplate,
  ArrowLeft,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { FileUploader } from "@/components/admin/FileUploader";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "info", label: "Informações", icon: Info },
  { id: "location", label: "Localização", icon: MapPin },
  { id: "media", label: "Mídia e Imagens", icon: ImageIcon },
  { id: "features", label: "Características", icon: List },
  { id: "typologies", label: "Plantas e Unidades", icon: LayoutTemplate },
  { id: "files", label: "Arquivos", icon: FileText },
];

const STATUS_OPTIONS = [
  "Lançamento",
  "Em Construção",
  "Pronto Novo",
  "Breve Lançamento",
];

const CONDO_FEATURES_LIST = [
  "Piscina Adulto",
  "Piscina Infantil",
  "Deck Molhado",
  "Solarium",
  "Academia",
  "Academia Externa",
  "Salão de Festas",
  "Espaço Gourmet",
  "Churrasqueira",
  "Playground",
  "Brinquedoteca",
  "Salão de Jogos",
  "Pet Place",
  "Quadra",
  "Bicicletário",
  "Coworking",
  "Lavanderia",
  "Mini Mercado",
  "Delivery Room",
  "Portaria 24h",
];

const UNIT_FEATURES_LIST = [
  "Varanda",
  "Varanda Gourmet",
  "Quintal/Garden",
  "Fechadura Digital",
  "Infra Ar-Condicionado",
  "Tomada USB",
  "Piso Laminado",
  "Persiana de Enrolar",
];

interface ProjectFormProps {
  initialData?: any;
  regions: any[];
  constructors: any[];
}

export default function ProjectForm({
  initialData,
  regions,
  constructors,
}: ProjectFormProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("info");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      code: "",
      type: "Residencial",
      status: "Em Construção",
      regionId: "",
      constructorId: "",
      description: "",
      websiteUrl: "",

      // Location
      address: "",
      neighborhood: "",
      city: "São Paulo",
      state: "SP",
      zipCode: "",

      // Characteristics
      areaMin: "",
      areaMax: "",
      priceMin: "",
      bedrooms: "",
      bedroomsMax: "",
      suites: "",
      parkingSpots: "",
      bathrooms: "",

      // Features
      condoFeatures: [],
      unitFeatures: [],

      // Media
      images: [],
      floorPlans: [],
      files: [],
      typologies: [], // { name, area, bathrooms, bedrooms, suites, parkingSpots, price }
    },
  );

  const [typologies, setTypologies] = useState<any[]>(
    initialData?.typologies || [],
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        // Convert numbers
        areaMin: Number(formData.areaMin) || null,
        areaMax: Number(formData.areaMax) || null,
        priceMin: Number(formData.priceMin) || null,
        bedrooms: Number(formData.bedrooms) || null,
        bedroomsMax: Number(formData.bedroomsMax) || null,
        suites: Number(formData.suites) || null,
        parkingSpots: Number(formData.parkingSpots) || null,
        bathrooms: Number(formData.bathrooms) || null,
        typologies: typologies.map((t) => ({
          ...t,
          area: Number(t.area) || null,
          bedrooms: Number(t.bedrooms) || null,
          suites: Number(t.suites) || null,
          parkingSpots: Number(t.parkingSpots) || null,
          price: Number(t.price) || null,
        })),
      };

      const url = initialData?.id
        ? `/api/projects/${initialData.id}`
        : "/api/projects";
      const method = initialData?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao salvar projeto");
      }

      router.push("/admin/projetos");
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(field: string, value: any) {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  }

  function toggleFeature(
    field: "condoFeatures" | "unitFeatures",
    feature: string,
  ) {
    setFormData((prev: any) => {
      const current = prev[field] || [];
      if (current.includes(feature)) {
        return {
          ...prev,
          [field]: current.filter((f: string) => f !== feature),
        };
      } else {
        return { ...prev, [field]: [...current, feature] };
      }
    });
  }

  function addTypology() {
    setTypologies([
      ...typologies,
      {
        name: "",
        area: "",
        bedrooms: "",
        suites: "",
        parkingSpots: "",
        price: "",
      },
    ]);
  }

  function updateTypology(index: number, field: string, value: any) {
    const newTypologies = [...typologies];
    newTypologies[index] = { ...newTypologies[index], [field]: value };
    setTypologies(newTypologies);
  }

  function removeTypology(index: number) {
    setTypologies(typologies.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
        <Link href="/admin/projetos">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">
          {initialData ? "Editar Projeto" : "Novo Projeto"}
        </h1>
        <div className="ml-auto">
          <Button onClick={handleSubmit} isLoading={loading}>
            <Save className="mr-2 h-4 w-4" />
            Salvar Projeto
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar/Tabs - 3 cols */}
        <div className="col-span-12 md:col-span-3 space-y-1">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                activeSection === section.id
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <section.icon
                className={cn(
                  "mr-3 h-5 w-5",
                  activeSection === section.id
                    ? "text-blue-700"
                    : "text-slate-400",
                )}
              />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content Area - 9 cols */}
        <div className="col-span-12 md:col-span-9 rounded-xl bg-white p-6 shadow-sm border border-slate-200">
          {/* Section: Info */}
          {activeSection === "info" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Informações Básicas
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  label="Nome do Empreendimento"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Construtora
                  </label>
                  <select
                    className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                    value={formData.constructorId}
                    onChange={(e) =>
                      handleInputChange("constructorId", e.target.value)
                    }
                  >
                    <option value="">Selecione...</option>
                    {constructors.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status da Obra
                  </label>
                  <select
                    className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Código Interno"
                  value={formData.code || ""}
                  onChange={(e) => handleInputChange("code", e.target.value)}
                />
                <div className="col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Descrição
                  </label>
                  <textarea
                    className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                    rows={4}
                    value={formData.description || ""}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                  />
                </div>
              </div>

              <h3 className="text-md font-medium text-slate-700 mt-6 pt-4 border-t border-slate-100">
                Valores e Áreas
              </h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Input
                  label="Preço Mínimo (R$)"
                  type="number"
                  value={formData.priceMin || ""}
                  onChange={(e) =>
                    handleInputChange("priceMin", e.target.value)
                  }
                />
                <Input
                  label="Área Mín (m²)"
                  type="number"
                  value={formData.areaMin || ""}
                  onChange={(e) => handleInputChange("areaMin", e.target.value)}
                />
                <Input
                  label="Área Máx (m²)"
                  type="number"
                  value={formData.areaMax || ""}
                  onChange={(e) => handleInputChange("areaMax", e.target.value)}
                />
                <Input
                  label="Quartos"
                  type="number"
                  value={formData.bedrooms || ""}
                  onChange={(e) =>
                    handleInputChange("bedrooms", e.target.value)
                  }
                />
                <Input
                  label="Banheiros"
                  type="number"
                  value={formData.bathrooms || ""}
                  onChange={(e) =>
                    handleInputChange("bathrooms", e.target.value)
                  }
                />
                <Input
                  label="Suítes"
                  type="number"
                  value={formData.suites || ""}
                  onChange={(e) => handleInputChange("suites", e.target.value)}
                />
                <Input
                  label="Vagas"
                  type="number"
                  value={formData.parkingSpots || ""}
                  onChange={(e) =>
                    handleInputChange("parkingSpots", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {/* Section: Location */}
          {activeSection === "location" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Localização
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Região
                  </label>
                  <select
                    className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                    value={formData.regionId}
                    onChange={(e) =>
                      handleInputChange("regionId", e.target.value)
                    }
                  >
                    <option value="">Selecione...</option>
                    {regions.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="CEP"
                  value={formData.zipCode || ""}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                />
                <div className="col-span-2">
                  <Input
                    label="Endereço"
                    value={formData.address || ""}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                </div>
                <Input
                  label="Bairro"
                  value={formData.neighborhood || ""}
                  onChange={(e) =>
                    handleInputChange("neighborhood", e.target.value)
                  }
                />
                <Input
                  label="Cidade"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Section: Media */}
          {activeSection === "media" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Galeria de Imagens
                </h2>
                <ImageUploader
                  initialImages={formData.images}
                  onImagesChange={(imgs) => handleInputChange("images", imgs)}
                />
              </div>
              <div className="pt-6 border-t border-slate-100">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Plantas
                </h2>
                <p className="text-sm text-slate-500 mb-4">
                  Upload de imagens das plantas humanizadas.
                </p>
                <ImageUploader
                  initialImages={formData.floorPlans.map((fp: any) => ({
                    url: fp.imageUrl || fp.url,
                    alt: fp.name,
                    isHero: false,
                  }))}
                  onImagesChange={(imgs) =>
                    handleInputChange(
                      "floorPlans",
                      imgs.map((img) => ({
                        name: img.alt || "Planta",
                        imageUrl: img.url,
                      })),
                    )
                  }
                  maxFiles={10}
                />
              </div>
            </div>
          )}

          {/* Section: Features */}
          {activeSection === "features" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Lazer e Condomínio
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {CONDO_FEATURES_LIST.map((feature) => (
                    <label
                      key={feature}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.condoFeatures?.includes(feature)}
                        onChange={() => toggleFeature("condoFeatures", feature)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Diferenciais da Unidade
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {UNIT_FEATURES_LIST.map((feature) => (
                    <label
                      key={feature}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.unitFeatures?.includes(feature)}
                        onChange={() => toggleFeature("unitFeatures", feature)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section: Typologies */}
          {activeSection === "typologies" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Configuração de Tipologias
                </h2>
                <Button size="sm" onClick={addTypology}>
                  <Plus className="h-4 w-4 mr-1" /> Adicionar
                </Button>
              </div>

              {typologies.length === 0 ? (
                <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg">
                  Nenhuma tipologia adicionada.
                </div>
              ) : (
                <div className="space-y-4">
                  {typologies.map((t, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-end p-4 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <div className="flex-1">
                        <label className="text-xs font-medium text-slate-500">
                          Nome
                        </label>
                        <input
                          className="block w-full rounded border-slate-300 text-sm"
                          placeholder="Ex: 2 Dorms"
                          value={t.name}
                          onChange={(e) =>
                            updateTypology(index, "name", e.target.value)
                          }
                        />
                      </div>
                      <div className="w-20">
                        <label className="text-xs font-medium text-slate-500">
                          Área
                        </label>
                        <input
                          className="block w-full rounded border-slate-300 text-sm"
                          type="number"
                          value={t.area}
                          onChange={(e) =>
                            updateTypology(index, "area", e.target.value)
                          }
                        />
                      </div>
                      <div className="w-16">
                        <label className="text-xs font-medium text-slate-500">
                          Dorms
                        </label>
                        <input
                          className="block w-full rounded border-slate-300 text-sm"
                          type="number"
                          value={t.bedrooms}
                          onChange={(e) =>
                            updateTypology(index, "bedrooms", e.target.value)
                          }
                        />
                      </div>
                      <div className="w-16">
                        <label className="text-xs font-medium text-slate-500">
                          Suítes
                        </label>
                        <input
                          className="block w-full rounded border-slate-300 text-sm"
                          type="number"
                          value={t.suites}
                          onChange={(e) =>
                            updateTypology(index, "suites", e.target.value)
                          }
                        />
                      </div>
                      <div className="w-16">
                        <label className="text-xs font-medium text-slate-500">
                          Vagas
                        </label>
                        <input
                          className="block w-full rounded border-slate-300 text-sm"
                          type="number"
                          value={t.parkingSpots}
                          onChange={(e) =>
                            updateTypology(
                              index,
                              "parkingSpots",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="w-28">
                        <label className="text-xs font-medium text-slate-500">
                          Preço
                        </label>
                        <input
                          className="block w-full rounded border-slate-300 text-sm"
                          type="number"
                          value={t.price}
                          onChange={(e) =>
                            updateTypology(index, "price", e.target.value)
                          }
                        />
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeTypology(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Section: Files */}
          {activeSection === "files" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Arquivos e Documentos
              </h2>
              <FileUploader
                initialFiles={formData.files}
                onFilesChange={(files) => handleInputChange("files", files)}
                category="docs"
                label="Adicionar PDF"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
