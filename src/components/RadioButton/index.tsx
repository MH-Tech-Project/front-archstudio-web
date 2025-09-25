interface RadioButtonProps {
    label: string;
    value: string;
    name: string;
    checked: boolean;
    onChange: (value: string) => void;
    id?: string;
}

export default function RadioButton({ label, value, name, checked, onChange, id }: RadioButtonProps) {
    const handleChange = () => {
        onChange(value);
    };

    return (
        <div className="flex items-center gap-3">
            <div className="relative">
                <input
                    type="radio"
                    id={id}
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={handleChange}
                    className="sr-only"
                />
                <div
                    className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer
                        ${checked 
                            ? 'border-[#EFA339] bg-[#EFA339]' 
                            : 'border-[#34373D] bg-transparent hover:border-[#EFA339]'
                        }
                    `}
                >
                    {checked && (
                        <div className="w-4 h-4 bg-[#EFA339] border-2 border-[#34373D] rounded-full" />
                    )}
                </div>
            </div>
            <label 
                htmlFor={id}
                className="text-sm text-[#9FA3AD] cursor-pointer select-none font-light"
            >
                {label}
            </label>
        </div>
    );
}