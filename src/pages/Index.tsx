
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import NewsletterForm from '@/components/NewsletterForm';
import NewsletterPreview from '@/components/NewsletterPreview';
import LoadingPlaceholder from '@/components/LoadingPlaceholder';
import { Newsletter, getApiKey } from '@/services/api';
import { toast } from 'sonner';

const Index = () => {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    // Add lang attribute to html tag
    document.documentElement.lang = 'pt-PT';
    
    // Check if API key is present on first load
    if (!getApiKey()) {
      toast.info("Configure a sua chave da API Gemini para começar", {
        description: "Clique no ícone de definições no canto superior direito.",
        duration: 6000,
      });
    }
  }, []);

  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Newsletters profissionais</h2>
            <p className="mt-3 text-lg text-gray-600">
              Indique os tópicos e deixe a IA criar o seu conteúdo automaticamente
            </p>
          </div>

          <NewsletterForm onGenerated={setNewsletter} setIsLoading={setIsLoading} />

          {isLoading && <LoadingPlaceholder />}
          
          {!isLoading && newsletter && <NewsletterPreview newsletter={newsletter} />}
        </div>
      </main>
      <footer className="py-6 border-t border-gray-200 mt-10">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">© 2024 Newsletteria - Gerador de newsletters</div>
      </footer>
    </div>;
};

export default Index;
