import { useState } from "react";
import { FiMail, FiUser, FiPhone } from "react-icons/fi";
import InputPassword from "../InputPassword";
import Checkbox from "../Checkbox";
import Input from "../Input";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { createAccount } from "../../api/user.api";

const signupSchema = z.object({
    name: z
        .string()
        .min(2, "Nome deve ter pelo menos 2 caracteres")
        .max(50, "Nome deve ter no máximo 50 caracteres"),
    email: z
        .string()
        .min(1, "Email é obrigatório")
        .email("Email inválido"),
    phone: z
        .string()
        .min(10, "Telefone deve ter pelo menos 10 dígitos")
        .max(15, "Telefone deve ter no máximo 15 dígitos"),
    password: z
        .string()
        .min(8, "Senha deve ter pelo menos 8 caracteres")
        .regex(/[A-Z]/, "Senha deve ter pelo menos uma letra maiúscula")
        .regex(/[a-z]/, "Senha deve ter pelo menos uma letra minúscula")
        .regex(/[0-9]/, "Senha deve ter pelo menos um número"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine(val => val === true, {
        message: "Você deve aceitar os termos de uso"
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"]
});

type SignupFormData = z.infer<typeof signupSchema>;

interface Plan {
    name: string;
    description: string;
    price: number;
    benefits: string[];
    recommended: boolean;
    type: 'individual' | 'business';
}

interface SignupFormProps {
    selectedPlan: Plan | null;
    onBack?: () => void;
}

export default function SignupForm({ selectedPlan, onBack }: SignupFormProps) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        phone?: string;
        password?: string;
        confirmPassword?: string;
        acceptTerms?: string;
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = (field: keyof SignupFormData, value: string | boolean) => {
        try {
            if (field === 'name') {
                signupSchema.shape.name.parse(value);
            } else if (field === 'email') {
                signupSchema.shape.email.parse(value);
            } else if (field === 'phone') {
                signupSchema.shape.phone.parse(value);
            } else if (field === 'password') {
                signupSchema.shape.password.parse(value);
            } else if (field === 'confirmPassword') {
                // Valida se as senhas coincidem
                const formData = { 
                    name, email, phone, password, 
                    confirmPassword: value as string, 
                    acceptTerms 
                };
                signupSchema.parse(formData);
            } else if (field === 'acceptTerms') {
                signupSchema.shape.acceptTerms.parse(value);
            }
            
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

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        if (errors.name || isSubmitting) {
            validateField('name', value);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (errors.email || isSubmitting) {
            validateField('email', value);
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove não dígitos
        setPhone(value);
        if (errors.phone || isSubmitting) {
            validateField('phone', value);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        if (errors.password || isSubmitting) {
            validateField('password', value);
        }
        // Se confirmar senha já foi preenchido, valida novamente
        if (confirmPassword && (errors.confirmPassword || isSubmitting)) {
            validateField('confirmPassword', confirmPassword);
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (errors.confirmPassword || isSubmitting) {
            validateField('confirmPassword', value);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        
        try {
            const formData = { name, email, phone, password, confirmPassword, acceptTerms };
            const validatedData = signupSchema.parse(formData);
            setErrors({});
            
       
            const response = await createAccount({
                email: validatedData.email,
                name: validatedData.name,
                password: validatedData.password,
                roleId: 1
            })

            if(response && response.user){
                navigate('/login');
            }
            
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.issues.forEach((issue) => {
                    if (issue.path[0]) {
                        fieldErrors[issue.path[0] as string] = issue.message;
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

    const formatPhone = (value: string) => {
        // Formatar telefone: (11) 99999-9999
        if (value.length <= 10) {
            return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    return (
        <div className="w-full md:w-3/4 lg:w-2/5 bg-background flex flex-col justify-center items-center px-4 gap-8 rounded-lg">
           
            <div className="w-full p-4 border border-[#34373D] rounded-lg bg-background-contrast">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-foreground font-semibold">{selectedPlan ? selectedPlan.name : 'Plano Gratuito'}</h3>
                        <p className="text-[#9FA3AD] text-sm">{selectedPlan ? (selectedPlan.type === 'individual' ? 'Individual' : 'Empresarial') : ''}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-foreground font-bold">R$ {selectedPlan ? selectedPlan.price.toFixed(0) : 0}/mês</p>
                        <button 
                            onClick={onBack}
                            className="text-[#EFA339] text-sm underline hover:no-underline cursor-pointer"
                        >
                            Alterar plano
                        </button>
                    </div>
                </div>
            </div>
              

            {/* Formulário */}
            <div className="w-full flex flex-col gap-6 border border-[#34373D] bg-background-contrast px-4 sm:px-6 py-4 rounded-lg">

                <div className="flex justify-center items-center flex-col gap-2">
                    <h1 className="text-3xl font-bold text-foreground text-center">
                        Seus dados pessoais
                    </h1>
                    <p className="text-base text-[#9FA3AD] font-normal text-center">
                        Complete seu cadastro para o plano {selectedPlan ? selectedPlan.name : 'Plano Gratuito'}
                    </p>
                </div>

                <div className="w-full">
                    <Input
                        label="Nome completo"
                        type="text"
                        placeholder="Seu nome completo"
                        value={name}
                        onChange={handleNameChange}
                        icon={<FiUser color="#9FA3AD" size={18}/>}
                    />
                    {errors.name && (
                        <p className="text-[#B33F00] text-sm mt-2">{errors.name}</p>
                    )}
                </div>

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
                    <Input
                        label="Telefone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formatPhone(phone)}
                        onChange={handlePhoneChange}
                        propsInput={{ maxLength: 15 }}
                        icon={<FiPhone color="#9FA3AD" size={18}/>}
                    />
                    {errors.phone && (
                        <p className="text-[#B33F00] text-sm mt-2">{errors.phone}</p>
                    )}
                </div>

                <div className="w-full">
                    <InputPassword 
                        label="Senha"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="••••••••"
                        showStrengthIndicator={true}
                    />
                    {errors.password && (
                        <p className="text-[#B33F00] text-sm mt-2">{errors.password}</p>
                    )}
                </div>

                <div className="w-full">
                    <InputPassword 
                        label="Confirmar senha"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="••••••••"
                        showStrengthIndicator={false}
                    />
                    {errors.confirmPassword && (
                        <p className="text-[#B33F00] text-sm mt-2">{errors.confirmPassword}</p>
                    )}
                </div>
                
                <div className="flex flex-col gap-3">
                    <Checkbox 
                        label="Aceito os termos de uso e política de privacidade"
                        checked={acceptTerms}
                        onChange={setAcceptTerms}
                        id="accept-terms"
                    />
                    {errors.acceptTerms && (
                        <p className="text-[#B33F00] text-sm">{errors.acceptTerms}</p>
                    )}
                </div>
            </div>

            {/* Botões */}
            <div className="w-full flex flex-col justify-center items-center gap-4">
                <div className="w-full flex gap-4">
                    <Button 
                        variant="secondary"
                        size="full"
                        onClick={onBack}
                        disabled={isSubmitting}
                    >
                        <p>Voltar</p>
                    </Button>
                    
                    <Button 
                        size="full" 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        <p>{isSubmitting ? 'Criando conta...' : 'Cadastrar'}</p>
                    </Button>
                </div>

                <p className="text-sm text-[#9FA3AD]">
                    Já tem uma conta? 
                    <span 
                        className="text-[#EFA339] underline cursor-pointer ml-1" 
                        onClick={() => navigate('/login')}
                    >
                        Faça login
                    </span>
                </p>
            </div>
        </div>
    );
}