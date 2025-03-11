
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

export const generateNewsletter = async (topics: string): Promise<Newsletter | null> => {
  try {
    // In a real implementation, this would call the Gemini API
    // For now, we'll simulate the API response with a mock delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demonstration purposes, creating mock data
    // This would be replaced with actual Gemini API call
    const mockNewsletter: Newsletter = {
      title: generateMockTitle(topics),
      introduction: generateMockIntroduction(topics),
      sections: generateMockSections(topics),
      callToAction: generateMockCTA(topics)
    };
    
    return mockNewsletter;
  } catch (error) {
    console.error("Erro ao gerar newsletter:", error);
    toast.error("Erro ao gerar a newsletter. Por favor, tente novamente.");
    return null;
  }
};

// Mock helper functions to simulate Gemini API responses (in Portuguese)
function generateMockTitle(topics: string): string {
  const topicsLower = topics.toLowerCase();
  
  if (topicsLower.includes("tecnologia")) {
    return "Inovação Tecnológica: Transformando o Futuro dos Negócios";
  } else if (topicsLower.includes("saúde") || topicsLower.includes("saude")) {
    return "Bem-estar em Foco: Novidades e Dicas para uma Vida Saudável";
  } else if (topicsLower.includes("finanças") || topicsLower.includes("financas")) {
    return "Panorama Financeiro: Estratégias para Prosperidade Corporativa";
  } else {
    return `Informativo ${topics.split(" ")[0]}: Novidades e Perspectivas para 2024`;
  }
}

function generateMockIntroduction(topics: string): string {
  return `Olá, prezados leitores!\n\nÉ com grande satisfação que apresentamos mais uma edição da nossa newsletter sobre ${topics}. Nesta edição, abordaremos temas relevantes que estão moldando nosso setor e trazendo novas oportunidades para todos os envolvidos.\n\nPreparados para explorar as últimas novidades? Vamos começar!`;
}

function generateMockSections(topics: string): NewsletterSection[] {
  const topicsArray = topics.split(",").map(t => t.trim());
  
  return topicsArray.map((topic, index) => {
    return {
      title: `${index === 0 ? "Principais" : "Outras"} Novidades sobre ${topic}`,
      content: `No cenário atual de ${topic}, estamos observando tendências significativas que merecem atenção. Estudos recentes indicam um crescimento de 23% neste segmento, com empresas inovadoras liderando as mudanças no mercado.\n\nEspecialistas apontam que investimentos em pesquisa e desenvolvimento estão trazendo resultados promissores, especialmente na área de sustentabilidade e eficiência operacional. Como resultado, observamos uma maior adaptabilidade das organizações frente aos desafios contemporâneos.`,
      imageDescription: `Imagem profissional relacionada a ${topic} - Pessoas em ambiente corporativo discutindo sobre inovação e estratégias de crescimento, com gráficos de crescimento ao fundo.`
    };
  });
}

function generateMockCTA(topics: string): string {
  return `Quer saber mais sobre como implementar estas estratégias em sua empresa? Entre em contato conosco hoje mesmo e agende uma consultoria especializada em ${topics}. Nossa equipe está pronta para ajudar sua organização a alcançar novos patamares de sucesso!`;
}
