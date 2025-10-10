import { useState } from "react";
import { z } from "zod";
import InputPassword from "../InputPassword";
import Button from "../Button";
import { resetPasswordRequest } from "../../api/user.api";
import { useNavigate } from "react-router-dom";

const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, "Senha deve ter pelo menos 8 caracteres")
        .regex(/[A-Z]/, "Senha deve ter pelo menos uma letra maiúscula")
        .regex(/[a-z]/, "Senha deve ter pelo menos uma letra minúscula")
        .regex(/[0-9]/, "Senha deve ter pelo menos um número"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordConfirmFormProps {
    token: string;
}

export default function ResetPasswordConfirmForm({ token }: ResetPasswordConfirmFormProps) {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{
        password?: string;
        confirmPassword?: string;
        general?: string;
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = (field: keyof ResetPasswordFormData, value: string) => {
        try {
            if (field === 'password') {
                resetPasswordSchema.shape.password.parse(value);
            } else if (field === 'confirmPassword') {
                resetPasswordSchema.parse({ password, confirmPassword: value });
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

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        if (errors.password || isSubmitting) {
            validateField('password', value);
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
        setErrors({});
        if(!token) return;
        try {
            const validatedData = resetPasswordSchema.parse({ password, confirmPassword });
            
            await resetPasswordRequest({
                token,
                newPassword: validatedData.password
            });

            navigate('/login');
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: { password?: string; confirmPassword?: string; general?: string } = {};
                error.issues.forEach((issue) => {
                    if (issue.path[0]) {
                        fieldErrors[issue.path[0] as keyof ResetPasswordFormData] = issue.message;
                    }
                });
                setErrors(fieldErrors);
            } else {
                setErrors({
                    general: error instanceof Error ? error.message : 'Erro ao redefinir senha',
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-11/12 sm:w-4/5 xl:w-3/5 2xl:w-2/5 bg-background flex flex-col justify-center items-center px-4 py-6 gap-8 rounded-lg">
            <div className="flex justify-center items-center flex-col gap-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#EFA339] to-[#F69855] bg-clip-text text-transparent" onClick={() => navigate('/')}>ArchStudio Pro</h1>
                <p className="text-base text-[#9FA3AD] font-normal text-center">Defina uma nova senha para sua conta</p>
            </div>

            <div className="w-full flex flex-col gap-6">
                {errors.general && (
                    <div className="w-full p-3 bg-[#B33F00]/10 border border-[#B33F00]/20 rounded-lg">
                        <p className="text-[#B33F00] text-sm">{errors.general}</p>
                    </div>
                )}

                <div className="w-full">
                    <InputPassword 
                        label="Nova Senha"
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
                        label="Confirmar Nova Senha"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="••••••••"
                        showStrengthIndicator={false}
                    />
                    {errors.confirmPassword && (
                        <p className="text-[#B33F00] text-sm mt-2">{errors.confirmPassword}</p>
                    )}
                </div>
            </div>

            <div className="w-full flex flex-col justify-center items-center gap-4">
                <Button 
                    size="full" 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    <p>{isSubmitting ? 'Redefinindo...' : 'Redefinir Senha'}</p>
                </Button>
            </div>
        </div>
    );
}