import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import PlansSelector from "../../components/PlansSelector";
import SignupForm from "../../components/SignupForm";
import StepIndicator from "../../components/StepIndicator";
import Button from "../../components/Button";
import { FiArrowRight } from "react-icons/fi";

interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    benefits: string[];
    recommended: boolean;
    type: 'individual' | 'business';
}

export default function Signup() {
    const location = useLocation();
    const [steps, setSteps] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const findPlanById = (planId: string): Plan | null => {
        const allPlans = [
            // Plans Individual
            {
                id: 'individual-basic',
                name: "Basic",
                description: "Para arquitetos iniciantes",
                price: 29.90,
                benefits: ["5 projetos por mês", "Renderizações básicas", "2GB de armazenamento", "Suporte por email"],
                recommended: false,
                type: 'individual' as const
            },
            {
                id: 'individual-standard',
                name: "Standard",
                description: "Para profissionais estabelecidos",
                price: 79,
                benefits: ["Projetos ilimitados", "Renderizações HD", "Exportação em múltiplos formatos", "20GB de armazenamento", "Suporte prioritário"],
                recommended: true,
                type: 'individual' as const
            },
            {
                id: 'individual-premium',
                name: "Premium",
                description: "Para arquitetos avançados",
                price: 149,
                benefits: ["Tudo do Standard", "Renderizações 4K", "100GB de armazenamento", "IA para otimização", "Suporte 24/7"],
                recommended: false,
                type: 'individual' as const
            },
            // Plans Business
            {
                id: 'business-team',
                name: "Team",
                description: "Para equipes pequenas",
                price: 199,
                benefits: ["Até 10 usuários", "Colaboração em tempo real", "50GB compartilhados", "Relatórios básicos", "Suporte prioritário"],
                recommended: false,
                type: 'business' as const
            },
            {
                id: 'business-professional',
                name: "Professional",
                description: "Para empresas em crescimento",
                price: 349,
                benefits: ["Até 50 usuários", "Gestão de projetos avançada", "200GB compartilhados", "Integrações com CAD", "Suporte dedicado"],
                recommended: true,
                type: 'business' as const
            },
            {
                id: 'business-enterprise',
                name: "Enterprise",
                description: "Para grandes escritórios",
                price: 499,
                benefits: ["Usuários ilimitados", "Dashboard executivo", "1TB compartilhado", "API personalizada", "Treinamento dedicado", "Suporte 24/7"],
                recommended: false,
                type: 'business' as const
            }
        ];
        
        return allPlans.find(plan => plan.id === planId) || null;
    };

    useEffect(() => {
        window.document.title = "Signup | ArchStudio Pro";
        
        // Verificar se veio de outra página com plano pré-selecionado
        if (location.state && location.state.selectedPlan) {
            const plan = findPlanById(location.state.selectedPlan);
            if (plan) {
                setSelectedPlan(plan);
            }
        }
    }, [location]);

    const handlePlanSelection = (plan: any) => {
        // Adicionar o tipo baseado no plano selecionado
        const planWithType = {
            ...plan,
            type: plan.id.includes('individual') ? 'individual' as const : 'business' as const
        };
        setSelectedPlan(planWithType);
    };

    const handleContinue = () => {
        if (selectedPlan) {
            setSteps(2);
        }
    };

    const handleBackToPlans = () => {
        setSteps(1);
    };

    const handleSignupSubmit = (formData: any) => {
        console.log('Cadastro completo:', { 
            plan: selectedPlan, 
            userData: formData 
        });
    };

    const renderStep = () => {
        switch(steps) {
            case 1:
                return (
                    <div className="w-full flex justify-center items-center">
                        <div className="w-full max-w-6xl px-4">
                            <div className="text-center mb-12">
                                <h1 className="text-4xl font-bold text-foreground mb-4">
                                    Escolha seu plano
                                </h1>
                                <p className="text-lg text-[#9FA3AD] max-w-2xl mx-auto">
                                    Selecione o plano que melhor se adequa às suas necessidades profissionais
                                </p>
                            </div>
                            
                            <PlansSelector 
                                onPlanSelect={handlePlanSelection} 
                                selectedPlanId={selectedPlan?.id}
                                selectionMode={true}
                            />
                            
                            {/* Botão Continuar */}
                            {selectedPlan && (
                                <div className="flex justify-center mt-8">
                                    <div className="w-3/4 md:w-1/3">
                                        <Button 
                                            size="full"
                                            onClick={handleContinue}
                                        >
                                            <div className="flex justify-center items-center gap-4">    
                                                <p>Continuar</p>
                                                <FiArrowRight size={20} />
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 2:
                return selectedPlan ? (
                    <div className="w-full flex justify-center items-center">
                        <SignupForm 
                            selectedPlan={selectedPlan}
                            onSubmit={handleSignupSubmit}
                            onBack={handleBackToPlans}
                        />
                    </div>
                ) : null;
            default:
                return null;
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <Header showButtonLogin={true} />
            <div className="w-full flex flex-col justify-center items-center mt-20 lg:mt-14 mb-10">
                {/* Step Indicator */}
                <div className="w-full flex justify-center pt-8">
                    <StepIndicator 
                        currentStep={steps} 
                        totalSteps={2} 
                        stepLabels={['', '']} 
                    />
                </div>

                {renderStep()}
            </div>
        </div>
    );
}