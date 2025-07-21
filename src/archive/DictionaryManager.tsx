
import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Plus, List, Code, Upload } from 'lucide-react';
import DictionaryEntries from '../components/DictionaryEntries';
import { dictionaryEntries, categories, addDictionaryEntry, addCategory } from '../data/dictionaries';
import { useToast } from "@/components/ui/use-toast";

const DictionaryManager = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newEntryForm, setNewEntryForm] = useState({
    title: '',
    description: '',
    category: categories[0],
    tags: '',
    source: '',
    code: ''
  });

  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos obrigatórios
    if (!newEntryForm.title.trim() || !newEntryForm.description.trim() || !newEntryForm.category.trim()) {
      toast({
        title: "Erro ao adicionar",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    // Processar as tags (converter string para array)
    const tags = newEntryForm.tags ? newEntryForm.tags.split(',').map(tag => tag.trim()) : [];
    
    // Adicionar nova categoria se necessário
    if (!categories.includes(newEntryForm.category)) {
      addCategory(newEntryForm.category);
    }
    
    // Criar e adicionar a nova entrada
    const newEntry = addDictionaryEntry({
      title: newEntryForm.title,
      description: newEntryForm.description,
      category: newEntryForm.category,
      source: newEntryForm.source || undefined,
      tags: tags.length > 0 ? tags : undefined,
      code: newEntryForm.code || undefined
    });
    
    // Mostrar notificação de sucesso
    toast({
      title: "Entrada adicionada",
      description: `"${newEntryForm.title}" foi adicionado ao dicionário.`,
    });
    
    // Limpar o formulário
    setNewEntryForm({
      title: '',
      description: '',
      category: categories[0],
      tags: '',
      source: '',
      code: ''
    });
    
    setShowCodeEditor(false);
    
    // Mudar para a aba de visualização
    setActiveTab('browse');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Extrair o nome do arquivo para usar como fonte
    setNewEntryForm(prev => ({
      ...prev,
      source: file.name
    }));

    // Ler o conteúdo do arquivo
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      
      // Atualizar o código com o conteúdo do arquivo
      setNewEntryForm(prev => ({
        ...prev,
        code: content
      }));
      
      // Mostrar o editor de código para o usuário verificar
      setShowCodeEditor(true);
      
      toast({
        title: "Arquivo importado",
        description: `"${file.name}" foi importado com sucesso.`,
      });
    };
    
    reader.onerror = () => {
      toast({
        title: "Erro ao importar",
        description: "Não foi possível ler o arquivo. Tente novamente.",
        variant: "destructive"
      });
    };
    
    reader.readAsText(file);
    
    // Limpar o input para permitir selecionar o mesmo arquivo novamente
    e.target.value = '';
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h1>📚 Gerenciamento do Dicionário Vivo</h1>
            <p className="text-forest-700 text-lg mt-4">
              Adicione e gerencie os verbetes do dicionário da comunidade SOSPlanet
            </p>
          </div>

          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">
                <List className="mr-2 h-4 w-4" />
                Visualizar Verbetes
              </TabsTrigger>
              <TabsTrigger value="add">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Novo
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Book className="mr-2 h-5 w-5" />
                    Visualizar Dicionário Vivo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-muted-foreground">
                      Total de {dictionaryEntries.length} verbetes em {categories.length} categorias
                    </p>
                  </div>
                  <DictionaryEntries />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="add" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="mr-2 h-5 w-5" />
                    Adicionar Novo Verbete
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                      <label htmlFor="title" className="form-label">Título:</label>
                      <input
                        id="title"
                        type="text"
                        className="form-input"
                        value={newEntryForm.title}
                        onChange={(e) => setNewEntryForm({...newEntryForm, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="description" className="form-label">Descrição:</label>
                      <textarea
                        id="description"
                        className="form-textarea"
                        value={newEntryForm.description}
                        onChange={(e) => setNewEntryForm({...newEntryForm, description: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="category" className="form-label">Categoria:</label>
                      <select
                        id="category"
                        className="form-input"
                        value={newEntryForm.category}
                        onChange={(e) => setNewEntryForm({...newEntryForm, category: e.target.value})}
                        required
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="source" className="form-label">Fonte (nome do arquivo Python):</label>
                      <div className="flex items-center gap-2">
                        <input
                          id="source"
                          type="text"
                          className="form-input flex-grow"
                          placeholder="SOSPlanet_dicionario_central.py"
                          value={newEntryForm.source}
                          onChange={(e) => setNewEntryForm({...newEntryForm, source: e.target.value})}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handleImportClick}
                          className="flex items-center whitespace-nowrap"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Importar Arquivo
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".py,.txt,.md"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="tags" className="form-label">Tags (separadas por vírgula):</label>
                      <input
                        id="tags"
                        type="text"
                        className="form-input"
                        placeholder="colaboração, participação, cultura"
                        value={newEntryForm.tags}
                        onChange={(e) => setNewEntryForm({...newEntryForm, tags: e.target.value})}
                      />
                    </div>

                    <div className="form-group mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <label className="form-label">Código Python (opcional):</label>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowCodeEditor(!showCodeEditor)}
                          className="flex items-center"
                        >
                          <Code className="h-4 w-4 mr-2" />
                          {showCodeEditor ? "Ocultar editor" : "Mostrar editor"}
                        </Button>
                      </div>
                      
                      {showCodeEditor && (
                        <textarea
                          id="code"
                          className="form-textarea font-mono text-sm"
                          rows={10}
                          placeholder="# Seu código Python aqui"
                          value={newEntryForm.code}
                          onChange={(e) => setNewEntryForm({...newEntryForm, code: e.target.value})}
                        />
                      )}
                    </div>
                    
                    <div className="text-center mt-6">
                      <Button type="submit" className="submit-button">
                        Adicionar ao Dicionário
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default DictionaryManager;
