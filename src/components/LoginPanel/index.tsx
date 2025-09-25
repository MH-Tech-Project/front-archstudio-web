import BenefitList from "../BenefitList";
import Title from "../Title";

export default function LoginPanel(){
    return(
        <div 
            className="hidden lg:flex bg-cover bg-center bg-no-repeat flex-col justify-center items-start px-8 xl:px-28 gap-8 contrast-105 brightness-110"
            style={{backgroundImage: "url('/src/assets/images/svg/logo-rectangle.svg')"}}
        >
            <Title
                beforeMark="Projeto o"
                markTitle="futuro urbano"
                className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl text-left"
            />

            <p className="max-w-xl text-xl text-[#9FA3AD] font-normal leading-10">Ferramentas profissionais para arquitetos e urbanistas. Gerencie projetos, colabore com equipes e transforme ideias em realidade.</p>

            <div className="w-full md:max-w-4/5 flex flex-col justify-center items-start gap-6 md:gap-8">
                <div className="flex justify-center items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#EFA339]/30 rounded-lg flex justify-center items-center"><img src="/src/assets/images/svg/icon-logo.svg" alt="" /></div>
                    <div className="flex flex-col justify-center items-start text-left">
                        <h2 className="text-foreground text-lg md:text-xl font-semibold">Projetos CAD/BIM</h2>
                        <p className="font-medium text-sm md:text-base text-[#9FA3AD]">Integração completa com ferramentas de desenho</p>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#EFA339]/30 rounded-lg flex justify-center items-center"><img src="/src/assets/images/svg/plan.svg" alt="" /></div>
                    <div className="flex flex-col justify-center items-start text-left">
                        <h2 className="text-foreground text-lg md:text-xl font-semibold">Planejamento Urbano</h2>
                        <p className="font-medium text-sm md:text-base text-[#9FA3AD]" >Análise territorial e desenvolvimento sustentável</p>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#EFA339]/30 rounded-lg flex justify-center items-center"><img src="/src/assets/images/svg/static.svg" alt="" /></div>
                    <div className="flex flex-col justify-center items-start text-left">
                        <h2 className="text-foreground text-lg md:text-xl font-semibold">Análise & Relatórios</h2>
                        <p className="font-medium text-sm md:text-base text-[#9FA3AD]">Métricas de desempenho e viabilidade</p>
                    </div>
                </div>
            </div>

            <BenefitList />
        </div>
    )
}