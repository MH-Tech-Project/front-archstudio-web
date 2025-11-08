import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";
import Navigation from "../Navigation";
import { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

interface HeaderProps {
    showButtonLogin?: boolean;
}

export default function Header({ showButtonLogin = false }: HeaderProps) {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Função para scroll suave até o topo
    const smoothScrollToTop = () => {
        const startPosition = window.scrollY;
        const duration = 300;
        let start = 0;

        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            
            // Easing ease-out
            const ease = progress * (2 - progress);
            
            window.scrollTo(0, startPosition * (1 - ease));
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                // Quando terminar o scroll, trava a tela e mostra o menu
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = '0px';
                document.body.style.width = '100%';
                
                // Delay para mostrar o menu após o scroll
                setTimeout(() => {
                    setShowMobileMenu(true);
                }, 200);
            }
        };
        
        requestAnimationFrame(step);
    };

    // Função para scroll suave de volta à posição original
    const smoothScrollToPosition = (targetPosition: number) => {
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 300;
        let start = 0;

        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            
            const ease = progress * (2 - progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    };

    const toggleMobileMenu = () => {
        if (!isMobileMenuOpen) {
            // Abrindo o menu
            setScrollPosition(window.scrollY); // Salva posição atual
            setIsMobileMenuOpen(true);
            
            if (window.scrollY > 0) {
                // Se não estiver no topo, scrolla suavemente para o topo
                smoothScrollToTop();
            } else {
                // Se já estiver no topo, apenas trava e mostra o menu
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = '0px';
                document.body.style.width = '100%';
                setShowMobileMenu(true);
            }
        } else {
            // Fechando o menu
            setShowMobileMenu(false);
            setIsMobileMenuOpen(false);
            
            // Restaura o body
            document.body.style.overflow = 'unset';
            document.body.style.position = 'unset';
            document.body.style.top = 'unset';
            document.body.style.width = 'unset';
            
            // Volta para a posição original com delay
            setTimeout(() => {
                if (scrollPosition > 0) {
                    smoothScrollToPosition(scrollPosition);
                }
            }, 50);
        }
    };

    const closeMobileMenu = () => {
        toggleMobileMenu();
    };

    return(
        <header 
            className={`w-full flex md:justify-around justify-between items-center mb-8 gap-4 md:gap-52 py-4 px-4 border-b border-[#34373D] fixed top-0 z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-card/60 backdrop-blur-lg' 
                    : ''
            }`}
            style={{ backgroundColor: isScrolled ? undefined : 'var(--background)' }}
        >
            <Logo redirectTo={routes.home} fixedColor={isScrolled} />

            {
                showButtonLogin ? (
                    <div className="flex justify-center items-center gap-4">
                        <span className="hidden sm:block text-sm text-[#9FA3AD]">Já tem uma conta?</span>
                        <button 
                            onClick={() => navigate('/login')} 
                            className='bg-transparent text-foreground text-sm py-2 px-4 rounded-xl border border-[#34373D] hover:opacity-80 cursor-pointer'
                        >
                            Fazer Login
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="hidden md:flex items-center gap-16">
                            <Navigation isScrolled={isScrolled} />
                            <ThemeToggle isFixedColor={isScrolled} />
                        </div>
            
    
                        <div className="md:hidden flex items-center gap-4">
                            <ThemeToggle isFixedColor={isScrolled} />
                            <button
                                onClick={toggleMobileMenu}
                                className={` hover:text-[#EFA339] transition-colors p-2 ${isScrolled ? 'text-[#E8EAEE]' : 'text-foreground'}`}
                                aria-label="Menu"
                            >
                                {isMobileMenuOpen ? (
                                    <HiX size={24} />
                                ) : (
                                    <HiMenuAlt3 size={24} />
                                )}
                            </button>
                        </div>
            
                        {/* Mobile Menu Overlay */}
                        {isMobileMenuOpen && showMobileMenu && (
                            <div className="fixed inset-0 top-[73px] bg-background/95 backdrop-blur-lg z-40 md:hidden">
                                <Navigation isMobile={true} onItemClick={closeMobileMenu} />
                            </div>
                        )}
                    </>
                )
            }
            
        </header>
    )
}