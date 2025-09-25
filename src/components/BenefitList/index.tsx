import { FiCheck } from "react-icons/fi";

export default function BenefitList(){
    return(
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
    )
}