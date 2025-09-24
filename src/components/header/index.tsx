import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";
import { useState, useEffect } from "react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return(
        <header 
            className={`w-full flex justify-around items-center mb-8 gap-52 py-4 border-b border-[#34373D] fixed top-0 z-999 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-card/60 backdrop-blur-lg' 
                    : ''
            }`}
            style={{ backgroundColor: isScrolled ? undefined : 'var(--background)' }}
        >
            <Logo fixedColor={isScrolled} />
            <div className="flex items-center gap-16">
                <nav className="hidden md:flex items-center gap-8 text-foreground" style={{ color: isScrolled ? '#E8EAEE' : undefined }}>
                    <a href="#Plan" className="hover:underline text-base font-medium hover:text-[#E8EAEE] transition-colors">Planos</a>
                    <a href="#About" className="hover:underline text-base font-medium hover:text-[#E8EAEE] transition-colors">Sobre Nós</a>
                    <a href="#Help" className="hover:underline text-base font-medium hover:text-[#E8EAEE] transition-colors">Ajuda</a>
                    <button className="bg-transparent text-foreground py-2 px-4 rounded-xl border border-foreground hover:bg-muted hover:text-[#E8EAEE] cursor-pointer">Login</button>
                </nav>
                <ThemeToggle isFixedColor={isScrolled} />
            </div>
        </header>
    )
}