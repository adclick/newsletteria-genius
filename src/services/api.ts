
import { toast } from "sonner";

// Define types
export interface Newsletter {
  title: string;
  introduction: string;
  sections: NewsletterSection[];
  callToAction: string;
}

export interface NewsletterSection {
  title: string;
  content: string;
  imageDescription: string;
}

// API key state - will be entered by the user
let apiKey = "";

export const setApiKey = (key: string) => {
  apiKey = key;
  localStorage.setItem("geminiApiKey", key);
};

export const getApiKey = () => {
  if (!apiKey) {
    apiKey = localStorage.getItem("geminiApiKey") || "";
  }
  return apiKey;
};

export const generateNewsletter = async (topics: string): Promise<Newsletter | null> => {
  try {
    const key = getApiKey();
    if (!key) {
      toast.error("Chave de API do Gemini não configurada. Por favor, configure nas definições.");
      return null;
    }

    const prompt = `
      Cria uma newsletter profissional em português de Portugal sobre os seguintes tópicos: ${topics}.
      
      A newsletter deve incluir:
      1. Um título apelativo
      2. Uma introdução breve e envolvente
      3. Secções principais para cada tópico, com conteúdo relevante (máximo 3 parágrafos por secção)
      4. Uma descrição adequada de imagem para cada secção
      5. Uma chamada para ação no final
      
      Usa linguagem formal portuguesa de Portugal (não brasileiro), tom profissional e estrutura clara.
      Formato de resposta obrigatório em JSON:
      {
        "title": "Título da Newsletter",
        "introduction": "Texto da introdução...",
        "sections": [
          {
            "title": "Título da Secção 1",
            "content": "Conteúdo detalhado da secção...",
            "imageDescription": "Descrição detalhada da imagem sugerida para esta secção..."
          }
        ],
        "callToAction": "Texto da chamada para ação..."
      }
    `;

    // Request to Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro na API Gemini:", errorData);
      throw new Error(errorData.error?.message || "Erro ao comunicar com a API Gemini");
    }

    const data = await response.json();
    
    // Extract the text content from Gemini response
    const textContent = data.candidates[0]?.content?.parts[0]?.text;
    
    if (!textContent) {
      throw new Error("Resposta vazia da API Gemini");
    }
    
    // Extract JSON from the text content
    // The API might return markdown or additional text, so we need to find and parse the JSON
    const jsonMatch = textContent.match(/```json\n([\s\S]*?)\n```/) || 
                       textContent.match(/{[\s\S]*?}/);
                       
    let newsletterData: Newsletter;
    
    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      newsletterData = JSON.parse(jsonStr);
    } else {
      // If no JSON format is found, try to parse the entire response
      try {
        newsletterData = JSON.parse(textContent);
      } catch (e) {
        console.error("Falha ao analisar resposta JSON:", e);
        throw new Error("Formato de resposta inválido da API Gemini");
      }
    }
    
    return newsletterData;
  } catch (error) {
    console.error("Erro ao gerar newsletter:", error);
    toast.error("Erro ao gerar a newsletter. Por favor, tente novamente.");
    return null;
  }
};

// Fallback to mock data if API fails
const generateMockNewsletter = (topics: string): Newsletter => {
  return {
    title: `Informativo ${topics.split(",")[0]}: Novidades e Perspetivas para 2024`,
    introduction: `Caros leitores,\n\nÉ com grande satisfação que apresentamos mais uma edição da nossa newsletter sobre ${topics}. Nesta edição, iremos abordar temas relevantes que estão a moldar o nosso setor e a trazer novas oportunidades para todos os envolvidos.\n\nPreparados para explorar as últimas novidades? Vamos começar!`,
    sections: topics.split(",").map((topic, index) => ({
      title: `${index === 0 ? "Principais" : "Outras"} Novidades sobre ${topic.trim()}`,
      content: `No cenário atual de ${topic.trim()}, estamos a observar tendências significativas que merecem atenção. Estudos recentes indicam um crescimento de 23% neste segmento, com empresas inovadoras a liderar as mudanças no mercado.\n\nEspecialistas apontam que investimentos em investigação e desenvolvimento estão a trazer resultados promissores, especialmente na área de sustentabilidade e eficiência operacional. Como resultado, observamos uma maior adaptabilidade das organizações face aos desafios contemporâneos.`,
      imageDescription: `Imagem profissional relacionada com ${topic.trim()} - Pessoas em ambiente empresarial a discutir sobre inovação e estratégias de crescimento, com gráficos de crescimento em segundo plano.`
    })),
    callToAction: `Quer saber mais sobre como implementar estas estratégias na sua empresa? Contacte-nos hoje mesmo e agende uma consultoria especializada em ${topics}. A nossa equipa está pronta para ajudar a sua organização a alcançar novos patamares de sucesso!`
  };
};
