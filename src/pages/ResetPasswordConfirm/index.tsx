import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ResetPasswordConfirmForm from "../../components/ResetPasswordConfirmForm";

export default function ResetPasswordConfirm() {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        window.document.title = "Redefinir Senha | ArchStudio Pro";
        
        if (!token) {
            navigate('/reset-password');
            return;
        }
    }, [token, navigate]);

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <Header showButtonLogin={true} />
            <div className="w-full flex flex-col justify-center items-center mt-20 lg:mt-14 mb-10">
                <ResetPasswordConfirmForm token={token ?? ""} />
            </div>
        </div>
    );
}