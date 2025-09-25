interface TitleProps {
  beforeMark?: string; // Texto antes da parte destacada
  markTitle: string;   // Parte destacada
  afterMark?: string;  // Texto depois da parte destacada
  className?: string; // Classes adicionais para customização
}

export default function Title({ beforeMark, markTitle, className }: TitleProps) {
  return (
    <h1 className={`font-bold flex flex-col gap-2 text-center ${className}`}>
      <span className="text-[#E8EAEE]">{beforeMark}</span>
      <span className="bg-gradient-to-r from-[#EFA339] to-[#F69855] bg-clip-text text-transparent">{markTitle}</span>
    </h1>
  );
}