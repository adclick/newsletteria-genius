
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { generateNewsletter } from '@/services/api';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';

interface NewsletterFormProps {
  onGenerated: (value: any) => void;
  setIsLoading: (value: boolean) => void;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ onGenerated, setIsLoading }) => {
  const [topics, setTopics] = useState<string>('');
  const [generating, setGenerating] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topics.trim()) {
      toast.warning("Por favor, insira pelo menos um tópico para a newsletter.");
      return;
    }
    
    setGenerating(true);
    setIsLoading(true);
    
    try {
      const newsletter = await generateNewsletter(topics);
      if (newsletter) {
        onGenerated(newsletter);
        toast.success("Newsletter gerada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao gerar newsletter:", error);
      toast.error("Ocorreu um erro ao gerar a newsletter. Por favor, tente novamente.");
    } finally {
      setGenerating(false);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Gerador de Newsletter</CardTitle>
          <CardDescription>
            Insira os tópicos que você deseja abordar na sua newsletter em português.
            Separe múltiplos tópicos com vírgulas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Ex: Tecnologia empresarial, Inovação no trabalho, Tendências de mercado"
            className="resize-none h-32"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            disabled={generating}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={generating || !topics.trim()}>
            {generating ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              "Gerar Newsletter"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default NewsletterForm;
