import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import logoQuasar from "@/assets/logo-quasar-branca.png";
import logoQuasarPreta from "@/assets/logo-quasar-preta.png";
import { useLanguage } from "@/contexts/LanguageContext"; // Importando o contexto

interface QuasarNavigationProps {
  isHeroVisible?: boolean;
}

const QuasarNavigation = ({ isHeroVisible = true }: QuasarNavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage(); // Usando o hook de tradução

  // Usando os textos do arquivo de traduções
  const navLinks = [
    { href: "#sobre", label: t.nav.about },
    { href: "#palestrantes", label: t.nav.speakers },
    { href: "#programacao", label: t.nav.schedule },
    { href: "#local", label: t.nav.location },
    { href: "#inscricao", label: t.nav.registration },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  // Renderiza o rótulo do idioma (ex: PT | EN)
  const renderLanguageLabel = () => (
    <div className="flex items-center gap-1">
      <span className={language === 'pt' ? "font-bold" : "opacity-60 font-normal"}>PT</span>
      <span className="opacity-40">|</span>
      <span className={language === 'en' ? "font-bold" : "opacity-60 font-normal"}>EN</span>
    </div>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHeroVisible ? "bg-transparent" : "bg-background/95 backdrop-blur-sm border-b border-border"
    }`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img 
            src={isHeroVisible ? logoQuasar : logoQuasarPreta} 
            alt="Quasar" 
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className={`text-sm font-medium transition-colors duration-200 cursor-pointer ${
                isHeroVisible 
                  ? "text-white/90 hover:text-white" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Language Switcher Desktop */}
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all hover:scale-105 ${
              isHeroVisible
                ? "border-white/30 text-white bg-white/10 hover:bg-white/20"
                : "border-primary/20 text-primary bg-primary/5 hover:bg-primary/10"
            }`}
            aria-label={language === 'pt' ? "Mudar para Inglês" : "Switch to Portuguese"}
          >
            <Globe className="w-3.5 h-3.5" />
            {renderLanguageLabel()}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Language Switcher Mobile */}
           <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs ${
              isHeroVisible
                ? "border-white/30 text-white bg-white/10"
                : "border-foreground/20 text-foreground"
            }`}
            aria-label={language === 'pt' ? "Mudar para Inglês" : "Switch to Portuguese"}
          >
             <Globe className="w-3.5 h-3.5" />
             {renderLanguageLabel()}
          </button>

          <button
            className="p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${isHeroVisible ? "text-white" : "text-foreground"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isHeroVisible ? "text-white" : "text-foreground"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-in slide-in-from-top-5 duration-200">
          <div className="container mx-auto px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default QuasarNavigation;