interface TextareaProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    label?: string;
    rows?: number;
    maxLength?: number;
    disabled?: boolean;
    error?: string;
    propsTextarea?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export default function Textarea({
    placeholder,
    value,
    onChange,
    label,
    rows = 4,
    maxLength,
    disabled = false,
    error,
    propsTextarea
}: TextareaProps) {
    const currentLength = value?.length || 0;
    const showCounter = maxLength !== undefined;

    return (
        <div className="w-full flex flex-col gap-2">
            {label && (
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{label}</span>
                    {showCounter && (
                        <span className="text-xs text-[#9FA3AD]">
                            {currentLength}/{maxLength}
                        </span>
                    )}
                </div>
            )}
            
            <div className={`
                w-full rounded-lg bg-[#121417] border text-foreground
                ${error ? 'border-[#B33F00]' : 'border-[#34373D]'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}>
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    rows={rows}
                    maxLength={maxLength}
                    disabled={disabled}
                    className="w-full bg-transparent px-4 py-3 placeholder:text-[#34373D] focus:outline-none resize-none"
                    {...propsTextarea}
                />
            </div>

            {error && (
                <p className="text-[#B33F00] text-sm">{error}</p>
            )}
        </div>
    );
}
