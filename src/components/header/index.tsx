import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
    return(
        <header className="w-full flex justify-around items-center mb-8 gap-52 py-4 bg-card/60 backdrop-blur-lg border-b border-gray-900">
            <Logo />
            <div className="flex items-center gap-16">
                <nav className="hidden md:flex items-center gap-8 text-foreground">
                    <a href="#" className="hover:underline text-base font-medium hover:text-primary transition-colors">Planos</a>
                    <a href="#" className="hover:underline text-base font-medium hover:text-primary transition-colors">Sobre Nós</a>
                    <a href="#" className="hover:underline text-base font-medium hover:text-primary transition-colors">Ajuda</a>
                    <button className="bg-background text-foreground py-2 px-4 rounded-xl border border-border hover:bg-muted transition-colors">Login</button>
                </nav>
                <ThemeToggle />
            </div>
        </header>
    )
}