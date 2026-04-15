"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api";

type Technology = {
  id?: number;
  name: string;
  type: string;
  level: string;
};

type Recommendation = {
  suggestions: string[];
  explanation: string;
};

export default function Home() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("LANGUAGE");
  const [level, setLevel] = useState("BEGINNER");
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Carregar tecnologias ao iniciar
  useEffect(() => {
    const loadTechnologies = async () => {
      try {
        const response = await api.get("/technologies");
        setTechnologies(response.data);
      } catch (error) {
        console.error("Erro ao buscar tecnologias", error);
      }
    };

    loadTechnologies();
  }, []);

  // 🔹 Adicionar tecnologia
  const handleAdd = async () => {
    if (!name) return;

    try {
      await api.post("/technologies", {
        name,
        type,
        level,
      });

      setName("");

      // 🔥 Atualiza lista manualmente
      const response = await api.get("/technologies");
      setTechnologies(response.data);

    } catch (error) {
      console.error("Erro ao adicionar tecnologia", error);
    }
  };

  // 🔹 Deletar tecnologia
  const handleDelete = async (id?: number) => {
    if (!id) return;

    try {
      await api.delete(`/technologies/${id}`);

      // 🔥 Atualiza lista manualmente
      const response = await api.get("/technologies");
      setTechnologies(response.data);

    } catch (error) {
      console.error("Erro ao deletar tecnologia", error);
    }
  };

  const handleRecommend = async () => {
    try {
      setLoading(true);

      const response = await api.get("/technologies/recommend");

      setRecommendation(response.data);

    } catch (error) {
      console.error("Erro ao gerar recomendação", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">MySkills.dev 🚀</h1>

      {/* FORM */}
      <div className="border p-4 rounded mb-4">
        <h2 className="font-semibold mb-2">Adicionar Tecnologia</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Nome (ex: React)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="LANGUAGE">Linguagem</option>
          <option value="FRAMEWORK">Framework</option>
          <option value="DATABASE">Banco de Dados</option>
        </select>

        <select
          className="border p-2 w-full mb-2"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="BEGINNER">Iniciante</option>
          <option value="INTERMEDIATE">Intermediário</option>
          <option value="ADVANCED">Avançado</option>
        </select>

        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>

      {/* LISTA */}
      <div>
        <h2 className="font-semibold mb-2">Minhas Tecnologias</h2>

        {technologies.length === 0 ? (
          <p className="text-gray-500">Nenhuma tecnologia cadastrada</p>
        ) : (
          <ul>
            {technologies.map((tech) => (
              <li
                key={tech.id}
                className="flex justify-between items-center border p-2 mb-2 rounded"
              >
                <span>
                  {tech.name} - {tech.type} ({tech.level})
                </span>

                <button
                  onClick={() => handleDelete(tech.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6">
          <button
            onClick={handleRecommend}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Gerar recomendação com IA 🤖
          </button>
          {loading && <p className="mt-2">Gerando recomendação com IA...</p>}
          {recommendation && (
            <div className="mt-6 border p-4 rounded">
              <h2 className="font-semibold mb-2">💡 Sugestões</h2>

              <ul className="mb-4">
                {recommendation.suggestions?.map((item: string, index: number) => (
                  <li key={index}>- {item}</li>
                ))}
              </ul>

              <h2 className="font-semibold mb-2">🧠 Explicação</h2>
              <p>{recommendation.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}