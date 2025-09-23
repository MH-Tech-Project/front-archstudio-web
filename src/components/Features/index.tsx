export default function Features(){
    return(
        <div className="w-full flex flex-col justify-center items-center gap-8 md:gap-16 py-12 md:py-20 px-4 md:px-0">
            <div className="w-full md:max-w-1/3 flex flex-col gap-4 text-center">
                <h1 className="font-bold text-2xl md:text-4xl text-foreground">Ferramentas Profissionais</h1>
                <p className="text-sm md:text-base text-[#9FA3AD]">Tudo que você precisa para levar seus projetos de arquitetura e urbanismo ao próximo nível</p>
            </div>
            <div className="w-full md:max-w-4/5 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="p-4 md:p-4 flex flex-col justify-center items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#EFA339]/30 rounded-lg flex justify-center items-center"><img src="/src/assets/images/svg/icon-logo.svg" alt="" /></div>
                    <div className="flex flex-col justify-center items-center text-center gap-2 md:gap-4">
                        <h2 className="text-foreground text-lg md:text-xl font-semibold">Projetos CAD/BIM</h2>
                        <p className="font-medium text-sm md:text-base text-[#9FA3AD]">Integração completa com as principais ferramentas de desenho técnico do mercado</p>
                    </div>
                </div>
                 <div className="p-4 md:p-4 flex flex-col justify-center items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#EFA339]/30 rounded-lg flex justify-center items-center"><img src="/src/assets/images/svg/plan.svg" alt="" /></div>
                    <div className="flex flex-col justify-center items-center text-center gap-2 md:gap-4">
                        <h2 className="text-foreground text-lg md:text-xl font-semibold">Planejamento Urbano</h2>
                        <p className="font-medium text-sm md:text-base text-[#9FA3AD]" >Análise territorial avançada e ferramentas para desenvolvimento sustentável</p>
                    </div>
                </div>
                 <div className="p-4 md:p-4 flex flex-col justify-center items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#EFA339]/30 rounded-lg flex justify-center items-center"><img src="/src/assets/images/svg/static.svg" alt="" /></div>
                    <div className="flex flex-col justify-center items-center text-center gap-2 md:gap-4">
                        <h2 className="text-foreground text-lg md:text-xl font-semibold">Análise & Relatórios</h2>
                        <p className="font-medium text-sm md:text-base text-[#9FA3AD]">Métricas detalhadas de desempenho e estudos de viabilidade técnica</p>
                    </div>
                </div>
            </div>
        </div>
    )
}