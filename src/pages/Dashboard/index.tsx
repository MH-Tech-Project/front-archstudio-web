import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return(
        <div className="flex flex-col justify-center items-center h-screen w-full gap-8"> 
            <p>Dashboard</p>
            <Button variant="primary" size="lg" onClick={() => handleLogout()}>
                <p>Logout</p>
            </Button>
        </div>
    )
}