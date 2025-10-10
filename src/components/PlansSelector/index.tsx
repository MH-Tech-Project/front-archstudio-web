import RadioButton from "../RadioButton";
import { useState } from "react";
import PlansCard from "../PlansCard";

type PlanType = 'individual' | 'business';

interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    benefits: string[];
    recommended: boolean;
}

interface PlansSelectorProps {
    onPlanSelect?: (plan: Plan | null) => void;
    selectedPlanId?: string | null;
    selectionMode?: boolean;
}

export default function PlansSelector({ onPlanSelect, selectedPlanId, selectionMode = false }: PlansSelectorProps){
    const [selectedPlanType, setSelectedPlanType] = useState<PlanType>('individual');

    const plansIndividual = [
        {
            id: 'individual-basic',
            name: "Basic",
            description: "Para arquitetos iniciantes",
            price: 29.90,
            benefits: [
                "5 projetos por mês", 
                "Renderizações básicas", 
                "2GB de armazenamento", 
                "Suporte por email"
            ],
            recommended: false
        },
        {
            id: 'individual-standard',
            name: "Standard",
            description: "Para profissionais estabelecidos",
            price: 79,
            benefits: [
                "Projetos ilimitados", 
                "Renderizações HD", 
                "Exportação em múltiplos formatos", 
                "20GB de armazenamento",
                "Suporte prioritário",
            ],
            recommended: true
        },
        {
            id: 'individual-premium',
            name: "Premium",
            description: "Para arquitetos avançados",
            price: 149,
            benefits: [
                "Tudo do Standard", 
                "Renderizações 4K", 
                "100GB de armazenamento", 
                "IA para otimização",
                "Suporte 24/7"
            ],
            recommended: false
        }
    ];

    const plansBusiness = [
        {
            id: 'business-basic',
            name: "Basic",
            description: "Para equipes pequenas",
            price: 149,
            benefits: [
                "Até 10 usuários", 
                "Projetos colaborativos", 
                "50GB compartilhados", 
                "Controle de versões"
            ],
            recommended: false
        },
        {
            id: 'business-standard',
            name: "Standard",
            description: "Para escritórios médios",
            price: 299,
            benefits: [
                "15 usuários inclusos", 
                "Gestão de projetos", 
                "200GB compartilhados", 
                "Relatórios avançados",
                "Integrações CAD"
            ],
            recommended: true
        },
        {
            id: 'business-premium',
            name: "Premium",
            description: "Para grandes escritórios",
            price: 499,
            benefits: [
                "Usuários ilimitados", 
                "Dashboard executivo", 
                "1TB compartilhado", 
                "API personalizada",
                "Treinamento dedicado",
                "Suporte 24/7"
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

    const handlePlanSelect = (plan: Plan) => {
        if (onPlanSelect) {
            const newSelectedPlan = selectedPlanId === plan.id ? null : plan;
            onPlanSelect(newSelectedPlan);
        }
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
                            id={plan.id}
                            name={plan.name}
                            description={plan.description}
                            price={plan.price}
                            benefits={plan.benefits}
                            recommended={plan.recommended}
                            onSelect={() => handlePlanSelect(plan)}
                            isSelected={selectedPlanId === plan.id}
                            selectionMode={selectionMode}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}