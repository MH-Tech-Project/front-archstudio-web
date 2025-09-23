# Sistema de Cores - ArchStudio Pro

Este documento detalha o sistema de cores personalizado implementado para o projeto.

## 🎨 Cores Disponíveis

### Cores Principais
- `bg-primary` / `text-primary` - Cor principal dourada (#D4A853 dark / #B8941C light)
- `bg-primary-hover` / `text-primary-hover` - Hover da cor principal (#C49A47 dark / #A0821A light)
- `bg-secondary` / `text-secondary` - Cor secundária (#EFA339 dark / #D4881F light)

### Backgrounds
- `bg-background` - Fundo principal (#161A22 dark / #FFFFFF light)
- `bg-background-contrast` - Fundo com contraste (#E8EAED dark / #1A1D23 light)

### Sistema de Cinzas
- `bg-gray` / `text-gray` - Cinza padrão (#9FA3AD dark / #6B7280 light)
- `bg-gray-500` / `text-gray-500` - Alias para bg-gray
- `bg-gray-900` / `text-gray-900` - Cinza mais escuro/claro (#34373D dark / #F9FAFB light)

### Textos
- `text-foreground` - Texto principal (se adapta ao tema)
- `text-white` - Texto branco/escuro que se adapta ao tema

### Elementos de UI
- `bg-card` - Fundo de cards
- `bg-muted` - Fundo silenciado
- `text-muted-foreground` - Texto silenciado
- `border-border` - Bordas
- `bg-accent` / `text-accent` - Cor de destaque

## 🔄 Como Funciona

O sistema utiliza CSS Custom Properties (variáveis CSS) que mudam automaticamente baseado na classe do tema aplicada no elemento `<html>`:

- **Dark Mode** (padrão): Sem classe ou com classe `dark`
- **Light Mode**: Com classe `light`

## 💡 Exemplos de Uso

```tsx
// Botão primário
<button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded">
  Botão Primário
</button>

// Card com tema adaptativo
<div className="bg-card border border-border p-4 rounded-lg">
  <h3 className="text-foreground">Título</h3>
  <p className="text-muted-foreground">Descrição</p>
</div>

// Link com hover
<a className="text-foreground hover:text-primary transition-colors">
  Link
</a>

// Background gradiente
<div className="bg-gradient-primary">
  Gradiente personalizado
</div>
```

## 🚀 Vantagens

1. **Consistência**: Todas as cores seguem o mesmo padrão
2. **Manutenibilidade**: Mudanças centralizadas nas CSS variables
3. **Acessibilidade**: Contraste adequado para ambos os temas
4. **Performance**: Transições suaves entre temas
5. **Flexibilidade**: Fácil adição de novas cores ao sistema

## ⚙️ Configuração Técnica

O sistema está configurado em:
- `src/index.css` - CSS Variables para ambos os temas
- `tailwind.config.js` - Mapeamento das cores para o Tailwind
- `src/utils/theme.ts` - Utilitários para alternância de tema