interface ButtonProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ 
  children, 
  size = 'md', 
  variant = 'primary', 
  onClick, 
  disabled = false,
  type = 'button'
}: ButtonProps) {
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-4 py-3 text-sm md:px-8 md:py-4 md:text-lg',
    full: '!w-full px-6 py-3 text-base'
  };
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#EFA339] to-[#F69855] text-[#121417] hover:from-[#D4A853] hover:to-[#E8925A] transition-all duration-300',
    secondary: 'bg-[#34373D] text-[#E8EAEE] hover:bg-[#3D4147] transition-all duration-300'
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizes[size]}
        ${variants[variant]}
        font-medium
        rounded-xl
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-[#EFA339]
        disabled:opacity-50
        disabled:cursor-not-allowed
        shadow-lg
        hover:shadow-xl
        transform
        hover:scale-101
        active:scale-95
        transition-all
        duration-200
        cursor-pointer
      `}
    >
      {children}
    </button>
  );
}