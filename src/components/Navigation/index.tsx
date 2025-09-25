import { useNavigate } from "react-router-dom";

interface NavigationProps {
    isMobile?: boolean;
    isScrolled?: boolean;
    onItemClick?: () => void;
}

export default function Navigation({ isMobile = false, isScrolled = false, onItemClick }: NavigationProps) {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
        onItemClick?.();
    };

    const handleLinkClick = () => {
        onItemClick?.();
    };

    const linkClass = isMobile 
        ? "text-xl font-medium text-[#E8EAEE] transition-colors"
        : "hover:underline text-base font-medium hover:text-foreground transition-colors";

    const buttonClass = isMobile
        ? "bg-transparent text-foreground py-3 px-6 rounded-xl border border-[#E8EAEE] text-[#E8EAEE] transition-all text-xl font-medium"
        : "bg-transparent text-foreground py-2 px-4 rounded-xl border border-foreground hover:opacity-70 cursor-pointer";

    const containerClass = isMobile
        ? "flex flex-col items-center justify-center h-full gap-8 text-foreground"
        : "flex items-center gap-8 text-foreground";

    return (
        <nav 
            className={containerClass}
            style={{ color: !isMobile && isScrolled ? '#E8EAEE' : undefined }}
        >
            <a 
                href="#Plan" 
                onClick={handleLinkClick}
                className={linkClass}
            >
                Planos
            </a>
            <a 
                href="#About" 
                onClick={handleLinkClick}
                className={linkClass}
            >
                Sobre Nós
            </a>
            <a 
                href="#Help" 
                onClick={handleLinkClick}
                className={linkClass}
            >
                Ajuda
            </a>
            <button 
                onClick={handleLoginClick} 
                className={buttonClass}
            >
                Login
            </button>
        </nav>
    );
}