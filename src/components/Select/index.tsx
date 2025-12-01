import { useState, useRef, useEffect } from 'react';
import type { IconType } from 'react-icons';
import { MdArrowDropDown, MdCheck } from 'react-icons/md';

export interface SelectOption<T = string> {
    label: string;
    value: T;
}

interface SelectProps<T = string> {
    icon?: IconType;
    options: Array<SelectOption<T>>;
    placeholder?: string;
    label?: string;
    onChange?: (value: T) => void;
    value?: T;
    disabled?: boolean;
    error?: string;
}

export function Select<T = string>({ 
    icon: Icon, 
    options, 
    placeholder = "Selecione uma opção", 
    label,
    onChange, 
    value,
    disabled = false,
    error
}: SelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === value);
    const displayText = selectedOption ? selectedOption.label : placeholder;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = (optionValue: T) => {
        onChange?.(optionValue);
        setIsOpen(false);
    };

    return (
        <div className="w-full flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium text-foreground">
                    {label}
                </label>
            )}
            
            <div className="relative w-full" ref={selectRef}>
                {/* Select Trigger */}
                <button
                    type="button"
                    onClick={handleToggle}
                    disabled={disabled}
                    className={`
                        w-full flex items-center gap-2 justify-between rounded-lg 
                        bg-background border text-foreground px-2 py-3
                        transition-all duration-200
                        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-[#EFA339]/50'}
                        ${error ? 'border-[#B33F00]' : 'border-[#34373D]'}
                        ${isOpen ? 'border-[#EFA339]' : ''}
                    `}
                >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        {Icon && (
                            <Icon size={18} className="text-[#9FA3AD] flex-shrink-0" />
                        )}
                        <span className={`text-sm font-medium truncate ${!selectedOption ? 'text-[#9FA3AD]' : ''}`}>
                            {displayText}
                        </span>
                    </div>
                    
                    <MdArrowDropDown 
                        size={20} 
                        className={`text-[#9FA3AD] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {/* Dropdown Options */}
                {isOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-background border border-[#34373D] rounded-lg shadow-lg overflow-hidden">
                        <div className="max-h-60 overflow-y-auto">
                            {options.map((option, index) => {
                                const isSelected = option.value === value;
                                
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleSelect(option.value)}
                                        className={`
                                            w-full flex items-center gap-3 px-4 py-3 text-left
                                            transition-all duration-150
                                            ${isSelected 
                                                ? 'bg-[#34373D]/50 text-foreground' 
                                                : 'hover:bg-[#34373D]/30 text-foreground'
                                            }
                                        `}
                                    >
                                        <div className="w-5 flex-shrink-0 flex items-center justify-center">
                                            {isSelected && (
                                                <MdCheck size={20} className="text-[#EFA339]" />
                                            )}
                                        </div>
                                        <span className="text-sm font-medium truncate">
                                            {option.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <p className="text-[#B33F00] text-sm">{error}</p>
            )}
        </div>
    );
}