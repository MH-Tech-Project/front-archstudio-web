interface InputProps {
    type?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    propsInput?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function Input(props: InputProps){
    return(
        <div className="w-full flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">{props.label}</span>
            <div className="w-full p-3 rounded-lg bg-[#121417] border border-[#34373D] text-foreground flex items-center gap-4">
                {props.icon && <div>{props.icon}</div>}
                <input 
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    className=" w-full placeholder:text-[#34373D] focus:outline-none"
                    {...props.propsInput}
                />
            </div>
        </div>
    )
}