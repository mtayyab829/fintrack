import React from 'react';
import { User, Globe, Shield, Bell, ChevronRight, ArrowLeft, Camera, Save, Palette, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from '../components/Toast';

const Settings = () => {
  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  const { showToast } = useToast();

  const sections = [
    { id: 'profile', label: 'Profile Settings', icon: User, desc: 'Manage your personal information and avatar', color: 'text-emerald-500' },
    { id: 'workspace', label: 'Workspace', icon: Globe, desc: 'Configure company details and branding', color: 'text-blue-500' },
    { id: 'security', label: 'Security', icon: Shield, desc: 'Manage passwords and two-factor authentication', color: 'text-purple-500' },
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Configure how you receive alerts', color: 'text-amber-500' },
    { id: 'appearance', label: 'Appearance', icon: Palette, desc: 'Customize the look and feel of your dashboard', color: 'text-pink-500' },
    { id: 'data', label: 'Data & Privacy', icon: Database, desc: 'Manage your data exports and privacy settings', color: 'text-indigo-500' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Settings saved successfully');
    setActiveSection(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        {activeSection && (
          <button 
            onClick={() => setActiveSection(null)}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-500 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold">{activeSection ? sections.find(s => s.id === activeSection)?.label : 'Account Settings'}</h1>
          {!activeSection && <p className="text-gray-500 text-sm">Manage your account preferences and workspace configuration</p>}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!activeSection ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 gap-4"
          >
            {sections.map((section) => (
              <div 
                key={section.id} 
                onClick={() => setActiveSection(section.id)}
                className="bg-[#151619] border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 ${section.color} transition-all`}>
                      <section.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-500 transition-colors">{section.label}</h3>
                      <p className="text-sm text-gray-500">{section.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-600 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}

            <div className="bg-red-500/5 border border-red-500/10 p-8 rounded-3xl mt-12">
              <h3 className="text-lg font-bold text-red-500 mb-2">Danger Zone</h3>
              <p className="text-sm text-red-500/60 mb-6">Once you delete your workspace, there is no going back. Please be certain.</p>
              <button className="bg-red-500 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-red-600 transition-all">Delete Workspace</button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-[#151619] border border-white/5 rounded-3xl p-8"
          >
            {activeSection === 'profile' && (
              <form onSubmit={handleSave} className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <img 
                      src="https://picsum.photos/seed/sarah/150/150" 
                      alt="Avatar" 
                      className="w-24 h-24 rounded-3xl object-cover border-2 border-white/10 group-hover:border-emerald-500/50 transition-all"
                    />
                    <button type="button" className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-3xl transition-all">
                      <Camera size={24} className="text-white" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Profile Photo</h3>
                    <p className="text-sm text-gray-500">JPG, GIF or PNG. Max size of 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Full Name</label>
                    <input defaultValue="Sarah Connor" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Email Address</label>
                    <input defaultValue="sarah@fintrack.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Bio</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" defaultValue="Enterprise manager at FinTrack. Passionate about efficiency and team growth." />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setActiveSection(null)} className="px-6 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors">Cancel</button>
                  <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {activeSection === 'notifications' && (
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-4">
                  {[
                    { label: 'Email Notifications', desc: 'Receive daily summaries and alerts via email.' },
                    { label: 'Push Notifications', desc: 'Get real-time updates on your desktop.' },
                    { label: 'Project Updates', desc: 'Notify when someone comments or updates a project.' },
                    { label: 'Team Activity', desc: 'Alert when team members start/stop tracking.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div>
                        <h4 className="text-sm font-bold text-white">{item.label}</h4>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setActiveSection(null)} className="px-6 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors">Cancel</button>
                  <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                    <Save size={18} />
                    Save Preferences
                  </button>
                </div>
              </form>
            )}

            {activeSection !== 'profile' && activeSection !== 'notifications' && (
              <div className="py-12 text-center">
                <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                  <Shield size={32} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Coming Soon</h3>
                <p className="text-gray-500 max-w-xs mx-auto">We're currently working on these settings. Check back in the next update!</p>
                <button onClick={() => setActiveSection(null)} className="mt-6 text-emerald-500 font-bold hover:text-emerald-400">Go Back</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
