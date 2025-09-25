import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface InputPasswordProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showStrengthIndicator?: boolean;
    icon?: React.ReactNode;
    label?: string;
}

export default function InputPassword(props: InputPasswordProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const getPasswordStrength = (password: string): number => {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        return Math.min(strength, 4);
    }

    const getStrengthColor = (strength: number): string => {
        switch (strength) {
            case 1:
            case 2:
                return 'bg-red-500';
            case 3:
                return 'bg-yellow-500';
            case 4:
                return 'bg-green-500';
            default:
                return 'bg-[#34373D]';
        }
    }

    return (
        <div className="w-full">
            <div className="w-full flex flex-col gap-2">
                <span className="text-sm font-medium text-foreground">{props.label}</span>
                <div className="w-full p-3 rounded-lg bg-background border border-[#34373D] text-foreground flex items-center gap-4">
                    {props.icon && <div>{props.icon}</div>}
                    <input 
                        type={showPassword ? "text" : "password"}
                        placeholder={props.placeholder || "Digite sua senha"}
                        value={props.value}
                        onChange={props.onChange}
                        className="flex-1 bg-transparent placeholder:text-[#34373D] focus:outline-none"
                    />
                    <button
                        disabled={!props.value}
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-[#34373D] hover:text-foreground transition-colors focus:outline-none"
                        aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                    >
                        {showPassword ? (
                            <AiOutlineEyeInvisible size={20} />
                        ) : (
                            <AiOutlineEye size={20} />
                        )}
                    </button>
                </div>
            </div>
            
            {props.showStrengthIndicator && props.value && (
                <div className="mt-2">
                    <div className="text-xs text-[#34373D] mb-1">Força da senha:</div>
                    <div className="flex gap-1">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className={`h-1 flex-1 rounded-full ${
                                    index < getPasswordStrength(props.value || '')
                                        ? getStrengthColor(getPasswordStrength(props.value || ''))
                                        : 'bg-[#34373D]'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
