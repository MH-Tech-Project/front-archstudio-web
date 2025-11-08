import { routes } from "../../routes";
import { AppNav } from "../AppNav";
import { Container } from "../Container";
import Logo from "../Logo";

export function AppHeader() {
    return(
        <header className="w-full h-20 bg-background border-b border-b-gray-900 flex items-center">
            <Container>
                <div className="flex items-center justify-between w-full">
                    <Logo  redirectTo={routes.dashboard}/>

                    <AppNav />
                </div>
            </Container>
        </header>
    )
}