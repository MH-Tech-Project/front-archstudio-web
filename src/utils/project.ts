import { PhaseType, type ProjectPhase } from "../types/project";

export const formatDate = (date: string | Date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

export const addWeeks = (dateStr: string, weeks: number): string => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + (weeks * 7));
    return date.toISOString().split('T')[0];
};

export const calculatePhaseEndDate = (startDate: string, weeks: number): string => {
    return addWeeks(startDate, weeks);
};

export const calculatePhasesTimeline = (phases: ProjectPhase[], projectStartDate: string) => {
    // Ordenar fases por phaseOrder
    const sortedPhases = [...phases].sort((a, b) => a.phaseOrder - b.phaseOrder);
    
    const timeline: Array<{
        phase: ProjectPhase;
        startDate: string;
        endDate: string;
    }> = [];

    let currentDate = projectStartDate;

    sortedPhases.forEach((phase) => {
        // Se a fase for independente, usa sua data customizada
        const startDate = phase.isIndependent && phase.independentDate 
            ? phase.independentDate 
            : currentDate;
        
        // Calcular data de término
        const endDate = calculatePhaseEndDate(startDate, phase.weeks);

        timeline.push({
            phase,
            startDate,
            endDate
        });

        // Se não for independente, a próxima fase começa quando essa termina
        if (!phase.isIndependent) {
            currentDate = endDate;
        }
    });

    return timeline;
};


export const PHASES_MOCK: ProjectPhase[] = [
    {
        id: "1",
        projectVersionId: "",
        name: "Levantamento",
        weeks: 2,
        isIndependent: false,
        startDate: formatDate(new Date()),
        independentDate: formatDate(new Date()),
        phaseOrder: 1,
        phaseType: PhaseType.PROJECT,
        milestones: [],
    },
    {
        id: "2",
        projectVersionId: "",
        name: "Estudo de Viabilidade",
        weeks: 2,
        isIndependent: false,
        startDate: formatDate(new Date()),
        independentDate: formatDate(new Date()),
        phaseOrder: 2,
        phaseType: PhaseType.PROJECT,
        milestones: [],
    },
    {
        id: "3",
        projectVersionId: "",
        name: "Orientação de Custo Preliminar",
        weeks: 2,
        isIndependent: false,
        startDate: formatDate(new Date()),
        independentDate: formatDate(new Date()),
        phaseOrder: 3,
        phaseType: PhaseType.PROJECT,
        milestones: [],
    },
    {
        id: "4",
        projectVersionId: "",
        name: "Estudo Preliminar",
        weeks: 3,
        isIndependent: false,
        startDate: formatDate(new Date()),
        independentDate: formatDate(new Date()),
        phaseOrder: 4,
        phaseType: PhaseType.PROJECT,
        milestones: [],
    },
    {
        id: "5",
        projectVersionId: "",
        name: "Anteprojeto",
        weeks: 3,
        isIndependent: false,
        startDate: formatDate(new Date()),
        independentDate: formatDate(new Date()),
        phaseOrder: 5,
        phaseType: PhaseType.PROJECT,
        milestones: [],
    },
    {
        id: "6",
        projectVersionId: "",
        name: "Orçamento",
        weeks: 2,
        isIndependent: false,
        startDate: formatDate(new Date()),
        independentDate: formatDate(new Date()),
        phaseOrder: 6,
        phaseType: PhaseType.PROJECT,
        milestones: [],
    },
    {
        id: "7",
        projectVersionId: "",
        name: "Projeto Executivo",
        weeks: 3,
        isIndependent: false,
        startDate: formatDate(new Date()),
        independentDate: formatDate(new Date()),
        phaseOrder: 7,
        phaseType: PhaseType.PROJECT,
        milestones: [],
    },
    {
        id: "8",
        projectVersionId: "",
        name: "Concorrência",
        weeks: 2,
        isIndependent: false,
        startDate: formatDate(new Date()),
        independentDate: formatDate(new Date()),
        phaseOrder: 8,
        phaseType: PhaseType.PROJECT,
        milestones: [],
    },
    {
        id: "9",
        projectVersionId: "",
        name: "Detalhamento",
        weeks: 2,
        isIndependent: false,
        startDate: formatDate(new Date()),
        independentDate: formatDate(new Date()),
        phaseOrder: 9,
        phaseType: PhaseType.PROJECT,
        milestones: [],
    },
    {
        id: "10",
        projectVersionId: "",
        name: "Obra Cinza",
        weeks: 12,
        isIndependent: false,
        startDate: formatDate(new Date()),
        independentDate: formatDate(new Date()),
        phaseOrder: 10,
        phaseType: PhaseType.CONSTRUCTION,
        milestones: [],
    },
    {
        id: "11",
        projectVersionId: "",
        name: "Acabamentos",
        weeks: 8,
        isIndependent: false,
        startDate: formatDate(new Date()),
        independentDate: formatDate(new Date()),
        phaseOrder: 11,
        phaseType: PhaseType.CONSTRUCTION,
        milestones: [],
    },
    {
        id: "12",
        projectVersionId: "",
        name: "Marcenaria",
        weeks: 6,
        isIndependent: false,
        startDate: formatDate(new Date()),
        independentDate: formatDate(new Date()),
        phaseOrder: 12,
        phaseType: PhaseType.CONSTRUCTION,
        milestones: [],
    },
    {
        id: "13",
        projectVersionId: "",
        name: "Finalização",
        weeks: 4,
        isIndependent: false,
        startDate: formatDate(new Date()),
        independentDate: formatDate(new Date()),
        phaseOrder: 13,
        phaseType: PhaseType.CONSTRUCTION,
        milestones: [],
    },
]