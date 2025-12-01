import { Box } from "../Box";
import Input from "../Input";
import Textarea from "../Textarea";

export function ProjectForm() {
    return(
        <Box>
            <div className="flex flex-col gap-4">
                <h1 className="font-semibold text-lg">Informações do Cliente</h1>
                <div className="w-full flex flex-col gap-4">
                    <div className="grid grid-cols-4 gap-4">
                        <Input label="Nome / Razão Social *" placeholder="arch studio pro LTDA"/>
                        <Input label="Email" placeholder="contato@email.com"/>
                        <Input label="Telefone" placeholder="11 99999-9999"/>
                        <Input label="CPF / CNPJ" placeholder="000.000.000-00 / 00.000.000/0000-00"/>
                        <Input label="Profissão / Atividade" placeholder="Arquiteto"/>
                        <Input label="Orçamento Estimado" placeholder="R$ 10.000,00"/>
                        <div className="col-span-2">
                            <Input label="Preferência de Estilo" placeholder="moderno"/>
                        </div>
                    </div>
                    <Textarea 
                        label="Observações Adicionais"
                        placeholder="Digite observações sobre o cliente ou projeto..."
                        rows={5}
                    />
                </div>
            </div>
        </Box>
    )
}