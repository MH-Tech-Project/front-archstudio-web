import { useEffect } from "react";
import LoginPanel from "../../components/LoginPanel";
import ResetPasswordForm from "../../components/ResetPasswordForm";

export default function ResetPassword() {
    useEffect(() =>{
        window.document.title = "Solicitar email de recuperação | ArchStudio Pro";
    },[])

    return(
        <div className="relative grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
            <LoginPanel />

            <div className="flex justify-center items-center p-0 lg:p-8">
                <ResetPasswordForm />
            </div>
        </div>
    )   
}