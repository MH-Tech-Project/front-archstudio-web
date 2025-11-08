import { Outlet } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { Container } from "../components/Container";

export default function AppLayout() {
    return(
        <div className="min-h-screen flex flex-col">
            <AppHeader />
            <main className="flex-1">
                <Container>
                    <Outlet />
                </Container>
            </main>
        </div>
    )
}