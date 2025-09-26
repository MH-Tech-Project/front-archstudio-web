import { useState } from "react";
import { FiMail } from "react-icons/fi";
import InputPassword from "../InputPassword";
import Checkbox from "../Checkbox";
import Input from "../Input";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email é obrigatório")
        .email("Email inválido"),
    password: z
        .string()
        .min(1, "Senha é obrigatória")
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = (field: keyof LoginFormData, value: string) => {
        try {
            if (field === 'email') {
                loginSchema.shape.email.parse(value);
            } else if (field === 'password') {
                loginSchema.shape.password.parse(value);
            }
            
            // Remove erro se validação passou
            setErrors(prev => ({ ...prev, [field]: undefined }));
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors(prev => ({ 
                    ...prev, 
                    [field]: error.issues[0].message 
                }));
            }
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (errors.email || isSubmitting) {
            validateField('email', value);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        if (errors.password || isSubmitting) {
            validateField('password', value);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        
        try {
            const validatedData = loginSchema.parse({ email, password });
            setErrors({});
            
            console.log('Tentativa de login para:', validatedData.email);
            
            // Simula delay da API
            await new Promise(resolve => setTimeout(resolve, 1000));
            const loginSuccess = false; 

            if (loginSuccess) {
                // Login bem-sucedido
                // navigate('/dashboard');
                console.log('Login realizado com sucesso!');
            } else {
                // Login falhou - mensagem genérica por segurança
                setErrors({
                    email: "Email ou senha incorretos",
                });
            }
            
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: { email?: string; password?: string } = {};
                error.issues.forEach((issue) => {
                    if (issue.path[0]) {
                        fieldErrors[issue.path[0] as keyof LoginFormData] = issue.message;
                    }
                });
                setErrors(fieldErrors);
            } else {
                setErrors({
                    email: "Erro interno. Tente novamente mais tarde.",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
        <div className="w-11/12 sm:w-4/5 xl:w-3/5 2xl:w-1/2 bg-background flex flex-col justify-center items-center px-4 py-6 gap-8 rounded-lg">
            <div className="flex justify-center items-center flex-col gap-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#EFA339] to-[#F69855] bg-clip-text text-transparent cursor-pointer" onClick={() => navigate(-1)}>ArchStudio Pro</h1>
                <p className="text-base text-[#9FA3AD] font-normal text-center">Plataforma profissional para arquitetos e urbanistas</p>
            </div>

            {/* 
                - Rate limiting deve ser implementado no backend
            */}
            <div className="w-full flex flex-col gap-6">
                <div className="w-full">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={handleEmailChange}
                        icon={<FiMail color="#9FA3AD" size={18}/>}
                    />
                    {errors.email && (
                        <p className="text-[#B33F00] text-sm mt-2">{errors.email}</p>
                    )}
                </div>

                <div className="w-full">
                    <InputPassword 
                        label="Senha"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="••••••••"
                        showStrengthIndicator={false}
                        icon={<FiMail color="#9FA3AD" size={18}/>}
                    />
                    {errors.password && (
                        <p className="text-[#B33F00] text-sm mt-2">{errors.password}</p>
                    )}
                </div>
                
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
                <Button 
                    size="full" 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    <p>Entrar na conta</p>
                </Button>

                <p className=" text-sm text-[#9FA3AD]">Não tem uma conta? <span className="text-[#EFA339] underline cursor-pointer" onClick={() => navigate('/signup')}>Cadastre-se gratuitamente</span></p>
            </div>
        </div>
    )
}