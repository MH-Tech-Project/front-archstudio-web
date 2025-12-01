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
        <header className="w-full h-20 bg-background flex items-center justify-between">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold text-white">{title}</h1>
                <div className="flex items-center gap-4">
                    <span className="bg-background border border-[#34373D] rounded-full px-4 flex flex-col items-center justify-center">
                        <p className="text-sm">{projectType}</p>
                    </span>
                    <span>•</span>
                    <p className="text-sm">Cliente: {clientName}</p>
                    <span>•</span>
                    <span className="border border-[#3b82f633] bg-[#3b82f61a] text-blue-500 rounded-full px-4 text-sm">{projectStatus}</span>
                </div>
            </div>
            <div className="flex items-center justify-center gap-4">
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