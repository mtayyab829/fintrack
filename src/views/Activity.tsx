import React from 'react';
import { Activity as ActivityIcon, Monitor, Globe, Smartphone, MousePointer2 } from 'lucide-react';

interface ActivityProps {
  onOpenScreenshot: (url: string) => void;
}

const Activity: React.FC<ActivityProps> = ({ onOpenScreenshot }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Activity Monitoring</h1>
        <div className="flex gap-2">
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium">Live View</button>
          <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium">History</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#151619] border border-white/5 p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-6">Activity Level</h3>
            <div className="h-48 flex items-end gap-1">
              {Array.from({ length: 48 }).map((_, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-emerald-500/20 rounded-t-sm hover:bg-emerald-500 transition-all cursor-pointer group relative"
                  style={{ height: `${Math.random() * 100}%` }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-white text-black text-[10px] px-2 py-1 rounded whitespace-nowrap">
                    {Math.floor(Math.random() * 100)}% Activity
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <span>09:00 AM</span>
              <span>12:00 PM</span>
              <span>03:00 PM</span>
              <span>06:00 PM</span>
            </div>
          </div>

          <div className="bg-[#151619] border border-white/5 p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-6">Recent Screenshots</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="group relative aspect-video rounded-xl overflow-hidden border border-white/10">
                  <img 
                    src={`https://picsum.photos/seed/screen${i}/400/225`} 
                    alt="Screenshot" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => onOpenScreenshot(`https://picsum.photos/seed/screen${i}/1920/1080`)}
                      className="bg-white text-black px-3 py-1.5 rounded-lg text-xs font-bold"
                    >
                      View Full
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                    <span className="text-[10px] bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-white">10:4{i} AM</span>
                    <span className="text-[10px] bg-emerald-500 px-1.5 py-0.5 rounded text-white font-bold">88%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#151619] border border-white/5 p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-6">Top Apps & Sites</h3>
            <div className="space-y-4">
              {[
                { name: 'Visual Studio Code', time: '4h 22m', icon: Monitor, color: 'text-blue-500' },
                { name: 'Slack', time: '1h 15m', icon: Globe, color: 'text-purple-500' },
                { name: 'Figma', time: '2h 45m', icon: MousePointer2, color: 'text-pink-500' },
                { name: 'Chrome', time: '3h 10m', icon: Globe, color: 'text-amber-500' },
                { name: 'Terminal', time: '0h 45m', icon: Monitor, color: 'text-emerald-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                      <item.icon size={16} className={item.color} />
                    </div>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{item.name}</span>
                  </div>
                  <span className="text-xs font-mono text-gray-500">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#151619] border border-white/5 p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-6">Device Usage</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Monitor size={20} className="text-blue-500" />
                  <span className="text-sm text-gray-300">Desktop</span>
                </div>
                <span className="text-sm font-bold">82%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: '82%' }} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone size={20} className="text-emerald-500" />
                  <span className="text-sm text-gray-300">Mobile</span>
                </div>
                <span className="text-sm font-bold">18%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: '18%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
