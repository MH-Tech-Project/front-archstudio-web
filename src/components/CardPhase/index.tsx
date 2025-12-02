import { useState } from "react";
import { MdFlag, MdAdd, MdDelete, MdDragIndicator, MdExpandMore, MdExpandLess } from "react-icons/md";
import type { ProjectPhase, Milestone } from "../../types/project";
import Checkbox from "../Checkbox";
import { Box } from "../Box";
import Input from "../Input";

interface CardPhaseProps {
    phase: ProjectPhase;
    startDate: string;                   // Data de início calculada
    endDate: string;                     // Data de término calculada
    onUpdatePhase: (phaseId: string, data: Partial<ProjectPhase>) => void;
    onDeletePhase: (phaseId: string) => void;
    onMovePhase?: (phaseId: string, direction: "up" | "down") => void;
    onAddMilestone: (phaseId: string, milestone: Omit<Milestone, "id" | "projectPhaseId">) => void;
    onDeleteMilestone: (phaseId: string, milestoneId: string) => void;
    canMoveUp?: boolean;
    canMoveDown?: boolean;
}

export function CardPhase({
    phase,
    startDate,
    endDate,
    onUpdatePhase,
    onDeletePhase,
    onMovePhase,
    onAddMilestone,
    onDeleteMilestone,
    canMoveUp = true,
    canMoveDown = true
}: CardPhaseProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isAddingMilestone, setIsAddingMilestone] = useState(false);
    const [newMilestoneName, setNewMilestoneName] = useState("");
    const [newMilestoneDate, setNewMilestoneDate] = useState("");

    const formatDate = (date: string) => {
        if (!date) return "";
        const [year, month, day] = date.split('-').map(Number);
        const d = new Date(year, month - 1, day);
        return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
    };

    const formatDateFull = (date: string) => {
        if (!date) return "";
        const [year, month, day] = date.split('-').map(Number);
        const d = new Date(year, month - 1, day);
        return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
    };

    const formatDateInput = (date: string) => {
        if (!date) return "";
        return date;
    };

    const handleAddMilestone = () => {
        if (newMilestoneName.trim()) {
            onAddMilestone(phase.id, {
                name: newMilestoneName,
                date: newMilestoneDate ? new Date(newMilestoneDate) : new Date()
            });
            setNewMilestoneName("");
            setNewMilestoneDate("");
            setIsAddingMilestone(false);
        }
    };

    const displayStartDate = phase.isIndependent && phase.independentDate ? phase.independentDate : startDate;

    return (
        <Box>
            <div className="w-full space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="w-full sm:w-1/2 flex items-center gap-2">
                        <div className="flex flex-col gap-0.5 cursor-move text-[#9FA3AD] hover:text-[#EFA339]">
                            <MdDragIndicator size={20} />
                        </div>

                        <Input
                            value={phase.name}
                            onChange={(e) => onUpdatePhase(phase.id, { name: e.target.value })}
                            icon={<MdFlag size={18} className="text-[#9FA3AD]" />}
                            placeholder="Nome da fase"
                        />
                    </div>

                    <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto justify-end">
                        <div className="flex items-center gap-1.5 md:gap-2">
                            <Checkbox
                                id={`independent-${phase.id}`}
                                checked={phase.isIndependent}
                                onChange={(checked) => onUpdatePhase(phase.id, { isIndependent: checked })}
                            />
                            <label htmlFor={`independent-${phase.id}`} className="text-[10px] md:text-xs text-[#9FA3AD] cursor-pointer whitespace-nowrap">
                                Fase Independente
                            </label>
                        </div>

                        {/* Expand/Collapse */}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-[#9FA3AD] hover:text-[#EFA339] transition-colors"
                        >
                            {isExpanded ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
                        </button>

                        {/* Delete Button */}
                        <button
                            onClick={() => onDeletePhase(phase.id)}
                            className="text-[#9FA3AD] hover:text-red-500 transition-colors"
                        >
                            <MdDelete size={18} />
                        </button>
                    </div>

                </div>

                {/* Content */}
                {isExpanded && (
                    <div className="space-y-4">
                        {/* First Row: Dates and Weeks */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                            {/* Start Date */}
                            <div className="col-span-1 sm:col-span-3">
                                <label className="text-xs text-[#9FA3AD] mb-1 block">
                                    Início: {formatDate(displayStartDate)}
                                </label>
                                {phase.isIndependent && (
                                    <Input
                                        label="Data Independente"
                                        type="date"
                                        value={formatDateInput(phase.independentDate || "")}
                                        onChange={(e) => onUpdatePhase(phase.id, { independentDate: e.target.value })}
                                        propsInput={{}}
                                    />
                                )}
                            </div>

                            {/* End Date (Display only) */}
                            <div className="col-span-1 sm:col-span-3">
                                <label className="text-xs text-[#9FA3AD] mb-1 block">
                                    Término: {formatDate(endDate)}
                                </label>
                            </div>

                            {/* Weeks Input */}
                            <div className="col-span-1 sm:col-span-1">
                                <Input
                                    label="Semanas"
                                    type="number"
                                    value={phase.weeks.toString()}
                                    onChange={(e) => onUpdatePhase(phase.id, { weeks: parseInt(e.target.value) || 1 })}
                                    propsInput={{min: 1}}
                                />
                            </div>

                            {/* Progress Bar */}
                            <div className="col-span-1 sm:col-span-4 flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-[#9FA3AD]">Progresso</span>
                                    <span className="text-xs font-medium text-foreground">
                                        {phase.weeks}s
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-[#34373D] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#EFA339] to-[#F69855] rounded-full transition-all duration-300"
                                        style={{ width: `${Math.min((phase.weeks / 52) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Milestones Section */}
                        {phase.milestones && phase.milestones.length > 0 && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <MdFlag size={14} className="text-[#9FA3AD]" />
                                    <span className="text-xs font-medium text-[#9FA3AD]">Marcos</span>
                                </div>
                                <div className="space-y-2 pl-5">
                                    {phase.milestones.map((milestone) => (
                                        <div
                                            key={milestone.id}
                                            className="flex items-center gap-2 text-sm text-foreground"
                                        >
                                            <Checkbox
                                                id={`milestone-${milestone.id}`}
                                                checked={!!milestone.date}
                                                onChange={(checked) => {
                                                    // Toggle milestone completion
                                                    onUpdatePhase(phase.id, {
                                                        milestones: phase.milestones.map(m =>
                                                            m.id === milestone.id
                                                                ? { ...m, date: checked ? new Date() : null as any }
                                                                : m
                                                        )
                                                    });
                                                }}
                                            />
                                            <span className={milestone.date ? "line-through opacity-60" : ""}>
                                                {milestone.name}
                                            </span>
                                            {milestone.date && (
                                                <span className="text-xs text-[#9FA3AD]">
                                                    - {formatDateFull(milestone.date.toString())}
                                                </span>
                                            )}
                                            <button
                                                onClick={() => onDeleteMilestone(phase.id, milestone.id)}
                                                className="ml-auto text-[#9FA3AD] hover:text-red-500 transition-colors"
                                            >
                                                <MdDelete size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add Milestone Form */}
                        {isAddingMilestone ? (
                            <div className="space-y-2 pl-5">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMilestoneName}
                                        onChange={(e) => setNewMilestoneName(e.target.value)}
                                        placeholder="Nome do marco"
                                        className="flex-1 bg-background border border-[#34373D] rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-[#EFA339]"
                                        autoFocus
                                    />
                                    <input
                                        type="date"
                                        value={newMilestoneDate}
                                        onChange={(e) => setNewMilestoneDate(e.target.value)}
                                        className="bg-background border border-[#34373D] rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-[#EFA339]"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddMilestone}
                                        className="px-3 py-1.5 bg-[#EFA339] text-[#121417] rounded text-xs font-medium hover:bg-[#F69855] transition-colors"
                                    >
                                        Adicionar
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsAddingMilestone(false);
                                            setNewMilestoneName("");
                                            setNewMilestoneDate("");
                                        }}
                                        className="px-3 py-1.5 border border-[#34373D] text-[#9FA3AD] rounded text-xs font-medium hover:border-[#EFA339] hover:text-[#EFA339] transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAddingMilestone(true)}
                                className="w-full py-2 border border-dashed border-[#34373D] rounded text-sm text-[#9FA3AD] hover:border-[#EFA339] hover:text-[#EFA339] transition-all flex items-center justify-center gap-2"
                            >
                                <MdAdd size={18} />
                                Adicionar Marco
                            </button>
                        )}
                    </div>
                )}
            </div>
        </Box>
    );
}