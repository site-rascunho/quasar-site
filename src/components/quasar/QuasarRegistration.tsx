import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// --- CONFIGURAÇÃO DO GOOGLE FORMS ---
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe3BVoAk0HBdj7NXX_6mxuwoTFlIQNBEYltZj59IVSFFeH7xw/formResponse";

const FIELD_IDS = {
  name: "entry.1506848749",
  email: "entry.1884448240",
  institution: "entry.618501221",
  role: "entry.688746124",
  participation: "entry.1209571215",
  message: "entry.618321684"
};

const QuasarRegistration = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estado para armazenar os erros de validação
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    role: "",
    participation: "",
    message: ""
  });

  // Função de validação
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório.";
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido.";
    }
    if (!formData.institution.trim()) newErrors.institution = "Instituição é obrigatória.";
    if (!formData.participation) newErrors.participation = "Selecione uma modalidade.";

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Executa a validação
    const currentErrors = validate();

    // Se houver erros, interrompe o envio e faz o scroll
    if (Object.keys(currentErrors).length > 0) {
      // Pega o primeiro campo com erro
      const firstErrorField = Object.keys(currentErrors)[0];
      const element = document.getElementById(firstErrorField);

      if (element) {
        // Calcula a posição para scrollar com um pouco de folga (offset)
        const yOffset = -120; // Ajuste para não ficar colado no topo ou embaixo do menu
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
        
        // Tenta focar se for um input
        if (element.tagName === 'INPUT') {
            element.focus();
        }
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const googleFormData = new FormData();
      googleFormData.append(FIELD_IDS.name, formData.name);
      googleFormData.append(FIELD_IDS.email, formData.email);
      googleFormData.append(FIELD_IDS.institution, formData.institution);
      googleFormData.append(FIELD_IDS.role, formData.role);
      googleFormData.append(FIELD_IDS.participation, formData.participation);
      googleFormData.append(FIELD_IDS.message, formData.message);

      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: googleFormData,
      });

      toast({
        title: "Pré-inscrição recebida!",
        description: "Seus dados foram salvos com sucesso.",
      });

      setFormData({
        name: "",
        email: "",
        institution: "",
        role: "",
        participation: "",
        message: ""
      });
      setErrors({}); // Limpa erros após sucesso

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

  // Componente auxiliar para exibir a mensagem de erro
  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return <span className="text-red-500 text-xs mt-1 block font-medium">{message}</span>;
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

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="name" className={errors.name ? "text-red-500" : ""}>Nome Completo (1) *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                className={errors.name ? "border-red-500 focus-visible:ring-red-500" : "bg-background border-border"}
              />
              <ErrorMessage message={errors.name} />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className={errors.email ? "text-red-500" : ""}>E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : "bg-background border-border"}
              />
              <ErrorMessage message={errors.email} />
            </div>

            {/* Instituição */}
            <div className="space-y-2">
              <Label htmlFor="institution" className={errors.institution ? "text-red-500" : ""}>Instituição/Empresa *</Label>
              <Input
                id="institution"
                value={formData.institution}
                onChange={(e) => {
                  setFormData({ ...formData, institution: e.target.value });
                  if (errors.institution) setErrors({ ...errors, institution: "" });
                }}
                className={errors.institution ? "border-red-500 focus-visible:ring-red-500" : "bg-background border-border"}
              />
              <ErrorMessage message={errors.institution} />
            </div>

            {/* Cargo (Opcional) */}
            <div className="space-y-2">
              <Label htmlFor="role">Cargo/Função</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="bg-background border-border"
              />
            </div>

            {/* Modalidade */}
            <div className="space-y-2">
              <Label htmlFor="participation" className={errors.participation ? "text-red-500" : ""}>Modalidade de Participação *</Label>
              {/* ID adicionado na div para servir de âncora para o scroll */}
              <div id="participation">
                <Select
                  value={formData.participation}
                  onValueChange={(value) => {
                    setFormData({ ...formData, participation: value });
                    if (errors.participation) setErrors({ ...errors, participation: "" });
                  }}
                >
                  <SelectTrigger className={errors.participation ? "border-red-500 focus:ring-red-500" : "bg-background border-border"}>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Presencial">Presencial</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Ambos">Ambos (se disponível)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ErrorMessage message={errors.participation} />
            </div>

            {/* Mensagem */}
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