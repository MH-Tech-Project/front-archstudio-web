import Button from "../Button";
import Title from "../Title";
import { FiCheck } from "react-icons/fi";

export default function Hero(){


    return(
        <div 
            className="relative h-[75vh] bg-cover bg-center bg-no-repeat brightness-90 contrast-110 flex justify-center items-center" 
            style={{backgroundImage: "url('/src/assets/images/svg/landingpage-background.svg')"}}
        >
            <div className="w-full mx-auto relative z-50 flex flex-col items-center gap-6 mt-20">
                <Title 
                    fontSize="text-7xl"
                    beforeMark="Projete com"
                    markTitle="Excelência"
                />
                <div className="max-w-3xl text-center text-[#9FA3AD]">
                    <p className="text-xl">A plataforma completa para arquitetos e urbanistas. Gerencie projetos, colabore com equipes e transforme suas ideias em realidade.</p>
                </div>
                <div className="flex gap-4 mt-4">
                    <Button size="md" variant="primary"><p>Começar Gratuitamente</p></Button>
                    <Button size="md" variant="secondary"><p>Saiba Mais</p></Button>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
                    <div className="flex items-center gap-2">
                        <FiCheck size={20} color="#EFA339"/>
                        <p className="text-[#9FA3AD] font-medium text-sm">Teste grátis 30 dias</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiCheck size={20} color="#EFA339"/>
                        <p className="text-[#9FA3AD] font-medium text-sm"><span></span> Sem compromisso</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiCheck size={20} color="#EFA339"/>
                        <p className="text-[#9FA3AD] font-medium text-sm"><span></span> Suporte especializado</p>
                    </div>
                </div>
            </div>
        </div>
    )
}