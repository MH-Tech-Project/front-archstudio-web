interface TitleProps {
  fontSize: string;
  beforeMark?: string; // Texto antes da parte destacada
  markTitle: string;   // Parte destacada
  afterMark?: string;  // Texto depois da parte destacada
}

export default function Title({ fontSize, beforeMark, markTitle }: TitleProps) {
  return (
    <h1 className={`font-bold text-4xl sm:text-3xl md:text-4xl lg:${fontSize} flex flex-col gap-2 text-center`}>
      <span className="text-[#E8EAEE]">{beforeMark}</span>
      <span className="bg-gradient-to-r from-[#EFA339] to-[#F69855] bg-clip-text text-transparent">{markTitle}</span>
    </h1>
  );
}