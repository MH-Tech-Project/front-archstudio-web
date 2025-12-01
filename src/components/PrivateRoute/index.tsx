import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { routes } from "../../routes";

interface PrivateRouteProps {
    children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EFA339] mx-auto"></div>
                    <p className="mt-4 text-[#9FA3AD]">Carregando...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to={routes.login} replace />;
    }

    return <>{children}</>;
}
