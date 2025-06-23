# コンポーネント仕様

## 基本UIコンポーネント

### Button
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  size: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  children: ReactNode
  onClick?: () => void
}
```

### Input
```typescript
interface InputProps {
  variant: 'default' | 'filled' | 'minimal'
  size: 'sm' | 'md' | 'lg'
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'search'
  label?: string
  placeholder?: string
  prefix?: ReactNode
  suffix?: ReactNode
  error?: string
  hint?: string
  disabled?: boolean
  required?: boolean
  value?: string
  onChange?: (value: string) => void
}
```

### Card
```typescript
interface CardProps {
  variant: 'default' | 'bordered' | 'elevated' | 'flat'
  padding: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  clickable?: boolean
  children: ReactNode
  onClick?: () => void
}
```

### Select
```typescript
interface SelectOption {
  value: string
  label: string
  icon?: string
  disabled?: boolean
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  placeholder?: string
  searchable?: boolean
  multiple?: boolean
  disabled?: boolean
  error?: string
  onChange?: (value: string | string[]) => void
}
```

## レイアウトコンポーネント

### AppLayout
```typescript
interface AppLayoutProps {
  children: ReactNode
  sidebar?: ReactNode
  header?: ReactNode
  sidebarCollapsed?: boolean
  onSidebarToggle?: () => void
  className?: string
}
```

### PageHeader
```typescript
interface BreadcrumbItem {
  label: string
  href?: string
  icon?: string
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: string
  actions?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  className?: string
}
```

### Sidebar
```typescript
interface SidebarItem {
  id: string
  label: string
  icon: string
  href?: string
  badge?: string | number
  active?: boolean
  children?: SidebarItem[]
}

interface SidebarProps {
  items: SidebarItem[]
  collapsed?: boolean
  onItemClick?: (item: SidebarItem) => void
  className?: string
}
```

## フォームコンポーネント

### QuickExpenseForm
```typescript
interface StoreTemplate {
  id: string
  storeName: string
  category: string
  paymentMethod: string
  averageAmount: number
  frequentItems: string[]
  icon?: string
}

interface QuickExpenseData {
  storeName: string
  amount: number
  category: string
  paymentMethod: string
  date: string
  note?: string
}

interface QuickExpenseFormProps {
  onSubmit: (data: QuickExpenseData) => void
  storeTemplates?: StoreTemplate[]
  recentStores?: Store[]
  loading?: boolean
}
```

### DetailedExpenseForm
```typescript
interface ExpenseFormData {
  title: string
  category_id: string
  payment_method_id: string
  date: string
  memo?: string
  items: ExpenseItem[]
  tags?: string[]
}

interface ExpenseItem {
  item_name: string
  amount: number
  note?: string
}

interface DetailedExpenseFormProps {
  mode: 'create' | 'edit'
  initialData?: ExpenseFormData
  onSubmit: (data: ExpenseFormData) => void
  onSave?: (data: ExpenseFormData) => void // 下書き保存
  onCancel: () => void
  loading?: boolean
}
```

### ItemInput
```typescript
interface ItemTemplate {
  name: string
  averageAmount: number
  category: string
}

interface ItemInputProps {
  items: ExpenseItem[]
  onItemsChange: (items: ExpenseItem[]) => void
  templates?: ItemTemplate[]
  showSuggestions?: boolean
  maxItems?: number
}
```

## データ表示コンポーネント

### ExpenseList
```typescript
interface ExpenseFilters {
  dateRange?: [Date, Date]
  categories?: string[]
  paymentMethods?: string[]
  tags?: string[]
  searchQuery?: string
}

interface ExpenseListProps {
  expenses: ExpenseGroup[]
  viewMode: 'list' | 'card' | 'table'
  groupBy?: 'date' | 'category' | 'month' | 'none'
  filters?: ExpenseFilters
  loading?: boolean
  onExpenseClick?: (expense: ExpenseGroup) => void
  onEdit?: (expense: ExpenseGroup) => void
  onDelete?: (expense: ExpenseGroup) => void
  onFiltersChange?: (filters: ExpenseFilters) => void
}
```

### ExpenseCard
```typescript
interface ExpenseCardProps {
  expense: ExpenseGroup
  size: 'sm' | 'md' | 'lg'
  showDetails?: boolean
  showActions?: boolean
  onClick?: () => void
  onEdit?: () => void
  onDelete?: () => void
  className?: string
}
```

### StatCard
```typescript
interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeType?: 'increase' | 'decrease'
  icon?: ReactNode
  color?: 'primary' | 'success' | 'warning' | 'error'
  loading?: boolean
}
```

## チャート・分析コンポーネント

### AnalyticsDashboard
```typescript
interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string
  }[]
}

interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'doughnut'
  title: string
  data: ChartData
  options?: any
}

interface AnalyticsDashboardProps {
  period: 'week' | 'month' | 'year'
  data: AnalyticsData
  charts: ChartConfig[]
  loading?: boolean
}
```

### ExpenseChart
```typescript
interface ExpenseChartProps {
  type: 'line' | 'bar' | 'pie' | 'doughnut'
  data: ChartData
  title?: string
  height?: number
  responsive?: boolean
  options?: any
}
```

## 新機能コンポーネント

### StoreSelector
```typescript
interface Store {
  id: string
  name: string
  category: string
  averageAmount: number
  visitCount: number
  lastVisit?: Date
  isFavorite?: boolean
}

interface StoreSelectorProps {
  stores: Store[]
  selectedStore?: Store
  onStoreSelect: (store: Store) => void
  onNewStore: () => void
  searchable?: boolean
  showFavorites?: boolean
  maxSuggestions?: number
}
```

### TagInput
```typescript
interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  suggestions?: string[]
  maxTags?: number
  placeholder?: string
  disabled?: boolean
}
```

### TemplateManager
```typescript
interface ExpenseTemplate {
  id: string
  name: string
  category: string
  paymentMethod: string
  items: ExpenseItem[]
  tags: string[]
  createdAt: Date
  usageCount: number
}

interface TemplateManagerProps {
  templates: ExpenseTemplate[]
  onTemplateCreate: (template: Omit<ExpenseTemplate, 'id' | 'createdAt' | 'usageCount'>) => void
  onTemplateUse: (template: ExpenseTemplate) => void
  onTemplateEdit: (template: ExpenseTemplate) => void
  onTemplateDelete: (templateId: string) => void
}
```

## インタラクション・アニメーション

### LoadingSpinner
```typescript
interface LoadingSpinnerProps {
  size: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'white'
  className?: string
}
```

### Modal
```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size: 'sm' | 'md' | 'lg' | 'xl'
  children: ReactNode
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
}
```

### Toast
```typescript
interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  onClose?: () => void
}
```