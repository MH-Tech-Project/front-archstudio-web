import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';

interface CheckboxProps {
    label?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    id?: string;
}

export default function Checkbox({ label, checked = false, onChange, id }: CheckboxProps) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleToggle = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onChange?.(newChecked);
    };

    return (
        <div className="flex items-center gap-3">
            <div className="relative">
                <input
                    type="checkbox"
                    id={id}
                    checked={isChecked}
                    onChange={handleToggle}
                    className="sr-only"
                />
                <div
                    className={`
                        w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-all duration-200 cursor-pointer
                        ${isChecked 
                            ? 'bg-[#EFA339] border-[#EFA339]' 
                            : 'bg-transparent border-[#34373D] hover:border-[#EFA339]'
                        }
                    `}
                >
                    {isChecked && (
                        <FiCheck 
                            size={14} 
                            className="text-white stroke-2" 
                        />
                    )}
                </div>
            </div>
            {label && (
                <label 
                    htmlFor={id}
                    className="text-sm text-[#9FA3AD] cursor-pointer select-none font-light"
                >
                    {label}
                </label>
            )}
        </div>
    );
}