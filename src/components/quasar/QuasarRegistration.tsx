import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// --- CONFIGURAÇÃO DO GOOGLE FORMS ---
// 1. Coloque a URL de "action" do seu formulário aqui.
//    (Pegue o link de visualização do form e troque '/viewform' por '/formResponse')
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe3BVoAk0HBdj7NXX_6mxuwoTFlIQNBEYltZj59IVSFFeH7xw/formResponse";

// 2. Coloque os IDs dos campos (entry.XXXXXX) que você pegou no link preenchido
const FIELD_IDS = {
  name: "entry.1506848749",        // Substitua pelo ID do campo Nome
  email: "entry.1884448240",       // Substitua pelo ID do campo Email
  institution: "entry.618501221", // Substitua pelo ID do campo Instituição
  role: "entry.688746124",        // Substitua pelo ID do campo Cargo
  participation: "entry.1209571215", // Substitua pelo ID da Modalidade
  message: "entry.618321684"      // Substitua pelo ID da Mensagem
};

const QuasarRegistration = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    role: "",
    participation: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Criação dos dados no formato que o Google Forms espera
      const googleFormData = new FormData();
      googleFormData.append(FIELD_IDS.name, formData.name);
      googleFormData.append(FIELD_IDS.email, formData.email);
      googleFormData.append(FIELD_IDS.institution, formData.institution);
      googleFormData.append(FIELD_IDS.role, formData.role);
      googleFormData.append(FIELD_IDS.participation, formData.participation);
      googleFormData.append(FIELD_IDS.message, formData.message);

      // Envio para o Google Forms
      // mode: "no-cors" é necessário porque o Google não retorna um cabeçalho CORS padrão.
      // Isso significa que não conseguiremos ler a resposta de sucesso do servidor,
      // mas o envio funcionará se os IDs estiverem corretos.
      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: googleFormData,
      });

      // Assumimos sucesso se não houve erro de rede
      toast({
        title: "Pré-inscrição recebida!",
        description: "Seus dados foram salvos com sucesso.",
      });

      // Limpar formulário
      setFormData({
        name: "",
        email: "",
        institution: "",
        role: "",
        participation: "",
        message: ""
      });

    } catch (error) {
      console.error("Erro ao enviar:", error);
      toast({
        title: "Erro no envio",
        description: "Houve um problema ao enviar sua inscrição. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inscricao" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-foreground text-center mb-4">
            Pré-Inscrição
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Registre seu interesse em participar do II Encontro Quasar
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution">Instituição/Empresa *</Label>
              <Input
                id="institution"
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Cargo/Função</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="participation">Modalidade de Participação *</Label>
              <Select
                required
                value={formData.participation}
                onValueChange={(value) => setFormData({ ...formData, participation: value })}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Presencial">Presencial</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Ambos">Ambos (se disponível)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensagem (opcional)</Label>
              <Textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-background border-border resize-none"
                placeholder="Conte-nos sobre seu interesse no evento..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-foreground text-background hover:bg-foreground/90"
            >
              {isSubmitting ? "Enviando..." : "Enviar Pré-Inscrição"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuasarRegistration;