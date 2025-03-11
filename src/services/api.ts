
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

// Mock helper functions to simulate Gemini API responses (in European Portuguese)
function generateMockTitle(topics: string): string {
  const topicsLower = topics.toLowerCase();
  
  if (topicsLower.includes("tecnologia")) {
    return "Inovação Tecnológica: A Transformar o Futuro dos Negócios";
  } else if (topicsLower.includes("saúde") || topicsLower.includes("saude")) {
    return "Bem-estar em Destaque: Novidades e Dicas para uma Vida Saudável";
  } else if (topicsLower.includes("finanças") || topicsLower.includes("financas")) {
    return "Panorama Financeiro: Estratégias para a Prosperidade Empresarial";
  } else {
    return `Informativo ${topics.split(" ")[0]}: Novidades e Perspetivas para 2024`;
  }
}

function generateMockIntroduction(topics: string): string {
  return `Olá, caros leitores!\n\nÉ com grande satisfação que apresentamos mais uma edição da nossa newsletter sobre ${topics}. Nesta edição, iremos abordar temas relevantes que estão a moldar o nosso setor e a trazer novas oportunidades para todos os envolvidos.\n\nPreparados para explorar as últimas novidades? Vamos começar!`;
}

function generateMockSections(topics: string): NewsletterSection[] {
  const topicsArray = topics.split(",").map(t => t.trim());
  
  return topicsArray.map((topic, index) => {
    return {
      title: `${index === 0 ? "Principais" : "Outras"} Novidades sobre ${topic}`,
      content: `No cenário atual de ${topic}, estamos a observar tendências significativas que merecem atenção. Estudos recentes indicam um crescimento de 23% neste segmento, com empresas inovadoras a liderar as mudanças no mercado.\n\nEspecialistas apontam que investimentos em investigação e desenvolvimento estão a trazer resultados promissores, especialmente na área de sustentabilidade e eficiência operacional. Como resultado, observamos uma maior adaptabilidade das organizações face aos desafios contemporâneos.`,
      imageDescription: `Imagem profissional relacionada com ${topic} - Pessoas em ambiente empresarial a discutir sobre inovação e estratégias de crescimento, com gráficos de crescimento em segundo plano.`
    };
  });
}

function generateMockCTA(topics: string): string {
  return `Quer saber mais sobre como implementar estas estratégias na sua empresa? Contacte-nos hoje mesmo e agende uma consultoria especializada em ${topics}. A nossa equipa está pronta para ajudar a sua organização a alcançar novos patamares de sucesso!`;
}
