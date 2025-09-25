import { useState } from "react";
import { FiMail } from "react-icons/fi";
import InputPassword from "../InputPassword";
import Checkbox from "../Checkbox";
import Input from "../Input";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

export default function LoginForm(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    return(
        <div className="w-11/12 sm:w-4/5 xl:w-3/5 2xl:w-1/2 bg-background flex flex-col justify-center items-center px-4 py-6 gap-8 rounded-lg">
            <div className="flex justify-center items-center flex-col gap-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#EFA339] to-[#F69855] bg-clip-text text-transparent cursor-pointer" onClick={() => navigate(-1)}>ArchStudio Pro</h1>
                <p className="text-base text-[#9FA3AD] font-normal text-center">Plataforma profissional para arquitetos e urbanistas</p>
            </div>

            <div className="w-full flex flex-col gap-6">
                <Input
                    label="Email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<FiMail color="#9FA3AD" size={18}/>}
                />

                <InputPassword 
                    label="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    showStrengthIndicator={false}
                    icon={<FiMail color="#9FA3AD" size={18}/>}
                />
                <div className="flex justify-between items-center">
                    <Checkbox 
                        label="Lembrar de mim"
                        checked={rememberMe}
                        onChange={setRememberMe}
                        id="remember-me"
                    />

                    <p className="text-sm font-light text-[#EFA339] underline cursor-pointer">Esqueceu a senha?</p>
                </div>
            </div>

            <div className="w-full flex flex-col justify-center items-center gap-4">
                <Button size="full">
                    <p>Entrar na conta</p>
                </Button>

                <p className=" text-sm text-[#9FA3AD]">Não tem uma conta? <span className="text-[#EFA339] underline cursor-pointer">Cadastre-se gratuitamente</span></p>
            </div>
        </div>
    )
}