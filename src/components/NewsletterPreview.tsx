import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Code2, FileText, Eye } from 'lucide-react';
import type { Newsletter, NewsletterSection } from '@/services/api';
import { toast } from 'sonner';
import { generateEmailHtml } from '@/lib/emailTemplate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface NewsletterPreviewProps {
  newsletter: Newsletter;
}

const NewsletterPreview: React.FC<NewsletterPreviewProps> = ({ newsletter }) => {
  const [activeTab, setActiveTab] = useState<string>('text');

  // Function to copy text content to clipboard
  const copyTextContent = () => {
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
      .then(() => toast.success("Conteúdo de texto copiado!"))
      .catch(() => toast.error("Erro ao copiar o conteúdo. Tente novamente."));
  };

  // Function to copy HTML content to clipboard
  const copyHtmlContent = () => {
    const htmlContent = generateEmailHtml(newsletter);
    navigator.clipboard.writeText(htmlContent)
      .then(() => toast.success("Código HTML copiado!"))
      .catch(() => toast.error("Erro ao copiar o HTML. Tente novamente."));
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Preview da Newsletter</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Texto
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview HTML
              </TabsTrigger>
              <TabsTrigger value="html" className="flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                Código HTML
              </TabsTrigger>
            </TabsList>
            {activeTab !== 'preview' && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={activeTab === 'text' ? copyTextContent : copyHtmlContent}
              >
                <Copy className="h-4 w-4" />
                Copiar {activeTab === 'text' ? 'Texto' : 'HTML'}
              </Button>
            )}
          </div>

          <TabsContent value="text" className="mt-0">
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
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <div className="bg-gray-100 p-4 rounded-md">
              <div className="max-w-[600px] mx-auto">
                <iframe
                  srcDoc={generateEmailHtml(newsletter)}
                  className="w-full min-h-[600px] bg-white rounded-md shadow-sm"
                  title="Newsletter Preview"
                  frameBorder="0"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="html" className="mt-0">
            <div className="bg-gray-900 text-gray-100 p-6 rounded-md font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre-wrap break-all">
                {generateEmailHtml(newsletter)}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NewsletterPreview;
