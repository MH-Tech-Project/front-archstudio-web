# Select Component

Componente genérico de Select customizável e reutilizável.

## Características

- ✅ Totalmente genérico (suporta qualquer tipo de valor)
- ✅ Dropdown funcional com animações
- ✅ Opção selecionada com ícone de check
- ✅ Background cinza na opção selecionada
- ✅ Fecha ao clicar fora
- ✅ Suporte a ícone customizado
- ✅ Label e mensagens de erro
- ✅ Estado disabled
- ✅ Acessível e responsivo

## Uso Básico

```tsx
import { Select } from './components/Select';
import { FiLayers } from 'react-icons/fi';

const [version, setVersion] = useState('v1');

const versionOptions = [
  { label: 'Versão 1.0', value: 'v1' },
  { label: 'Versão 2.0', value: 'v2' },
  { label: 'Versão 3.0', value: 'v3' },
];

<Select
  label="Versão do Projeto"
  icon={FiLayers}
  options={versionOptions}
  value={version}
  onChange={setVersion}
  placeholder="Selecione a versão"
/>
```

## Com tipos customizados

```tsx
interface User {
  id: number;
  name: string;
}

const [selectedUser, setSelectedUser] = useState<User | undefined>();

const userOptions: SelectOption<User>[] = [
  { label: 'João Silva', value: { id: 1, name: 'João Silva' } },
  { label: 'Maria Santos', value: { id: 2, name: 'Maria Santos' } },
];

<Select<User>
  label="Selecione o usuário"
  options={userOptions}
  value={selectedUser}
  onChange={setSelectedUser}
/>
```

## Com validação

```tsx
const [status, setStatus] = useState('');
const [error, setError] = useState('');

const statusOptions = [
  { label: 'Ativo', value: 'active' },
  { label: 'Inativo', value: 'inactive' },
  { label: 'Pendente', value: 'pending' },
];

<Select
  label="Status"
  options={statusOptions}
  value={status}
  onChange={(value) => {
    setStatus(value);
    setError('');
  }}
  error={error}
  placeholder="Selecione o status"
/>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `options` | `SelectOption<T>[]` | **obrigatório** | Array de opções |
| `value` | `T` | `undefined` | Valor selecionado |
| `onChange` | `(value: T) => void` | `undefined` | Callback quando seleciona |
| `placeholder` | `string` | `"Selecione uma opção"` | Texto placeholder |
| `label` | `string` | `undefined` | Label do select |
| `icon` | `IconType` | `undefined` | Ícone do react-icons |
| `disabled` | `boolean` | `false` | Desabilita o select |
| `error` | `string` | `undefined` | Mensagem de erro |

## Interface SelectOption

```tsx
interface SelectOption<T = string> {
  label: string;  // Texto exibido
  value: T;       // Valor (qualquer tipo)
}
```
