import { useState, useMemo } from "react";
import type { ProjectPhase, Milestone, PhaseType } from "../../types/project";
import { CardPhase } from "../CardPhase";
import { calculatePhasesTimeline } from "../../utils/project";
import Button from "../Button";
import { MdAdd } from "react-icons/md";

interface ProjectPhasesProps {
    initialPhases?: ProjectPhase[];
    typePhase: "PROJECT" | "CONSTRUCTION";
    projectStartDate: string;
    onPhasesChange?: (phases: ProjectPhase[]) => void;
}

export function TimelinePhases({ 
    initialPhases = [],
    projectStartDate,
    onPhasesChange,
    typePhase
}: ProjectPhasesProps) {
    const [phases, setPhases] = useState<ProjectPhase[]>(initialPhases);

    const updatePhases = (newPhases: ProjectPhase[]) => {
        setPhases(newPhases);
        onPhasesChange?.(newPhases);
    };

    const timeline = useMemo(() => 
        calculatePhasesTimeline(phases, projectStartDate),
        [phases, projectStartDate]
    );

    const handleUpdatePhase = (phaseId: string, data: Partial<ProjectPhase>) => {
        updatePhases(phases.map(p => 
            p.id === phaseId ? { ...p, ...data } : p
        ));
    };

    const handleDeletePhase = (phaseId: string) => {
        updatePhases(phases.filter(p => p.id !== phaseId));
    };

    const handleAddPhase = () => {
        const newPhase: ProjectPhase = {
            id: crypto.randomUUID(),
            projectVersionId: "",
            name: "Nova Fase",
            weeks: 2,
            isIndependent: false,
            startDate: "",
            independentDate: "",
            phaseOrder: phases.length + 1,
            phaseType: typePhase as PhaseType,
            milestones: []
        };
        updatePhases([...phases, newPhase]);
    };

    const handleAddMilestone = (
        phaseId: string, 
        milestone: Omit<Milestone, "id" | "projectPhaseId">
    ) => {
        updatePhases(phases.map(p => {
            if (p.id === phaseId) {
                return {
                    ...p,
                    milestones: [
                        ...p.milestones,
                        {
                            id: crypto.randomUUID(),
                            projectPhaseId: phaseId,
                            ...milestone
                        }
                    ]
                };
            }
            return p;
        }));
    };

    const handleDeleteMilestone = (phaseId: string, milestoneId: string) => {
        updatePhases(phases.map(p => {
            if (p.id === phaseId) {
                return {
                    ...p,
                    milestones: p.milestones.filter(m => m.id !== milestoneId)
                };
            }
            return p;
        }));
    };

    const handleMovePhase = (phaseId: string, direction: "up" | "down") => {
        const sortedPhases = [...phases].sort((a, b) => a.phaseOrder - b.phaseOrder);
        const currentIndex = sortedPhases.findIndex(p => p.id === phaseId);
        
        if (direction === "up" && currentIndex > 0) {
            const temp = sortedPhases[currentIndex].phaseOrder;
            sortedPhases[currentIndex].phaseOrder = sortedPhases[currentIndex - 1].phaseOrder;
            sortedPhases[currentIndex - 1].phaseOrder = temp;
        } else if (direction === "down" && currentIndex < sortedPhases.length - 1) {
            const temp = sortedPhases[currentIndex].phaseOrder;
            sortedPhases[currentIndex].phaseOrder = sortedPhases[currentIndex + 1].phaseOrder;
            sortedPhases[currentIndex + 1].phaseOrder = temp;
        }
        
        updatePhases(sortedPhases);
    };

    return(
        <main className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">{typePhase === "PROJECT" ? "Fases do Projeto" : "Fases da Obra"}</h1>
                    {phases.length > 0 && (
                        <div className="flex gap-4 items-center">
                            <p className="text-sm text-[#9FA3AD] mt-1">
                                Total: {phases.length} fase{phases.length !== 1 ? 's' : ''}
                            </p>
                            <p className="text-sm text-[#9FA3AD] mt-1">
                                Duração total: {phases.reduce((sum, phase) => sum + phase.weeks, 0)} semana{phases.reduce((sum, phase) => sum + phase.weeks, 0) !== 1 ? 's' : ''}
                            </p>
                        </div>
                    )}
                </div>
                <Button onClick={handleAddPhase} size="sm">
                    <div className="flex items-center gap-2">
                        <MdAdd size={18} />
                        <span>Adicionar Fase</span>
                    </div>
                </Button>
            </div>

            {phases.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-[#34373D] rounded-lg">
                    <p className="text-sm text-[#9FA3AD]">Nenhuma fase cadastrada para este projeto.</p>
                    <p className="text-xs text-[#9FA3AD] mt-2">Clique em "Adicionar Fase" para começar o cronograma.</p>
                </div>
            ) : (  
                <div className="space-y-4">
                    {timeline.map((item, index) => (
                        <CardPhase 
                            key={item.phase.id}
                            phase={item.phase}
                            startDate={item.startDate}
                            endDate={item.endDate}
                            onUpdatePhase={handleUpdatePhase}
                            onDeletePhase={handleDeletePhase}
                            onMovePhase={handleMovePhase}
                            onAddMilestone={handleAddMilestone}
                            onDeleteMilestone={handleDeleteMilestone}
                            canMoveUp={index > 0}
                            canMoveDown={index < timeline.length - 1}
                        />
                    ))}
                </div>
            )}
        </main>
    )
}