
import React, { useState } from 'react';
import Header from '@/components/Header';
import NewsletterForm from '@/components/NewsletterForm';
import NewsletterPreview from '@/components/NewsletterPreview';
import LoadingPlaceholder from '@/components/LoadingPlaceholder';
import { Newsletter } from '@/services/api';

const Index = () => {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Gere newsletters profissionais em português de Portugal
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              Indique os tópicos e deixe a IA criar o seu conteúdo automaticamente
            </p>
          </div>

          <NewsletterForm 
            onGenerated={setNewsletter} 
            setIsLoading={setIsLoading}
          />

          {isLoading && <LoadingPlaceholder />}
          
          {!isLoading && newsletter && (
            <NewsletterPreview newsletter={newsletter} />
          )}
        </div>
      </main>
      <footer className="py-6 border-t border-gray-200 mt-10">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © 2024 Newsletteria - Gerador de newsletters em português de Portugal
        </div>
      </footer>
    </div>
  );
};

export default Index;
