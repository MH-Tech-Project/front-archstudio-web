import { useEffect } from "react";
import LoginForm from "../../components/LoginForm";
import LoginPanel from "../../components/LoginPanel";

export default function Login() {

    useEffect(() =>{
        window.document.title = "Login | ArchStudio Pro";
    },[])

    return(
        <div className="relative grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
            <LoginPanel />

            <div className="flex justify-center items-center p-0 lg:p-8">
                <LoginForm />
            </div>
        </div>
    )
}