import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
    return(
        <header className="w-full flex justify-around items-center mb-8 gap-52 py-4 bg-card/60 backdrop-blur-lg border-b border-[#34373D] fixed top-0 z-999">
            <Logo />
            <div className="flex items-center gap-16">
                <nav className="hidden md:flex items-center gap-8 text-[#9FA3AD]">
                    <a href="#Plan" className="hover:underline text-base font-medium hover:text-[#E8EAEE] transition-colors">Planos</a>
                    <a href="#About" className="hover:underline text-base font-medium hover:text-[#E8EAEE] transition-colors">Sobre Nós</a>
                    <a href="#Help" className="hover:underline text-base font-medium hover:text-[#E8EAEE] transition-colors">Ajuda</a>
                    <button className="bg-black text-foreground py-2 px-4 rounded-xl border border-black hover:bg-muted hover:text-[#E8EAEE] cursor-pointer">Login</button>
                </nav>
                <ThemeToggle />
            </div>
        </header>
    )
}