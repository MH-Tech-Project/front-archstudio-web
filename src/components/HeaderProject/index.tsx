import { MdHistory, MdSave } from "react-icons/md";
import { Select } from "../Select";
import Button from "../Button";

interface HeaderProjectProps {
    title: string;
    projectType: string;
    clientName: string;
    projectStatus: string;
    currentVersion?: { id: number; date: string; author: string };
    versions?: Array<{ id: number; date: string; author: string }>;
    changeVersion: (versionId: string) => void;
    saveProject: () => void;
    isSaving?: boolean;
}

export function HeaderProject({ title, projectType, clientName, projectStatus, currentVersion, versions = [], changeVersion, saveProject, isSaving = false }: HeaderProjectProps) {
    return(
        <header className="w-full min-h-20 bg-background flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 py-4 lg:py-0">
            <div className="flex flex-col gap-2 lg:gap-4 w-full lg:w-auto">
                <h1 className="text-2xl md:text-3xl font-semibold text-white truncate">{title}</h1>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm">
                    <span className="bg-background border border-[#34373D] rounded-full px-3 md:px-4 py-1 flex items-center justify-center">
                        <p className="text-xs md:text-sm">{projectType}</p>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <p className="text-xs md:text-sm truncate max-w-[200px] md:max-w-none">Cliente: {clientName}</p>
                    <span className="hidden sm:inline">•</span>
                    <span className="border border-[#3b82f633] bg-[#3b82f61a] text-blue-500 rounded-full px-3 md:px-4 py-1 text-xs md:text-sm">{projectStatus}</span>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 md:gap-4 w-full lg:w-auto">
                {
                    versions && versions.length > 0 && currentVersion && (
                        <Select
                            icon={MdHistory}
                            options={versions.map(version => ({ label: `Versão ${version.id} - ${version.date}`, value: version.id.toString() }))}
                            placeholder={`Versão ${currentVersion.id} - ${currentVersion.date}`}
                            value={currentVersion.id.toString()}
                            onChange={changeVersion}
                        />
                    )
                }
                <div className="w-full">
                    <Button size="sm" onClick={saveProject} disabled={isSaving}>
                        <div className="flex items-center gap-2">
                            <MdSave size={20} />
                            <p>{isSaving ? "Salvando..." : "Salvar alterações"}</p>
                        </div>
                    </Button>
                </div>
            </div>
        </header>
    )
}