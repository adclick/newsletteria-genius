
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import { getApiKey, setApiKey } from '@/services/api';
import { toast } from 'sonner';

const ApiKeySettings = () => {
  const [apiKey, setApiKeyState] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setApiKeyState(getApiKey());
  }, [open]);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.warning("Por favor, insira uma chave de API válida");
      return;
    }
    
    setApiKey(apiKey.trim());
    toast.success("Chave de API guardada com sucesso!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full" title="Definições da API">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configuração da API Gemini</DialogTitle>
          <DialogDescription>
            Insira a sua chave de API do Google Gemini para ativar a geração de newsletters.
            Pode obter uma chave em: https://aistudio.google.com/app/apikey
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <Label htmlFor="apiKey" className="text-left">
            Chave de API
          </Label>
          <Input
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKeyState(e.target.value)}
            placeholder="AIza..."
            className="col-span-3"
          />
          <p className="text-sm text-gray-500">
            A sua chave de API é armazenada apenas no seu navegador e nunca é enviada para os nossos servidores.
          </p>
        </div>
        
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeySettings;
