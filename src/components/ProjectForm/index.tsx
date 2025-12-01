import { useState } from "react";
import { Box } from "../Box";
import Input from "../Input";
import { Select, type SelectOption } from "../Select";
import Textarea from "../Textarea";

interface ProjectFormData {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    clientDocument: string;
    clientProfession: string;
    estimatedBudget: string;
    stylePreference: string;
    additionalNotes: string;
    
    projectName: string;
    projectType: string;
    projectStatus: string;
    totalArea: string;
    fullAddress: string;
    floors: string;
    parkingSpaces: string;
}

const projectTypeOptions: SelectOption[] = [
    { label: "Residencial", value: "residential" },
    { label: "Comercial", value: "commercial" },
    { label: "Industrial", value: "industrial" },
    { label: "Institucional", value: "institutional" },
    { label: "Reforma", value: "renovation" },
    { label: "Interiores", value: "interior" },
    { label: "Paisagismo", value: "landscape" },
];

const projectStatusOptions: SelectOption[] = [
    { label: "Briefing", value: "briefing" },
    { label: "Em Desenvolvimento", value: "development" },
    { label: "Revisão", value: "review" },
    { label: "Aprovação", value: "approval" },
    { label: "Execução", value: "execution" },
    { label: "Finalizado", value: "finished" },
    { label: "Pausado", value: "paused" },
];

export function ProjectForm() {
    const [formData, setFormData] = useState<ProjectFormData>({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        clientDocument: "",
        clientProfession: "",
        estimatedBudget: "",
        stylePreference: "",
        additionalNotes: "",
        projectName: "",
        projectType: "",
        projectStatus: "",
        totalArea: "",
        fullAddress: "",
        floors: "",
        parkingSpaces: "",
    });

    const handleInputChange = (field: keyof ProjectFormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleSelectChange = (field: keyof ProjectFormData) => (value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return(
        <Box>
            <div className="flex flex-col gap-8">
                {/* Informações do Cliente */}
                <div className="flex flex-col gap-4">
                    <h1 className="font-semibold text-lg">Informações do Cliente</h1>
                    <div className="w-full flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Input 
                                label="Nome / Razão Social *" 
                                placeholder="Arch Studio Pro LTDA"
                                value={formData.clientName}
                                onChange={handleInputChange('clientName')}
                            />
                            <Input 
                                label="Email" 
                                type="email"
                                placeholder="contato@email.com"
                                value={formData.clientEmail}
                                onChange={handleInputChange('clientEmail')}
                            />
                            <Input 
                                label="Telefone" 
                                type="tel"
                                placeholder="(11) 99999-9999"
                                value={formData.clientPhone}
                                onChange={handleInputChange('clientPhone')}
                            />
                            <Input 
                                label="CPF / CNPJ" 
                                placeholder="000.000.000-00"
                                value={formData.clientDocument}
                                onChange={handleInputChange('clientDocument')}
                            />
                            <Input 
                                label="Profissão / Atividade" 
                                placeholder="Arquiteto"
                                value={formData.clientProfession}
                                onChange={handleInputChange('clientProfession')}
                            />
                            <Input 
                                label="Orçamento Estimado" 
                                placeholder="R$ 10.000,00"
                                value={formData.estimatedBudget}
                                onChange={handleInputChange('estimatedBudget')}
                            />
                            <div className="sm:col-span-2">
                                <Input 
                                    label="Preferência de Estilo" 
                                    placeholder="Moderno, Minimalista, Industrial..."
                                    value={formData.stylePreference}
                                    onChange={handleInputChange('stylePreference')}
                                />
                            </div>
                        </div>
                        <Textarea 
                            label="Observações Adicionais"
                            placeholder="Digite observações sobre o cliente ou projeto..."
                            rows={5}
                            value={formData.additionalNotes}
                            onChange={handleInputChange('additionalNotes')}
                        />
                    </div>
                </div>

                {/* Informações do Projeto */}
                <div className="flex flex-col gap-4">
                    <h1 className="font-semibold text-lg">Informações do Projeto</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Input 
                            label="Nome do Projeto *"
                            placeholder="Residência Silva"
                            value={formData.projectName}
                            onChange={handleInputChange('projectName')}
                        />
                        <Select 
                            label="Tipo *" 
                            options={projectTypeOptions}
                            placeholder="Selecione o tipo"
                            value={formData.projectType}
                            onChange={handleSelectChange('projectType')}
                            className="!bg-[#121417]"
                        />
                        <Select 
                            label="Status" 
                            options={projectStatusOptions}
                            placeholder="Selecione o status"
                            value={formData.projectStatus}
                            onChange={handleSelectChange('projectStatus')}
                            className="!bg-[#121417]"
                        />
                        <Input 
                            label="Área Total (m²)"
                            type="number"
                            placeholder="150"
                            value={formData.totalArea}
                            onChange={handleInputChange('totalArea')}
                        />

                        <div className="sm:col-span-2">
                            <Input 
                                label="Endereço Completo"
                                placeholder="Rua, Número, Bairro, Cidade - UF"
                                value={formData.fullAddress}
                                onChange={handleInputChange('fullAddress')}
                            />
                        </div>
                        <Input 
                            label="Pavimentos"
                            type="number"
                            placeholder="2"
                            value={formData.floors}
                            onChange={handleInputChange('floors')}
                        />
                        <Input 
                            label="Vagas de Garagem"
                            type="number"
                            placeholder="2"
                            value={formData.parkingSpaces}
                            onChange={handleInputChange('parkingSpaces')}
                        />
                    </div>
                </div>
            </div>
        </Box>
    );
}