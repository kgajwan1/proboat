export type ActiveTab = 
  | 'overview' 
  | 'inventory' 
  | 'payroll' 
  | 'income' 
  | 'expenses' 
  | 'reports' 
  | 'profile' 
  | 'settings';

export type TabType = ActiveTab;

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: 'Office Supplies' | 'Pantry' | 'Packaging' | 'IT Equipment' | 'Hardware';
  inStock: number;
  threshold: number;
  unitPrice: number;
  iconType: 'print' | 'coffee_maker' | 'edit' | 'local_shipping' | 'mouse' | 'monitor' | 'box';
  lastRestocked?: string;
}

export interface LowStockActionItem {
  id: string;
  name: string;
  sku: string;
  inStock: number;
  threshold: number;
  severity: 'critical' | 'low';
  category: string;
  unitCost: number;
  supplier: string;
  suggestedReorder: number;
}

export interface InvoiceItem {
  id: string;
  client: string;
  initial: string;
  amount: number;
  dueDateText: string;
  dueDate: string;
  isOverdue: boolean;
  status: 'due' | 'reminded' | 'paid' | 'not_due';
  avatarColor: 'primary' | 'secondary' | 'neutral';
  items?: string[];
  invoiceNumber: string;
}

export interface BillItem {
  id: string;
  vendor: string;
  category: string;
  amount: number;
  dueDate: string;
  isDueSoon: boolean;
  status: 'pending' | 'paid';
  accountNumber: string;
}

export interface EmployeePayroll {
  id: string;
  name: string;
  role: string;
  initials: string;
  badgeColor: 'primary' | 'tertiary' | 'secondary';
  grossPay: number;
  taxDeduction: number;
  netPay: number;
  payDate: string;
  hoursWorked?: number;
  directDepositAccount: string;
  taxBreakdown: {
    federal: number;
    state: number;
    fica: number;
    medicare: number;
  };
}

export interface TaxDeadline {
  id: string;
  title: string;
  subtitle: string;
  month: string;
  day: string;
  isUrgent?: boolean;
  status: 'upcoming' | 'completed';
}

export interface BusinessStats {
  totalRevenue: number;
  revenueGrowthPct: number;
  pendingBillsTotal: number;
  pendingBillsCount: number;
  dueSoonBillsCount: number;
  expectedIncome: number;
  expectedExpenses: number;
  projectedProfit: number;
  totalInventoryItems: number;
  totalSkus: number;
  lowStockAlertsCount: number;
  totalMonthlyPayroll: number;
  totalTaxesWithheld: number;
  ytdTaxContributions: number;
  annualTaxEstimate: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}
