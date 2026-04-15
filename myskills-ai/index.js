import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const knowledge = JSON.parse(
  fs.readFileSync("knowledge.json", "utf-8")
);

// 🔥 CONFIGURAÇÃO OPENROUTER
const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "MySkills.dev"
    }
  },
  modelName: "openai/gpt-3.5-turbo",
  temperature: 0.7,
});

app.post("/recommend", async (req, res) => {
  const { technologies } = req.body;

  const techList = technologies
    .map(t => `${t.name} (${t.level})`)
    .join(", ");

  const prompt = `
    Você é um especialista em carreira de desenvolvedores.

    Base de conhecimento:
    Backend:
    ${knowledge.backend.join("\n")}

    Frontend:
    ${knowledge.frontend.join("\n")}

    DevOps:
    ${knowledge.devops.join("\n")}

    Tecnologias do usuário:
    ${techList}

    Com base nisso:

    1. Sugira tecnologias
    2. Crie ordem de aprendizado
    3. Justifique e indique uma carreira

    Responda STRICTAMENTE em JSON:
    {
        "suggestions": [],
        "explanation": ""
    }
  `;

  try {
    const response = await model.invoke([
        new HumanMessage(prompt),
    ]);

    const parsed = JSON.parse(response.content);

    res.json(parsed);

  } catch (error) {
    console.error("Erro IA:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro na IA" });
  }
});

app.listen(3001, () => {
  console.log("🚀 AI Service rodando na porta 3001");
});