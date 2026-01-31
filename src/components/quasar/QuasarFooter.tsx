import logoGovernoParaiba from "@/assets/logo-governo-pb.png";
import logoPMJP from "@/assets/logo-pmjp.png";
import logoUFPB from "@/assets/logo-ufpb.png";
import logoQuasar from "@/assets/logo-quasar-branca.png";
import LogoVenturus from "@/assets/venturus.png";
import LogoAWS from "@/assets/aws.png";
import { useLanguage } from "@/contexts/LanguageContext";

const QuasarFooter = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white">
      <div className="py-16">
        <div className="container mx-auto px-6">
          {/* Apoio */}
          <div className="mb-12">
            <p className="text-sm text-white/60 text-center mb-8 tracking-widest uppercase">
              {t.footer.support}
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
            </div>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-white/20 mx-auto mb-12" />

          {/* Realização */}
          <div>
            <p className="text-sm text-white/60 text-center mb-8 tracking-widest uppercase">
              {t.footer.organizedBy}
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
            {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default QuasarFooter;