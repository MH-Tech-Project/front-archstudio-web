import type { IconType } from 'react-icons'
import type { RedirectTo } from '../../routes';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface AppNavItemProps {
    label: string;
    icon: IconType;
    redirectTo: RedirectTo;
}

export function AppNavItem({ label, icon: Icon, redirectTo }: AppNavItemProps){
    const location = useLocation()
    
    const isActive = (path: string) => location.pathname === path;

    return(
        <Link 
            className={`bg-background px-4 py-4 rounded-lg flex gap-2 items-center justify-center cursor-pointer hover:bg-[#2A2D32] transition-colors ${isActive(redirectTo) ? 'bg-[#2A2D32]' : ''}`}
            to={redirectTo}
        >
            <Icon size={20} />
            <span>{label}</span>
        </Link>
    )
}