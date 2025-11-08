import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { useTypedNavigate } from "../../hooks/useTypedNavigation";
import { routes } from "../../routes";

export default function Dashboard() {
    const { logout } = useAuth();
    const { navigateTo } = useTypedNavigate()

    const handleLogout = () => {
        logout();
        navigateTo(routes.home);
    }

    return(
        <div className="flex-1 flex flex-col justify-center items-center w-full gap-8"> 
            <p>Dashboard</p>
            <Button variant="primary" size="lg" onClick={() => handleLogout()}>
                <p>Logout</p>
            </Button>
        </div>
    )
}