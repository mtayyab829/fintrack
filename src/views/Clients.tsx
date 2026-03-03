import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Mail, Phone, Globe, Briefcase, DollarSign } from 'lucide-react';
import CreateClientModal from '../components/Modals/CreateClientModal';
import { useToast } from '../components/Toast';

const clients = [
  { 
    id: 1, 
    name: 'Acme Corp', 
    industry: 'Technology', 
    projects: 4, 
    revenue: '$124,500', 
    status: 'Active',
    email: 'contact@acme.com',
    website: 'acme.com',
    logo: 'https://picsum.photos/seed/acme/100/100'
  },
  { 
    id: 2, 
    name: 'Global Industries', 
    industry: 'Manufacturing', 
    projects: 2, 
    revenue: '$85,200', 
    status: 'Active',
    email: 'info@global.com',
    website: 'global-ind.com',
    logo: 'https://picsum.photos/seed/global/100/100'
  },
  { 
    id: 3, 
    name: 'Stark Enterprises', 
    industry: 'Defense', 
    projects: 1, 
    revenue: '$250,000', 
    status: 'Active',
    email: 'tony@stark.com',
    website: 'stark.com',
    logo: 'https://picsum.photos/seed/stark/100/100'
  },
  { 
    id: 4, 
    name: 'Wayne Enterprises', 
    industry: 'Multi-sector', 
    projects: 3, 
    revenue: '$190,000', 
    status: 'On Hold',
    email: 'bruce@wayne.com',
    website: 'wayne.com',
    logo: 'https://picsum.photos/seed/wayne/100/100'
  },
];

const Clients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Client Directory</h1>
          <p className="text-gray-500 text-sm">Manage your client relationships and billing history.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          <Plus size={18} />
          Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Clients', value: '48', color: 'text-blue-500' },
          { label: 'Active Projects', value: '124', color: 'text-emerald-500' },
          { label: 'Total Revenue', value: '$1.2M', color: 'text-purple-500' },
          { label: 'Outstanding', value: '$45k', color: 'text-amber-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#151619] border border-white/5 p-6 rounded-3xl">
            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
            <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-[#151619] border border-white/5 rounded-3xl p-6 hover:border-emerald-500/30 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="w-16 h-16 rounded-2xl object-cover border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-500 transition-colors">{client.name}</h3>
                  <p className="text-gray-500 text-sm">{client.industry}</p>
                </div>
              </div>
              <button className="p-2 text-gray-500 hover:text-white transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 p-3 rounded-2xl">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                  <Briefcase size={14} />
                  Projects
                </div>
                <p className="text-lg font-bold text-white">{client.projects}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                  <DollarSign size={14} />
                  Revenue
                </div>
                <p className="text-lg font-bold text-emerald-500">{client.revenue}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={16} />
                {client.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Globe size={16} />
                {client.website}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-lg ${
                client.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
              }`}>
                {client.status}
              </span>
              <button className="text-emerald-500 text-sm font-medium hover:underline">
                View Billing History
              </button>
            </div>
          </div>
        ))}
      </div>

      <CreateClientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={(msg) => showToast(msg, 'success')}
      />
    </div>
  );
};

export default Clients;
