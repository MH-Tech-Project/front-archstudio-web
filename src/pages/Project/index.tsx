import { useEffect, useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { HeaderProject } from "../../components/HeaderProject"
import { ProjectForm, emptyProjectFormData, type ProjectFormData } from "../../components/ProjectForm";
import { TimelinePhases } from "../../components/TimelinePhases";
import { GanttChart } from "../../components/GanttChart";
import { PHASES_MOCK, calculatePhasesTimeline } from "../../utils/project";
import { PhaseType, type ProjectPhase } from "../../types/project";

export default function Project() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate();
    const isNewProject = id === 'new';

    const [formData, setFormData] = useState<ProjectFormData>(emptyProjectFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [projectPhases, setProjectPhases] = useState<ProjectPhase[]>(PHASES_MOCK.filter(phase => phase.phaseType === PhaseType.PROJECT));
    const [constructionPhases, setConstructionPhases] = useState<ProjectPhase[]>(PHASES_MOCK.filter(phase => phase.phaseType === PhaseType.CONSTRUCTION));

    const [currentVersion, setCurrentVersion] = useState(3);
    const [versions] = useState([
        { id: 1, date: "2025-10-15", author: "Matheus Oliveira" },
        { id: 2, date: "2025-10-20", author: "Maria Santos" },
        { id: 3, date: "2025-10-25", author: "Higor Thome" },
    ]);

    const projectStartDate = new Date().toISOString().split('T')[0];

    const allPhases = useMemo(() => [
        ...projectPhases,
        ...constructionPhases
    ], [projectPhases, constructionPhases]);

    const fullTimeline = useMemo(() => 
        calculatePhasesTimeline(allPhases, projectStartDate),
        [allPhases, projectStartDate]
    );

    useEffect(() => {
        if (isNewProject) {
            setFormData(emptyProjectFormData);
            return;
        }

        // API call to fetch project data by ID
        const loadProjectData = async () => {
            setIsLoading(true);
            try { 
                // mock data
                const mockData: ProjectFormData = {
                    clientName: "Empresa XYZ",
                    clientEmail: "contato@empresaxyz.com",
                    clientPhone: "(11) 98765-4321",
                    clientDocument: "12.345.678/0001-90",
                    clientProfession: "Comercial",
                    estimatedBudget: "R$ 500.000,00",
                    stylePreference: "Moderno, Corporativo",
                    additionalNotes: "Cliente busca um espaço funcional e moderno.",
                    projectName: "Escritório Corporativo XYZ",
                    projectType: "commercial",
                    projectStatus: "development",
                    totalArea: "350",
                    fullAddress: "Av. Paulista, 1000, Bela Vista, São Paulo - SP",
                    floors: "2",
                    parkingSpaces: "10",
                };
                setFormData(mockData);
            } catch (error) {
                console.error("Erro ao carregar projeto:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadProjectData();
    }, [id, isNewProject]);

    const handleSaveProject = async () => {
        setIsSaving(true);
        try {
            if (isNewProject) {
                // simulation
                const newId = "123"; // ID return from API after creation
                console.log("Projeto criado:", formData);
                
                navigate(`/project/${newId}`, { replace: true });
            } else {
                // await updateProject(id, formData);
                console.log("Projeto atualizado:", formData);
            }
        } catch (error) {
            console.error("Erro ao salvar projeto:", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EFA339] mx-auto"></div>
                    <p className="mt-4 text-[#9FA3AD]">Carregando projeto...</p>
                </div>
            </div>
        );
    }

    return(
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 px-4 md:px-6 lg:px-0">
            <HeaderProject 
                title={isNewProject ? "Novo Projeto" : formData.projectName || "Projeto"}
                projectType={formData.projectType}
                clientName={formData.clientName}
                projectStatus={formData.projectStatus}
                versions={isNewProject ? [] : versions}
                currentVersion={isNewProject ? undefined : versions.find(v => v.id === currentVersion)}
                changeVersion={(id) => setCurrentVersion(Number(id))}
                saveProject={handleSaveProject}
                isSaving={isSaving}
            />

            <ProjectForm 
                data={formData}
                onChange={setFormData}
                disabled={isSaving}
            /> 

            <TimelinePhases 
                projectStartDate={projectStartDate}
                initialPhases={projectPhases}
                typePhase={PhaseType.PROJECT}
                onPhasesChange={setProjectPhases}
            /> 

            <TimelinePhases 
                projectStartDate={projectStartDate}
                initialPhases={constructionPhases}
                typePhase={PhaseType.CONSTRUCTION}
                onPhasesChange={setConstructionPhases}
            />

            <GanttChart 
                phases={fullTimeline}
                projectStartDate={projectStartDate}
            /> 
        </div>
    )
}