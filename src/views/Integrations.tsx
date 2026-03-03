import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  HelpCircle, 
  ExternalLink,
  DollarSign,
  Zap,
  Clock,
  Briefcase,
  Users,
  Settings,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';

const Integrations = () => {
  const [activeTab, setActiveTab] = useState('Integrations');

  const integrationCards = [
    {
      name: 'deel.',
      description: 'Connect WebWork with Deel and automate the process of sending timesheets.',
      logo: 'https://www.deel.com/hubfs/deel-logo-blue.svg', // Placeholder-ish but text-based in screenshot
      type: 'Finance'
    },
    {
      name: 'remote',
      description: 'Connect WebWork with Remote and send payment incentives in just a few clicks, directly from WebWork.',
      logo: 'https://remote.com/remote-logo.svg',
      type: 'Finance'
    },
    {
      name: 'INTUIT quickbooks',
      description: 'Connect WebWork with Quickbooks and send payment incentives in just a few clicks, directly from WebWork.',
      logo: 'https://quickbooks.intuit.com/logo.svg',
      type: 'Finance'
    },
    {
      name: 'bitwage',
      description: 'Pay your employees in their preferred mix of Bitcoin, cryptocurrency, and local currencies.',
      logo: 'https://www.bitwage.com/logo.svg',
      type: 'Finance'
    },
    {
      name: 'xero',
      description: 'Connect WebWork with Xero and automate the process of sending invoices.',
      logo: 'https://www.xero.com/logo.svg',
      type: 'Finance'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-6">
        <h1 className="text-2xl font-bold text-white">Integrations</h1>
      </div>

      <div className="flex gap-8 border-b border-white/5 mb-8">
        {['Integrations', 'Migrations', 'Perks'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-bold transition-all ${
              activeTab === tab ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 mb-8">
        <div className="relative">
          <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none pr-10 min-w-[200px]">
            <option>All Integrations</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all w-64"
          />
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-2 text-orange-400">
          <DollarSign size={20} />
          <h2 className="text-lg font-bold">Finance</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrationCards.map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#151619] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center group hover:border-indigo-500/30 transition-all"
            >
              <div className="h-16 flex items-center justify-center mb-8">
                {/* Logo Placeholder based on screenshot style */}
                <span className="text-3xl font-black text-white tracking-tighter">
                  {card.name === 'deel.' && <span className="text-white">deel<span className="text-indigo-500">.</span></span>}
                  {card.name === 'remote' && <span className="flex items-center gap-2 text-indigo-500"><Zap size={32} fill="currentColor" /> remote</span>}
                  {card.name === 'INTUIT quickbooks' && <span className="flex items-center gap-2 text-white"><span className="bg-emerald-500 p-1 rounded text-white"><DollarSign size={24} /></span> quickbooks</span>}
                  {card.name === 'bitwage' && <span className="text-white">bitwage</span>}
                  {card.name === 'xero' && <span className="text-white flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-sky-400" /> xero</span>}
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 min-h-[48px]">
                {card.description}
              </p>
              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20">
                Enable
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Integrations;
