import { Box } from "../Box";
import Input from "../Input";
import { Select, type SelectOption } from "../Select";
import Textarea from "../Textarea";

export interface ProjectFormData {
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

export const projectTypeOptions: SelectOption[] = [
    { label: "Residencial", value: "residential" },
    { label: "Comercial", value: "commercial" },
    { label: "Industrial", value: "industrial" },
    { label: "Institucional", value: "institutional" },
    { label: "Reforma", value: "renovation" },
    { label: "Interiores", value: "interior" },
    { label: "Paisagismo", value: "landscape" },
];

export const projectStatusOptions: SelectOption[] = [
    { label: "Briefing", value: "briefing" },
    { label: "Em Desenvolvimento", value: "development" },
    { label: "Revisão", value: "review" },
    { label: "Aprovação", value: "approval" },
    { label: "Execução", value: "execution" },
    { label: "Finalizado", value: "finished" },
    { label: "Pausado", value: "paused" },
];

export const emptyProjectFormData: ProjectFormData = {
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
};

interface ProjectFormProps {
    data: ProjectFormData;
    onChange: (data: ProjectFormData) => void;
    disabled?: boolean;
}

export function ProjectForm({ data, onChange, disabled = false }: ProjectFormProps) {
    const handleInputChange = (field: keyof ProjectFormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        onChange({
            ...data,
            [field]: e.target.value
        });
    };

    const handleSelectChange = (field: keyof ProjectFormData) => (value: string) => {
        onChange({
            ...data,
            [field]: value
        });
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
                                value={data.clientName}
                                onChange={handleInputChange('clientName')}
                                propsInput={{ disabled }}
                            />
                            <Input 
                                label="Email" 
                                type="email"
                                placeholder="contato@email.com"
                                value={data.clientEmail}
                                onChange={handleInputChange('clientEmail')}
                                propsInput={{ disabled }}
                            />
                            <Input 
                                label="Telefone" 
                                type="tel"
                                placeholder="(11) 99999-9999"
                                value={data.clientPhone}
                                onChange={handleInputChange('clientPhone')}
                                propsInput={{ disabled }}
                            />
                            <Input 
                                label="CPF / CNPJ" 
                                placeholder="000.000.000-00"
                                value={data.clientDocument}
                                onChange={handleInputChange('clientDocument')}
                                propsInput={{ disabled }}
                            />
                            <Input 
                                label="Profissão / Atividade" 
                                placeholder="Arquiteto"
                                value={data.clientProfession}
                                onChange={handleInputChange('clientProfession')}
                                propsInput={{ disabled }}
                            />
                            <Input 
                                label="Orçamento Estimado" 
                                placeholder="R$ 10.000,00"
                                value={data.estimatedBudget}
                                onChange={handleInputChange('estimatedBudget')}
                                propsInput={{ disabled }}
                            />
                            <div className="sm:col-span-2">
                                <Input 
                                    label="Preferência de Estilo" 
                                    placeholder="Moderno, Minimalista, Industrial..."
                                    value={data.stylePreference}
                                    onChange={handleInputChange('stylePreference')}
                                    propsInput={{ disabled }}
                                />
                            </div>
                        </div>
                        <Textarea 
                            label="Observações Adicionais"
                            placeholder="Digite observações sobre o cliente ou projeto..."
                            rows={5}
                            value={data.additionalNotes}
                            onChange={handleInputChange('additionalNotes')}
                            disabled={disabled}
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
                            value={data.projectName}
                            onChange={handleInputChange('projectName')}
                            propsInput={{ disabled }}
                        />
                        <Select 
                            label="Tipo *" 
                            options={projectTypeOptions}
                            placeholder="Selecione o tipo"
                            value={data.projectType}
                            onChange={handleSelectChange('projectType')}
                            disabled={disabled}
                            className="!bg-[#121417]"
                        />
                        <Select 
                            label="Status" 
                            options={projectStatusOptions}
                            placeholder="Selecione o status"
                            value={data.projectStatus}
                            onChange={handleSelectChange('projectStatus')}
                            disabled={disabled}
                            className="!bg-[#121417]"
                        />
                        <Input 
                            label="Área Total (m²)"
                            type="number"
                            placeholder="150"
                            value={data.totalArea}
                            onChange={handleInputChange('totalArea')}
                            propsInput={{ disabled }}
                        />

                        <div className="sm:col-span-2">
                            <Input 
                                label="Endereço Completo"
                                placeholder="Rua, Número, Bairro, Cidade - UF"
                                value={data.fullAddress}
                                onChange={handleInputChange('fullAddress')}
                                propsInput={{ disabled }}
                            />
                        </div>
                        <Input 
                            label="Pavimentos"
                            type="number"
                            placeholder="2"
                            value={data.floors}
                            onChange={handleInputChange('floors')}
                            propsInput={{ disabled }}
                        />
                        <Input 
                            label="Vagas de Garagem"
                            type="number"
                            placeholder="2"
                            value={data.parkingSpaces}
                            onChange={handleInputChange('parkingSpaces')}
                            propsInput={{ disabled }}
                        />
                    </div>
                </div>
            </div>
        </Box>
    );
}