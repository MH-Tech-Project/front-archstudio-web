import Button from "../Button";
import Title from "../Title";
import BenefitList from "../BenefitList";

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
                            className="text-4xl sm:text-3xl md:text-4xl lg:text-7xl"
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

                    <BenefitList/>
                </div>
            </div>
        </section>
    )
}