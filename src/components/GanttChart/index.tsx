import { useMemo } from "react";
import type { ProjectPhase } from "../../types/project";
import { PhaseType } from "../../types/project";

interface GanttChartProps {
    phases: Array<{
        phase: ProjectPhase;
        startDate: string;
        endDate: string;
    }>;
    projectStartDate: string;
}

interface MonthColumn {
    month: string;
    year: number;
    weeks: number[];
}

export function GanttChart({ phases, projectStartDate }: GanttChartProps) {
    const ganttData = useMemo(() => {
        if (phases.length === 0) return {
            monthColumns: [],
            projectPhases: [],
            constructionPhases: [],
            totalWeeks: 0
        };

        const projectPhases = phases.filter(p => p.phase.phaseType === PhaseType.PROJECT);
        const constructionPhases = phases.filter(p => p.phase.phaseType === PhaseType.CONSTRUCTION);

        // calculate positions of phases
        const calculatePositions = (phasesArray: typeof phases) => {
            return phasesArray.map(({ phase, startDate }) => {
                const start = new Date(startDate);
                const projectStart = new Date(projectStartDate);
                const diffTime = start.getTime() - projectStart.getTime();
                const startWeek = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));

                return {
                    phase,
                    startWeek,
                    duration: phase.weeks,
                    days: phase.weeks * 7,
                };
            });
        };

        const projectPositions = calculatePositions(projectPhases);
        const constructionPositions = calculatePositions(constructionPhases);

        // Calculate total number of weeks
        const allPositions = [...projectPositions, ...constructionPositions];
        const totalWeeks = Math.max(
            ...allPositions.map(p => p.startWeek + p.duration),
            0
        );

        // Generate month columns
        const monthColumns: MonthColumn[] = [];
        const startDate = new Date(projectStartDate);

        for (let week = 0; week < totalWeeks; week++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + (week * 7));

            const month = currentDate.toLocaleDateString('pt-BR', { month: 'short' });
            const year = currentDate.getFullYear();

            const lastColumn = monthColumns[monthColumns.length - 1];
            if (lastColumn && lastColumn.month === month && lastColumn.year === year) {
                lastColumn.weeks.push(week);
            } else {
                monthColumns.push({
                    month,
                    year,
                    weeks: [week],
                });
            }
        }

        return {
            monthColumns,
            projectPhases: projectPositions,
            constructionPhases: constructionPositions,
            totalWeeks
        };
    }, [phases, projectStartDate]);

    if (phases.length === 0) {
        return (
            <div className="text-center py-12 border border-dashed border-[#34373D] rounded-lg bg-[#0D0E11]">
                <p className="text-sm text-[#9FA3AD]">Adicione fases para visualizar o cronograma</p>
            </div>
        );
    }

    const { monthColumns, projectPhases, constructionPhases, totalWeeks } = ganttData;

    const renderPhaseRow = (
        phase: ProjectPhase,
        startWeek: number,
        duration: number,
        days: number,
        isLast: boolean = false
    ) => (
        <div key={phase.id} className="flex hover:bg-[#13151A] transition-colors">
            <div className={`w-40 sm:w-48 md:w-56 flex-shrink-0 h-12 flex items-center px-2 sm:px-3 md:px-4 border-r ${!isLast ? 'border-b' : ''} border-[#2A2D35]`}>
                <div className="text-xs sm:text-sm truncate font-medium" title={phase.name}>
                    {phase.name}
                </div>
            </div>

            {/* Grid of weeks */}
            <div className={`flex flex-1 relative ${!isLast ? 'border-b' : ''} border-[#2A2D35]`}>
                {Array.from({ length: totalWeeks }, (_, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-16 h-12 border-r border-[#2A2D35]"
                    />
                ))}

                {/* Phase bar */}
                <div
                    className={`absolute top-2.5 bottom-2.5 rounded-md ${phase.isIndependent
                            ? "bg-gradient-to-r from-[#3B82F6] to-[#2563EB] shadow-lg shadow-blue-500/20"
                            : "bg-gradient-to-r from-[#EFA339] to-[#D68A28] shadow-lg shadow-orange-500/20"
                        } flex items-center justify-center text-xs font-semibold px-3 text-white`}
                    style={{
                        left: `${startWeek * 64}px`,
                        width: `${duration * 64}px`,
                    }}
                    title={`${phase.name}: ${days} dias (${duration} semana${duration !== 1 ? 's' : ''})`}
                >
                    <span className="truncate">
                        {days}d
                    </span>
                </div>
            </div>
        </div>
    );
    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <h2 className="text-base md:text-lg font-semibold">Timeline (Gráfico de Gantt)</h2>
                <div className="text-xs md:text-sm text-[#9FA3AD]">
                    Total: <span className="font-medium text-white">{totalWeeks}</span> semanas
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#2A2D35] bg-[#0D0E11] -mx-4 md:mx-0">
                <div className="inline-block min-w-full px-4 md:px-0">
                    {/* Header */}
                    <div className="flex bg-[#1A1C1F]">
                        <div className="w-40 sm:w-48 md:w-56 flex-shrink-0 border-r border-[#2A2D35]">
                            <div className="h-10 flex items-center px-2 sm:px-3 md:px-4 font-semibold text-xs sm:text-sm">
                                Fases
                            </div>
                        </div>

                        {/* Colunas dos meses */}
                        <div className="flex flex-1">
                            {monthColumns.map((monthCol, index) => (
                                <div
                                    key={`${monthCol.month}-${monthCol.year}-${index}`}
                                    className="flex-shrink-0 h-10 flex items-center justify-center text-xs font-semibold border-r border-[#2A2D35]"
                                    style={{
                                        width: `${monthCol.weeks.length * 64}px`,
                                    }}
                                >
                                    {monthCol.month} {monthCol.year}
                                </div>
                            ))}
                        </div>
                    </div>

                    {projectPhases.length > 0 && (
                        <>
                            <div className="flex bg-[#13151A] border-y border-[#2A2D35]">
                                <div className="w-40 sm:w-48 md:w-56 flex-shrink-0 h-9 flex items-center px-2 sm:px-3 md:px-4 border-r border-[#2A2D35]">
                                    <span className="text-[10px] sm:text-xs font-bold text-[#EFA339] uppercase tracking-wide">Fases do Projeto</span>
                                </div>
                                <div className="flex-1" />
                            </div>

                            {projectPhases.map(({ phase, startWeek, duration, days }, index) =>
                                renderPhaseRow(
                                    phase,
                                    startWeek,
                                    duration,
                                    days,
                                    constructionPhases.length === 0 && index === projectPhases.length - 1
                                )
                            )}
                        </>
                    )}

                    {constructionPhases.length > 0 && (
                        <>
                            <div className="flex bg-[#13151A] border-y border-[#2A2D35]">
                                <div className="w-40 sm:w-48 md:w-56 flex-shrink-0 h-9 flex items-center px-2 sm:px-3 md:px-4 border-r border-[#2A2D35]">
                                    <span className="text-[10px] sm:text-xs font-bold text-[#EFA339] uppercase tracking-wide">Fases da Obra</span>
                                </div>
                                <div className="flex-1" />
                            </div>

                            {constructionPhases.map(({ phase, startWeek, duration, days }, index) =>
                                renderPhaseRow(
                                    phase,
                                    startWeek,
                                    duration,
                                    days,
                                    index === constructionPhases.length - 1
                                )
                            )}
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs sm:text-sm bg-[#0D0E11] p-3 sm:p-4 rounded-lg border border-[#2A2D35]">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-gradient-to-r from-[#EFA339] to-[#D68A28] shadow-lg shadow-orange-500/20" />
                    <span className="text-[#E5E7EB] font-medium">Fase Sequencial</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-gradient-to-r from-[#3B82F6] to-[#2563EB] shadow-lg shadow-blue-500/20" />
                    <span className="text-[#E5E7EB] font-medium">Fase Independente</span>
                </div>
            </div>
        </div>
    );
}