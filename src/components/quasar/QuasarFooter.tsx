import logoGovernoParaiba from "@/assets/logo-governo-pb.png";
import logoPMJP from "@/assets/logo-pmjp.png";
import logoUFPB from "@/assets/logo-ufpb.png";
import logoQuasar from "@/assets/logo-quasar-branca.png";

// IMPORTS TEMPORÁRIOS - Substitua pelos nomes corretos dos seus arquivos na pasta assets
// Exemplo: import logoMarca1 from "@/assets/google.png";
import LogoVenturus from "@/assets/venturus.png"; // Placeholder: Substitua este import
import LogoAWS from "@/assets/aws.png"; // Placeholder: Substitua este import

const QuasarFooter = () => {
  return (
    <footer className="bg-black text-white">
      {/* Partners Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          {/* Apoio */}
          <div className="mb-12">
            <p className="text-sm text-white/60 text-center mb-8 tracking-widest uppercase">
              Apoio
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
              <img 
                src={logoGovernoParaiba} 
                alt="Governo da Paraíba" 
                className="h-12 md:h-16 w-auto opacity-90"
              />
              <img 
                src={logoPMJP} 
                alt="Prefeitura de João Pessoa" 
                className="h-10 md:h-12 w-auto opacity-90"
              />
              <img 
                src={logoUFPB} 
                alt="UFPB" 
                className="h-16 md:h-24 w-auto opacity-90"
              />
              
              {/* --- NOVAS MARCAS ADICIONADAS AQUI --- */}
              <img 
                src={LogoVenturus} 
                alt="Venturus" 
                className="h-12 md:h-16 w-auto opacity-90" 
              />
              <img 
                src={LogoAWS} 
                alt="AWS" 
                className="h-10 md:h-14 w-auto opacity-90" 
              />
              {/* ------------------------------------- */}

            </div>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-white/20 mx-auto mb-12" />

          {/* Realização */}
          <div>
            <p className="text-sm text-white/60 text-center mb-8 tracking-widest uppercase">
              Realização
            </p>
            <div className="flex justify-center">
              <img 
                src={logoQuasar} 
                alt="Quasar" 
                className="h-18 md:h-24 w-auto opacity-90"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-6">
          <p className="text-sm text-white/40 text-center">
            © 2026 II Encontro Quasar. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default QuasarFooter;