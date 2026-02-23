"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";

interface Constructor {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  logoUrl: string | null;
  _count?: { projects: number };
}

export default function ConstructorsPage() {
  const [constructors, setConstructors] = useState<Constructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConstructor, setEditingConstructor] =
    useState<Constructor | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    logoUrl: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchConstructors();
  }, []);

  async function fetchConstructors() {
    try {
      const res = await fetch("/api/constructors");
      const data = await res.json();
      setConstructors(data);
    } catch (error) {
      console.error("Failed to fetch constructors", error);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenModal(constructor?: Constructor) {
    if (constructor) {
      setEditingConstructor(constructor);
      setFormData({
        name: constructor.name,
        phone: constructor.phone || "",
        email: constructor.email || "",
        logoUrl: constructor.logoUrl || "",
      });
    } else {
      setEditingConstructor(null);
      setFormData({ name: "", phone: "", email: "", logoUrl: "" });
    }
    setIsModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/constructors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingConstructor?.id,
          ...formData,
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchConstructors();
      } else {
        alert("Erro ao salvar construtora");
      }
    } catch (error) {
      alert("Erro ao salvar construtora");
    } finally {
      setSubmitting(false);
    }
  }

  const filteredConstructors = constructors.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">
          Gerenciar Construtoras
        </h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="mr-2 h-4 w-4" /> Nova Construtora
        </Button>
      </div>

      <div className="flex items-center rounded-lg bg-white p-4 shadow-sm">
        <Search className="mr-2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar construtoras..."
          className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-10 text-slate-500">Carregando...</div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Contato
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                  Projetos
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredConstructors.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    Nenhuma construtora encontrada.
                  </td>
                </tr>
              ) : (
                filteredConstructors.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-slate-900">
                        {c.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-500">
                        {c.email && <div>{c.email}</div>}
                        {c.phone && <div>{c.phone}</div>}
                        {!c.email && !c.phone && "-"}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                        {c._count?.projects || 0}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleOpenModal(c)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingConstructor ? "Editar Construtora" : "Nova Construtora"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome da Construtora"
            placeholder="Ex: Cyrela, MRV"
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
          <Input
            label="Email de Contato"
            type="email"
            placeholder="contato@construtora.com"
            value={formData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            label="Telefone"
            placeholder="(11) 99999-9999"
            value={formData.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          {/* Future: Add Logo Upload Here */}
          <div className="flex justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="mr-2"
            >
              Cancelar
            </Button>
            <Button type="submit" isLoading={submitting}>
              Salvar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
