import React, { useState } from 'react';
import { 
  INITIAL_STATS, 
  INITIAL_INVOICES, 
  INITIAL_BILLS, 
  INITIAL_MOST_USED_ITEMS, 
  INITIAL_LOW_STOCK_ALERTS, 
  INITIAL_EMPLOYEES, 
  INITIAL_TAX_DEADLINES 
} from './data/initialData';
import { 
  TabType, 
  BusinessStats, 
  InvoiceItem, 
  BillItem, 
  InventoryItem, 
  LowStockActionItem, 
  EmployeePayroll, 
  TaxDeadline 
} from './types';
import { TopNavBar } from './components/TopNavBar';
import { SideNavBar } from './components/SideNavBar';
import { OverviewScreen } from './components/screens/OverviewScreen';
import { InventoryScreen } from './components/screens/InventoryScreen';
import { PayrollScreen } from './components/screens/PayrollScreen';
import { IncomeScreen } from './components/screens/IncomeScreen';
import { ExpensesScreen } from './components/screens/ExpensesScreen';
import { ReportsScreen } from './components/screens/ReportsScreen';
import { ProfileSettingsScreen } from './components/screens/ProfileSettingsScreen';

// Modals
import { NewItemModal } from './components/modals/NewItemModal';
import { RestockModal } from './components/modals/RestockModal';
import { RunPayrollModal } from './components/modals/RunPayrollModal';
import { PayStubModal } from './components/modals/PayStubModal';
import { SendReminderModal } from './components/modals/SendReminderModal';
import { InvoicesModal } from './components/modals/InvoicesModal';
import { BillsModal } from './components/modals/BillsModal';
import { UpgradePlanModal } from './components/modals/UpgradePlanModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Application Data States
  const [stats, setStats] = useState<BusinessStats>(INITIAL_STATS);
  const [invoices, setInvoices] = useState<InvoiceItem[]>(INITIAL_INVOICES);
  const [bills, setBills] = useState<BillItem[]>(INITIAL_BILLS);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(INITIAL_MOST_USED_ITEMS);
  const [lowStockActions, setLowStockActions] = useState<LowStockActionItem[]>(INITIAL_LOW_STOCK_ALERTS);
  const [employees, setEmployees] = useState<EmployeePayroll[]>(INITIAL_EMPLOYEES);
  const [deadlines, setDeadlines] = useState<TaxDeadline[]>(INITIAL_TAX_DEADLINES);

  // Modals States
  const [newItemModalOpen, setNewItemModalOpen] = useState(false);
  const [restockModalItem, setRestockModalItem] = useState<LowStockActionItem | null>(null);
  const [runPayrollModalOpen, setRunPayrollModalOpen] = useState(false);
  const [payStubModalEmployee, setPayStubModalEmployee] = useState<EmployeePayroll | null>(null);
  const [sendReminderModalInvoice, setSendReminderModalInvoice] = useState<InvoiceItem | null>(null);
  const [invoicesModalOpen, setInvoicesModalOpen] = useState(false);
  const [billsModalOpen, setBillsModalOpen] = useState(false);
  const [upgradePlanModalOpen, setUpgradePlanModalOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Inventory Handlers
  const handleAddNewItem = (itemData: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: `item-${Date.now()}`,
    };
    setInventoryItems((prev) => [newItem, ...prev]);
    setStats((prev) => ({
      ...prev,
      totalSkus: prev.totalSkus + 1,
      totalInventoryItems: prev.totalInventoryItems + newItem.inStock,
    }));
    addToast('success', `Created inventory SKU "${newItem.name}" (#${newItem.sku})`);
  };

  const handleRestockClick = (actionItem: LowStockActionItem) => {
    setRestockModalItem(actionItem);
  };

  const handleConfirmRestock = (actionItem: LowStockActionItem, quantity: number) => {
    // Update inventory item stock
    setInventoryItems((prev) =>
      prev.map((item) => {
        if (item.sku === actionItem.sku) {
          return {
            ...item,
            inStock: item.inStock + quantity,
            lastRestocked: 'Just now',
          };
        }
        return item;
      })
    );

    // Remove or lower low stock action
    setLowStockActions((prev) => prev.filter((a) => a.id !== actionItem.id));
    setStats((prev) => ({
      ...prev,
      criticalReordersCount: Math.max(0, prev.criticalReordersCount - 1),
    }));

    addToast(
      'success',
      `Restock PO created: +${quantity} units of ${actionItem.name} ordered from ${actionItem.supplier}`
    );
  };

  // Invoices & Reminders Handlers
  const handleSendReminderClick = (invoice: InvoiceItem) => {
    setSendReminderModalInvoice(invoice);
  };

  const handleConfirmSendReminder = (invoice: InvoiceItem, _customMessage: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoice.id ? { ...inv, status: 'reminded' } : inv
      )
    );
    addToast('info', `Payment reminder sent to ${invoice.client} for invoice ${invoice.invoiceNumber}`);
  };

  const handleMarkInvoicePaid = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId ? { ...inv, status: 'paid', isOverdue: false } : inv
      )
    );
    addToast('success', 'Invoice marked as paid! Revenue ledger updated.');
  };

  const handleNewInvoice = (newInvData: Omit<InvoiceItem, 'id'>) => {
    const newInv: InvoiceItem = {
      ...newInvData,
      id: `inv-${Date.now()}`,
    };
    setInvoices((prev) => [newInv, ...prev]);
    addToast('success', `Issued invoice ${newInv.invoiceNumber} for $${newInv.amount.toLocaleString()}`);
  };

  // Bills & Payables Handlers
  const handlePayBill = (billId: string) => {
    const billToPay = bills.find((b) => b.id === billId);
    if (!billToPay) return;

    setBills((prev) =>
      prev.map((b) => (b.id === billId ? { ...b, status: 'paid' } : b))
    );
    setStats((prev) => ({
      ...prev,
      pendingBillsTotal: Math.max(0, prev.pendingBillsTotal - billToPay.amount),
    }));
    addToast('success', `Settled bill for ${billToPay.vendor} ($${billToPay.amount.toLocaleString()})`);
  };

  const handleNewBill = (newBillData: Omit<BillItem, 'id'>) => {
    const newBill: BillItem = {
      ...newBillData,
      id: `bill-${Date.now()}`,
    };
    setBills((prev) => [newBill, ...prev]);
    setStats((prev) => ({
      ...prev,
      pendingBillsTotal: prev.pendingBillsTotal + newBill.amount,
    }));
    addToast('success', `Logged bill for ${newBill.vendor} ($${newBill.amount.toLocaleString()})`);
  };

  // Payroll Handlers
  const handleRunPayrollConfirm = () => {
    addToast('success', 'Direct deposit batch confirmed and transmitted to financial institution.');
  };

  const handleViewPayStub = (employee: EmployeePayroll) => {
    setPayStubModalEmployee(employee);
  };

  // Global Actions & Exports
  const handleExportData = (type: string) => {
    addToast('info', `Exporting ${type} report to CSV/PDF download...`);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b] flex flex-col font-sans selection:bg-indigo-500/20">
      {/* Fixed/Sticky Top Navigation Header */}
      <TopNavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenUpgradeModal={() => setUpgradePlanModalOpen(true)}
      />

      {/* Main Container Layout */}
      <div className="flex-1 flex w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
        {/* Left Side Navigation */}
        <SideNavBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          lowStockCount={lowStockActions.length}
        />

        {/* Dynamic Screen Viewport Area */}
        <main className="flex-1 min-w-0 pb-16">
          {activeTab === 'overview' && (
            <OverviewScreen
              stats={stats}
              invoices={invoices}
              bills={bills}
              setActiveTab={setActiveTab}
              onSendReminder={handleSendReminderClick}
              onReviewBills={() => setBillsModalOpen(true)}
              onViewAllInvoices={() => setInvoicesModalOpen(true)}
            />
          )}

          {activeTab === 'inventory' && (
            <InventoryScreen
              stats={stats}
              items={inventoryItems}
              alerts={lowStockActions}
              onOpenNewItemModal={() => setNewItemModalOpen(true)}
              onOpenRestockModal={handleRestockClick}
              onExportInventory={() => handleExportData('Inventory')}
              onViewAllAlerts={() => addToast('info', `Displaying all ${lowStockActions.length} buffer alerts.`)}
            />
          )}

          {activeTab === 'payroll' && (
            <PayrollScreen
              stats={stats}
              employees={employees}
              deadlines={deadlines}
              onRunPayroll={() => setRunPayrollModalOpen(true)}
              onExportTaxForms={() => handleExportData('IRS Form 941 Tax Forms')}
              onViewPayStub={handleViewPayStub}
              onViewAllPayStubs={() => addToast('info', 'Viewing all employee records.')}
              onConfigureAutoPay={() => addToast('success', 'Automated IRS & State tax auto-filing configured.')}
            />
          )}

          {activeTab === 'income' && (
            <IncomeScreen
              invoices={invoices}
              stats={stats}
              onSendReminder={handleSendReminderClick}
              onNewInvoice={handleNewInvoice}
              onMarkPaid={handleMarkInvoicePaid}
              onExportInvoices={() => handleExportData('Invoices & Receivables')}
            />
          )}

          {activeTab === 'expenses' && (
            <ExpensesScreen
              bills={bills}
              stats={stats}
              onPayBill={handlePayBill}
              onNewBill={handleNewBill}
              onExportBills={() => handleExportData('Accounts Payable & Bills')}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsScreen
              stats={stats}
              onExportReport={() => handleExportData('P&L Balance Statement')}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileSettingsScreen
              onOpenUpgradeModal={() => setUpgradePlanModalOpen(true)}
              onSaveProfile={() => addToast('success', 'Entity profile settings successfully saved!')}
            />
          )}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <NewItemModal
        isOpen={newItemModalOpen}
        onClose={() => setNewItemModalOpen(false)}
        onAddItem={handleAddNewItem}
      />

      <RestockModal
        item={restockModalItem}
        isOpen={!!restockModalItem}
        onClose={() => setRestockModalItem(null)}
        onConfirmRestock={handleConfirmRestock}
      />

      <RunPayrollModal
        isOpen={runPayrollModalOpen}
        onClose={() => setRunPayrollModalOpen(false)}
        employees={employees}
        stats={stats}
        onConfirmPayroll={handleRunPayrollConfirm}
      />

      <PayStubModal
        employee={payStubModalEmployee}
        isOpen={!!payStubModalEmployee}
        onClose={() => setPayStubModalEmployee(null)}
        onPrintOrDownload={() => {
          addToast('success', `Downloaded PDF paystub for ${payStubModalEmployee?.name}`);
          setPayStubModalEmployee(null);
        }}
      />

      <SendReminderModal
        invoice={sendReminderModalInvoice}
        isOpen={!!sendReminderModalInvoice}
        onClose={() => setSendReminderModalInvoice(null)}
        onConfirmSend={handleConfirmSendReminder}
      />

      <InvoicesModal
        invoices={invoices}
        isOpen={invoicesModalOpen}
        onClose={() => setInvoicesModalOpen(false)}
        onSendReminder={handleSendReminderClick}
        onMarkPaid={handleMarkInvoicePaid}
      />

      <BillsModal
        bills={bills}
        isOpen={billsModalOpen}
        onClose={() => setBillsModalOpen(false)}
        onPayBill={handlePayBill}
      />

      <UpgradePlanModal
        isOpen={upgradePlanModalOpen}
        onClose={() => setUpgradePlanModalOpen(false)}
        onSelectPlan={(plan) => {
          addToast('success', `Plan updated to ${plan}! Features are now unlocked.`);
          setUpgradePlanModalOpen(false);
        }}
      />

      {/* Global Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
