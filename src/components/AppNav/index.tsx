import { MdOutlineDashboard , MdAssessment, MdOutlineCalendarToday, MdManageAccounts  } from "react-icons/md";

import { AppNavItem } from "../AppNavItem";
import { routes } from "../../routes";

export function AppNav(){
    return(
        <nav className="flex items-center justify-between gap-4">
            <AppNavItem label="Dashboard" icon={MdOutlineDashboard} redirectTo={routes.dashboard} />
            <AppNavItem label="Projetos" icon={MdAssessment} redirectTo={routes.project} />
            <AppNavItem label="Reuniões" icon={MdOutlineCalendarToday} redirectTo={routes.meetings} />
            <AppNavItem label="Configurações" icon={MdManageAccounts } redirectTo={routes.settings} />
        </nav>
    )
}