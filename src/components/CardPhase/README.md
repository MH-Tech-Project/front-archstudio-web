# CardPhase - Componente de Fase do Projeto

Componente completo para gerenciar fases de projeto com todas as funcionalidades necessárias.

## ✨ Funcionalidades

### 📝 Edição de Fase
- ✅ Nome da fase editável (input inline)
- ✅ Quantidade de semanas editável
- ✅ Toggle para fase independente
- ✅ Data de início customizável para fases independentes
- ✅ Expandir/colapsar conteúdo
- ✅ Deletar fase
- ✅ Drag handle para reordenação (visual)

### 📊 Datas Automáticas
- ✅ Data de início calculada baseada na fase anterior
- ✅ Data de término calculada (início + semanas)
- ✅ Fases independentes não afetam o cronograma das próximas
- ✅ Exibição de datas formatadas (dd/mm)

### 🎯 Marcos (Milestones)
- ✅ Adicionar marcos com nome e data
- ✅ Marcar/desmarcar como concluído
- ✅ Deletar marcos
- ✅ Exibição de data de conclusão
- ✅ Estilo visual diferenciado para concluídos

### 📈 Barra de Progresso
- ✅ Baseada na quantidade de semanas
- ✅ Visual com gradiente laranja
- ✅ Indicador de duração

## 🎨 Layout

Baseado no design do Lovable com melhorias:
- Header compacto com controles inline
- Grid responsivo para datas e semanas
- Barra de progresso visual
- Lista de marcos organizada
- Formulário inline para adicionar marcos

## 📦 Props

```tsx
interface CardPhaseProps {
    phase: ProjectPhase;                    // Dados da fase
    startDate: string;                      // Data de início (calculada no pai)
    endDate: string;                        // Data de término (calculada no pai)
    onUpdatePhase: (id, data) => void;      // Atualizar dados da fase
    onDeletePhase: (id) => void;            // Deletar fase
    onMovePhase?: (id, direction) => void;  // Mover fase (up/down)
    onAddMilestone: (id, milestone) => void;// Adicionar marco
    onDeleteMilestone: (id, milestoneId) => void; // Deletar marco
    canMoveUp?: boolean;                    // Pode mover para cima
    canMoveDown?: boolean;                  // Pode mover para baixo
}
```

**Arquitetura:** O cálculo das datas é feito no componente pai usando `calculatePhasesTimeline()` 
do `utils/project.ts`. O CardPhase apenas renderiza os dados recebidos.

## 🔧 Como Usar

### Exemplo Básico

```tsx
import { CardPhase } from './components/CardPhase';
import { calculatePhasesTimeline } from './utils/project';

function ProjectTimeline() {
    const [phases, setPhases] = useState<ProjectPhase[]>([...]);
    const projectStartDate = "2025-09-01";

    // Calcular timeline (memoizado para performance)
    const timeline = useMemo(() => 
        calculatePhasesTimeline(phases, projectStartDate),
        [phases, projectStartDate]
    );

    const handleUpdatePhase = (phaseId: string, data: Partial<ProjectPhase>) => {
        setPhases(prev => prev.map(p => 
            p.id === phaseId ? { ...p, ...data } : p
        ));
    };

    // ... outros handlers

    return (
        <div className="space-y-4">
            {timeline.map((item, index) => (
                <CardPhase
                    key={item.phase.id}
                    phase={item.phase}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    onUpdatePhase={handleUpdatePhase}
                    onDeletePhase={handleDeletePhase}
                    onAddMilestone={handleAddMilestone}
                    onDeleteMilestone={handleDeleteMilestone}
                    canMoveUp={index > 0}
                    canMoveDown={index < timeline.length - 1}
                />
            ))}
        </div>
    );
}
```

**Exemplo completo em:** `src/pages/ProjectTimeline/index.tsx`

## 🔄 Fluxo de Datas

1. Projeto começa em uma data base (ex: 01/09/2025)
2. Primeira fase começa nessa data
3. Fase dura X semanas → data de término calculada
4. Próxima fase começa quando a anterior termina
5. **EXCETO** fases independentes:
   - Têm data de início customizável
   - Não afetam cronograma das próximas fases

## 🎯 Funcionalidades Implementadas

- ✅ Nome editável inline
- ✅ Input de semanas
- ✅ Toggle independente
- ✅ Data customizável para independentes
- ✅ Cálculo automático de datas
- ✅ Barra de progresso visual
- ✅ Adicionar/deletar marcos
- ✅ Campo de texto + data para marcos
- ✅ Checkbox para marcar marcos
- ✅ Expandir/colapsar
- ✅ Botão deletar fase
- ✅ Drag handle visual

## 🚀 Próximas Melhorias

- [ ] Drag and drop funcional para reordenar
- [ ] Validação de datas
- [ ] Conflitos de datas independentes
- [ ] Gantt chart visualization
- [ ] Export para PDF/Excel
