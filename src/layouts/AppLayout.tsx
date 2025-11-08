import { Outlet } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";

export default function AppLayout() {
    return(
        <div className="min-h-screen flex flex-col">
            <AppHeader />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    )
}