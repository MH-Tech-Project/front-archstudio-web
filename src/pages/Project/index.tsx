import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { HeaderProject } from "../../components/HeaderProject"

export default function Project() {
    const { id } = useParams<{ id: string }>()
    const [currentVersion, setCurrentVersion] = useState(3);
    const [versions] = useState([
        { id: 1, date: "2025-10-15", author: "João Silva" },
        { id: 2, date: "2025-10-20", author: "Maria Santos" },
        { id: 3, date: "2025-10-25", author: "João Silva" },
    ]);

    useEffect(() =>{

    }, [id])

    return(
        <div>
            <HeaderProject 
                title={`Edifício Corporate Tower`}
                projectType="comercial"
                clientName="Empresa XYZ"
                projectStatus="Em andamento"
                versions={versions}
                currentVersion={versions.find(v => v.id === currentVersion)!}
                changeVersion={(id) => setCurrentVersion(Number(id))}
                saveProject={() => {}}
            />
        </div>
    )
}