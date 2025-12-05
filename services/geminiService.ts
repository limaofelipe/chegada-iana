import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the client
const ai = new GoogleGenAI({ apiKey });

export const generateWelcomeMessage = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Escreva uma mensagem curta, emocionante e poética de boas-vindas para a Iana que está chegando em Fortaleza hoje. 
      Mencione o calor da cidade, as praias e a alegria do reencontro. 
      A mensagem deve ser em português, ter no máximo 2 parágrafos e ser bem calorosa. 
      Não use formatação markdown complexa, apenas texto corrido.`,
      config: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 200,
      }
    });

    return response.text || "Bem-vinda a Fortaleza, Iana! O sol brilha mais forte com a sua chegada.";
  } catch (error) {
    console.error("Erro ao gerar mensagem:", error);
    return "Bem-vinda a Fortaleza! Que sua estadia seja maravilhosa.";
  }
};

export const generateFunFact = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Conte uma curiosidade rápida e interessante sobre Fortaleza ou o Ceará para alguém que está visitando. Máximo de 2 frases.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "Sabia que o Ceará é conhecido como a Terra da Luz?";
  } catch (error) {
    return "Fortaleza tem algumas das praias mais bonitas do Brasil.";
  }
};