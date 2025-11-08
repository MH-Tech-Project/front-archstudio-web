import type { RedirectTo } from "../../routes";
import { useTypedNavigate } from "../../hooks/useTypedNavigation";

interface LogoProps {
    fixedColor?: boolean
    redirectTo: RedirectTo
}

export default function Logo({fixedColor, redirectTo}: LogoProps) {
     const { navigateTo } = useTypedNavigate();

    return(
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo(redirectTo)}>
            <img src="/logo.svg" alt="" />
            <h1 className="text-xl font-bold text-foreground" style={{color: fixedColor ? '#E8EAEE' : undefined}}>ArchStudio Pro</h1>
        </div>
    )
}