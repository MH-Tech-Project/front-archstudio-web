import { FiCheck } from "react-icons/fi";
import Button from "../Button";
import Title from "../Title";

export default function Hero(){
    return(
        <section className="relative overflow-hidden bg-gradient-hero min-h-[90vh] flex items-center">
            <div className="absolute inset-0 blueprint-grid opacity-40" />
            <img
                src="/src/assets/images/svg/landingpage-background.svg"
                alt="ArchStudio Pro - Plataforma para arquitetos e urbanistas"
                className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/30 to-background/70" />
            
            <div className="relative z-10 container mx-auto px-4 py-24 lg:py-32">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="space-y-4 animate-fade-in">
                        <Title 
                            fontSize="text-7xl"
                            beforeMark="Projete com"
                            markTitle="Excelência"
                        />
                        <p className="text-lg md:text-xl lg:text-2xl text-[#E8EAEE] max-w-3xl mx-auto leading-relaxed">
                            A plataforma completa para arquitetos e urbanistas. 
                            Gerencie projetos, colabore com equipes e transforme suas ideias em realidade.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in">
                        <Button size="lg" variant="primary">
                            <p>Começar Gratuitamente</p>
                        </Button>
                        <Button size="lg" variant="secondary">
                            <p>Saiba Mais</p>
                        </Button>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
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
        </section>
    )
}