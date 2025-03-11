
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import type { Newsletter, NewsletterSection } from '@/services/api';
import { toast } from 'sonner';

interface NewsletterPreviewProps {
  newsletter: Newsletter;
}

const NewsletterPreview: React.FC<NewsletterPreviewProps> = ({ newsletter }) => {
  // Function to copy newsletter content to clipboard
  const copyToClipboard = () => {
    // Format the newsletter content as plain text
    const content = `
# ${newsletter.title}

${newsletter.introduction}

${newsletter.sections.map(section => `
## ${section.title}

${section.content}

Sugestão de imagem: ${section.imageDescription}
`).join('\n')}

## Chamada para Ação

${newsletter.callToAction}
    `;
    
    navigator.clipboard.writeText(content.trim())
      .then(() => toast.success("Conteúdo copiado para a área de transferência!"))
      .catch(() => toast.error("Erro ao copiar o conteúdo. Tente novamente."));
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Preview da Newsletter</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={copyToClipboard}
        >
          <Copy className="h-4 w-4" />
          Copiar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="newsletter-content space-y-6 bg-white rounded-md p-6 border border-gray-200">
          <h1>{newsletter.title}</h1>
          
          <div className="whitespace-pre-line">{newsletter.introduction}</div>
          
          {newsletter.sections.map((section: NewsletterSection, index: number) => (
            <div key={index} className="space-y-3">
              <h2>{section.title}</h2>
              <div className="whitespace-pre-line">{section.content}</div>
              
              <div className="bg-slate-50 border border-gray-200 p-4 rounded-md">
                <p className="text-sm text-newsletteria-gray font-medium mb-2">Sugestão de imagem:</p>
                <p className="text-sm italic text-gray-700">{section.imageDescription}</p>
              </div>
            </div>
          ))}
          
          <div className="bg-newsletteria-blue/5 p-4 rounded-md border border-newsletteria-blue/20">
            <h2 className="text-newsletteria-blue">Chamada para Ação</h2>
            <div className="whitespace-pre-line">{newsletter.callToAction}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsletterPreview;
