import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// TROQUE pelo seu ID:
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe3BVoAk0HBdj7NXX_6mxuwoTFlIQNBEYltZj59IVSFFeH7xw/formResponse";

// TROQUE pelos entry.X de cada campo do seu formulário Google
const ENTRY = {
  name: "entry.973886953",
  email: "entry.1642407322",
  institution: "entry.980454417",
  role: "entry.1273778173",
  participation: "entry.1981685151",
  message: "entry.1232827003",
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

    // Monta os dados no formato exigido pelo Google Forms
    const formBody = new URLSearchParams({
      [ENTRY.name]: formData.name,
      [ENTRY.email]: formData.email,
      [ENTRY.institution]: formData.institution,
      [ENTRY.role]: formData.role,
      [ENTRY.participation]: formData.participation,
      [ENTRY.message]: formData.message,
    });

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors", // obrigatório para Google Forms aceitar requisições do front
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString(),
      });
      toast({
        title: "Pré-inscrição recebida!",
        description: "Entraremos em contato em breve com mais informações.",
      });
      setFormData({
        name: "",
        email: "",
        institution: "",
        role: "",
        participation: "",
        message: ""
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar sua pré-inscrição. Tente novamente mais tarde.",
        variant: "destructive",
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
                value={formData.participation}
                onValueChange={(value) => setFormData({ ...formData, participation: value })}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="ambos">Ambos (se disponível)</SelectItem>
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