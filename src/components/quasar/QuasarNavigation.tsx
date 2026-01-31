// src/components/quasar/QuasarNavigation.tsx
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react"; // Adicione o ícone Globe
import { useLanguage } from "@/contexts/LanguageContext"; // Importe o hook
import logoQuasar from "@/assets/logo-quasar-branca.png";
import logoQuasarPreta from "@/assets/logo-quasar-preta.png";
import { Button } from "@/components/ui/button"; // Opcional, ou use button html simples

interface QuasarNavigationProps {
  isHeroVisible?: boolean;
}

const QuasarNavigation = ({ isHeroVisible = true }: QuasarNavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage(); // Use o contexto

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHeroVisible ? "bg-transparent" : "bg-background/95 backdrop-blur-sm border-b border-border"
    }`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
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
            className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${
              isHeroVisible 
                ? "border-white/30 text-white hover:bg-white/10" 
                : "border-border text-foreground hover:bg-secondary"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs font-bold">{language.toUpperCase()}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          {/* Language Switcher Mobile */}
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1 ${isHeroVisible ? "text-white" : "text-foreground"}`}
          >
            <span className="text-xs font-bold">{language.toUpperCase()}</span>
          </button>

          <button
            className="p-2"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
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