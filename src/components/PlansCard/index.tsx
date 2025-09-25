import { FiCheck } from "react-icons/fi"
import Button from "../Button"

interface PlansCardProps{
    name: string
    description: string
    price: number
    benefits: string[]
    recommended?: boolean
}

export default function PlansCard({ name, description, price, benefits, recommended }: PlansCardProps){
    return(
        <div className={`relative h-full px-6 py-8 border rounded-lg flex flex-col gap-6 ${recommended ? 'border-[#EFA339]' : 'border-[#34373D]'}`}>
            {
                recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="text-xs text-[#121417] bg-[#EFA339] font-bold rounded-full px-3 py-1 whitespace-nowrap">
                            Mais Popular
                        </span>
                    </div>
                )
            }
            
            {/* Header do card - altura fixa */}
            <div className={`${recommended ? 'mt-2' : ''} flex flex-col justify-center items-center gap-2 min-h-[120px]`}>
                <h2 className="text-2xl text-foreground font-bold text-center">{name}</h2>
                <p className="text-sm text-[#9FA3AD] font-light text-center">{description}</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl text-foreground font-bold">R$ {Number(price).toFixed(0)}</span>
                    <span className="text-sm text-[#9FA3AD]">/mês</span>
                </div>
            </div>

            {/* Benefícios - altura flexível */}
            <div className="flex-1 flex flex-col gap-3">
                {
                    benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <FiCheck size={18} color="#EFA339" className="mt-0.5 flex-shrink-0"/>
                            <p className="text-sm text-foreground font-light leading-relaxed">{benefit}</p>
                        </div>
                    ))
                }
            </div>

            <div className="mt-4">
                <Button 
                    variant={recommended ? "primary" : "secondary"}
                    size="full"
                >
                    <p>Começar agora</p>
                </Button>
            </div>
        </div>
    )
}