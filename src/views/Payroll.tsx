import React from 'react';
import { CreditCard, Download, FileText, ChevronDown, DollarSign, Calendar } from 'lucide-react';

interface PayrollProps {
  onOpenGenerateInvoice: () => void;
}

const Payroll: React.FC<PayrollProps> = ({ onOpenGenerateInvoice }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payroll & Invoices</h1>
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-white/10 transition-all">
            <Download size={18} />
            Export All
          </button>
          <button 
            onClick={onOpenGenerateInvoice}
            className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20"
          >
            Generate Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#151619] border border-white/5 p-6 rounded-3xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold">Payout Summary</h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs">
                  <Calendar size={14} className="text-gray-500" />
                  <span>Oct 1 - Oct 31, 2023</span>
                  <ChevronDown size={14} className="text-gray-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="space-y-1">
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Total Payout</p>
                <p className="text-2xl font-bold text-white">$124,500.00</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Total Hours</p>
                <p className="text-2xl font-bold text-white">4,280h</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Employees</p>
                <p className="text-2xl font-bold text-white">156</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Recent Invoices</h4>
              {[
                { id: 'INV-2023-001', client: 'Acme Corp', amount: '$12,400', status: 'Paid', date: 'Oct 20, 2023' },
                { id: 'INV-2023-002', client: 'Global Tech', amount: '$8,200', status: 'Pending', date: 'Oct 18, 2023' },
                { id: 'INV-2023-003', client: 'Stark Ind', amount: '$15,000', status: 'Paid', date: 'Oct 15, 2023' },
              ].map((inv) => (
                <div key={inv.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-emerald-500 transition-colors">{inv.id}</p>
                      <p className="text-xs text-gray-500">{inv.client} • {inv.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{inv.amount}</p>
                    <span className={`text-[10px] font-bold uppercase ${inv.status === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#151619] border border-white/5 p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-6">Payment Methods</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <CreditCard size={64} />
                </div>
                <div className="relative z-10">
                  <p className="text-xs text-blue-200 mb-4">Primary Method</p>
                  <p className="text-lg font-mono text-white mb-6">•••• •••• •••• 4242</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-blue-200 uppercase">Card Holder</p>
                      <p className="text-sm font-bold text-white">Sarah Connor</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-blue-200 uppercase">Expires</p>
                      <p className="text-sm font-bold text-white">12/25</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full py-3 border border-dashed border-white/10 rounded-2xl text-gray-500 text-sm hover:border-emerald-500/50 hover:text-emerald-500 transition-all">
                + Add New Method
              </button>
            </div>
          </div>

          <div className="bg-[#151619] border border-white/5 p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-6">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Next Payout</span>
                <span className="text-sm font-bold text-white">Nov 1, 2023</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Processing Fee</span>
                <span className="text-sm font-bold text-white">2.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Tax Withheld</span>
                <span className="text-sm font-bold text-white">$12,450.00</span>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-sm font-bold text-white">Net Payout</span>
                <span className="text-lg font-bold text-emerald-500">$112,050.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
