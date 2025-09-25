import RadioButton from "../RadioButton";
import { useState } from "react";
import PlansCard from "../PlansCard";

type PlanType = 'individual' | 'business';

export default function PlansSelector(){
    const [selectedPlanType, setSelectedPlanType] = useState<PlanType>('individual');

    const plansIndividual = [
        {
            name: "Básico",
            description: "Para quem está começando",
            price: 29.90,
            benefits: [
                "Até 5 projetos simultâneos", 
                "Biblioteca básica de objetos", 
                "Exportação em PDF", 
                "Suporte por email"
            ],
            recommended: false
        },
        {
            name: "Standard",
            description: "Para profissionais estabelecidos",
            price: 59,
            benefits: [
                "Projetos ilimitados", 
                "Biblioteca completa de objetos", 
                "Exportação em múltiplos formatos", 
                "Suporte prioritário",
                "Renderização 3D básica"
            ],
            recommended: true
        },
        {
            name: "Premium",
            description: "Para escritórios de alta performance",
            price: 99,
            benefits: [
                "Todos os recursos do Standard", 
                "Renderização 3D avançada", 
                "Colaboração em tempo real", 
                "API personalizada",
                "Suporte 24/7"
            ],
            recommended: false
        }
    ];

    const plansBusiness = [
        {
            name: "Team",
            description: "Para equipes pequenas",
            price: 149,
            benefits: [
                "Até 10 usuários", 
                "Gestão de projetos avançada", 
                "Controle de versões", 
                "Relatórios personalizados"
            ],
            recommended: false
        },
        {
            name: "Enterprise",
            description: "Para grandes escritórios",
            price: 299,
            benefits: [
                "Usuários ilimitados", 
                "Integração com sistemas ERP", 
                "Dashboard executivo", 
                "Treinamento personalizado",
                "Gerente de conta dedicado"
            ],
            recommended: true
        },
        {
            name: "Custom",
            description: "Soluções sob medida",
            price: 499,
            benefits: [
                "Desenvolvimento personalizado", 
                "Integração completa", 
                "Suporte técnico dedicado", 
                "SLA garantido"
            ],
            recommended: false
        }
    ];

    const handlePlanTypeChange = (value: string) => {
        setSelectedPlanType(value as PlanType);
    };

    const getCurrentPlans = () => {
        return selectedPlanType === 'individual' ? plansIndividual : plansBusiness;
    };
    return(
        <div className="w-full flex flex-col gap-16 justify-center items-center">
            {/* Seletor de tipo de plano */}
            <div className="w-min px-4 py-2 border border-[#34373D] rounded-lg flex gap-6">
                <RadioButton
                    label="Individual"
                    value="individual"
                    name="planType"
                    checked={selectedPlanType === 'individual'}
                    onChange={handlePlanTypeChange}
                    id="individual"
                />  

                <RadioButton
                    label="Empresarial"
                    value="business"
                    name="planType"
                    checked={selectedPlanType === 'business'}
                    onChange={handlePlanTypeChange}
                    id="business"
                />
            </div>

            <div className="w-full flex justify-center items-stretch gap-6 flex-wrap">
                {getCurrentPlans().map((plan, index) => (
                    <div key={index} className="flex-1 min-w-[340px] max-w-[320px]">
                        <PlansCard
                            name={plan.name}
                            description={plan.description}
                            price={plan.price}
                            benefits={plan.benefits}
                            recommended={plan.recommended}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}