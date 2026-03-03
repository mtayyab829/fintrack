import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Brain, 
  Zap, 
  TrendingUp, 
  Search, 
  ChevronRight, 
  MessageSquare, 
  Layout, 
  Clock, 
  Send
} from 'lucide-react';

const aiInsights = [
  { id: 1, title: 'Productivity Peak', description: 'Your team is 24% more productive between 10 AM and 12 PM. Consider scheduling deep work sessions then.', type: 'productivity', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 2, title: 'Burnout Risk Detected', description: 'John Doe has worked 12 hours overtime this week. Suggest a break or workload redistribution.', type: 'alert', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 3, title: 'Project Estimation', description: 'Based on current velocity, "FinTrack Mobile" is likely to finish 3 days ahead of schedule.', type: 'prediction', icon: Brain, color: 'text-blue-500', bg: 'bg-blue-500/10' },
];

const WebWorkAI = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="text-emerald-500" size={24} />
            <h1 className="text-3xl font-bold text-white">WebWork AI</h1>
          </div>
          <p className="text-gray-400">AI-powered insights and predictions for your team's performance.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all">
            <Layout size={18} />
            Customize Dashboard
          </button>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
            <Zap size={18} />
            Generate New Insights
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiInsights.map((insight, i) => (
              <motion.div 
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#151619] border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`${insight.bg} p-3 rounded-2xl`}>
                    <insight.icon className={insight.color} size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">{insight.type}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-500 transition-colors">{insight.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{insight.description}</p>
                <button className="mt-6 flex items-center gap-2 text-emerald-500 text-sm font-bold hover:underline">
                  Take Action
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#151619] border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-xl font-bold text-white mb-6">AI Performance Forecast</h3>
            <div className="h-64 flex items-end gap-4 px-4">
              {[45, 62, 58, 75, 82, 68, 90].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full bg-white/5 rounded-t-xl relative overflow-hidden h-full">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ delay: i * 0.1, duration: 1 }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500 to-emerald-400 group-hover:from-emerald-400 group-hover:to-emerald-300 transition-all"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-500">W{i + 1}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center gap-4">
              <div className="p-2 bg-emerald-500/20 rounded-xl">
                <TrendingUp className="text-emerald-500" size={20} />
              </div>
              <p className="text-sm text-gray-300">
                <span className="text-emerald-500 font-bold">Forecast:</span> Team productivity is expected to increase by <span className="text-white font-bold">12%</span> in the next month based on current trends.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#151619] border border-white/5 rounded-[2rem] p-8 flex flex-col h-[600px]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-500/10 rounded-xl">
                <MessageSquare className="text-emerald-500" size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">AI Assistant</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
              <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[85%]">
                <p className="text-sm text-gray-300">Hello Sarah! I've analyzed the team's activity for today. Would you like to see the efficiency report or project forecasts?</p>
                <span className="text-[10px] text-gray-500 mt-2 block">AI Assistant • 10:30 AM</span>
              </div>
              <div className="bg-emerald-500 p-4 rounded-2xl rounded-tr-none max-w-[85%] ml-auto">
                <p className="text-sm text-white">Show me the project forecasts for "FinTrack Mobile".</p>
                <span className="text-[10px] text-emerald-100 mt-2 block">You • 10:31 AM</span>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[85%]">
                <p className="text-sm text-gray-300">Based on the current velocity of Sarah and John, the Mobile app is on track to complete the "Auth Implementation" by Friday. However, the "Design System" task is lagging by 2 days.</p>
                <span className="text-[10px] text-gray-500 mt-2 block">AI Assistant • 10:31 AM</span>
              </div>
            </div>

            <div className="mt-6 relative">
              <input 
                type="text" 
                placeholder="Ask WebWork AI..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all">
                <Send size={18} />
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-[2rem] text-white shadow-xl shadow-indigo-500/20">
            <h3 className="text-xl font-bold mb-2">AI Training</h3>
            <p className="text-white/80 text-sm mb-6">Train the AI with your specific workspace data for more accurate predictions.</p>
            <button className="w-full py-3 bg-white text-indigo-600 rounded-2xl font-bold text-sm hover:bg-indigo-50 transition-all shadow-lg">
              Configure Training
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebWorkAI;
