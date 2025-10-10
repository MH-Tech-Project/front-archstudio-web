import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { FiMail } from "react-icons/fi";
import z from "zod";
import { resetPasswordEmailRequest } from "../../api/user.api";
import { useNavigate } from "react-router-dom";

const resetPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Email é obrigatório")
        .email("Email inválido"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;


export default function ResetPasswordForm(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [errors, setErrors] = useState<{
        email?: string;
        general?: string;
    }>({});

    const validateField = (field: keyof ResetPasswordFormData, value: string) => {
        try {
            if (field === 'email') {
                resetPasswordSchema.shape.email.parse(value);
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

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setErrors({});

        try {
            const validatedData = resetPasswordSchema.parse({ email });
            
            await resetPasswordEmailRequest(validatedData.email);
            
            setEmailSent(true);
            
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: { email?: string; general?: string } = {};
                error.issues.forEach((issue) => {
                    if (issue.path[0]) {
                        fieldErrors[issue.path[0] as keyof ResetPasswordFormData] = issue.message;
                    }
                });
                setErrors(fieldErrors);
            } else {
                setErrors({
                    general: error instanceof Error ? error.message : 'Erro ao enviar email',
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
        <div className="w-11/12 sm:w-4/5 xl:w-3/5 2xl:w-1/2 bg-background flex flex-col justify-center items-center px-4 py-6 gap-8 rounded-lg">
            <div className="flex justify-center items-center flex-col gap-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#EFA339] to-[#F69855] bg-clip-text text-transparent cursor-pointer" onClick={() => navigate('/')}>ArchStudio Pro</h1>
                <p className="text-base text-[#9FA3AD] font-normal text-center">
                    {emailSent ? 'Verifique seu email e clique no link para redefinir sua senha.' : 'Enviaremos um email com um link para redefinir sua senha.'}
                </p>
            </div>

            {!emailSent ? (
                <>
                    <div className="w-full flex flex-col gap-6">
                        {errors.general && (
                            <div className="w-full p-3 bg-[#B33F00]/10 border border-[#B33F00]/20 rounded-lg">
                                <p className="text-[#B33F00] text-sm">{errors.general}</p>
                            </div>
                        )}
            
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
                    </div>

                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <Button 
                            size="full" 
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            <p>{isSubmitting ? 'Enviando...' : 'Enviar email de recuperação'}</p>
                        </Button>
                    </div>
                </>
            ) : (
                <div className="w-full flex flex-col justify-center items-center gap-4">
                    <div className="w-full p-4 bg-green-100 border border-green-300 rounded-lg text-center">
                        <p className="text-green-800">Email enviado com sucesso!</p>
                    </div>
                </div>
            )}
        </div>
    )
}