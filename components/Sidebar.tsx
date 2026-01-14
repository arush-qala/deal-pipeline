import React from 'react';
import { LayoutDashboard, PieChart, Users, BarChart3, Settings, Plus } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onCreateDeal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, onCreateDeal }) => {
  const navItems = [
    { id: 'pipeline', label: 'Deal Pipeline', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
    { id: 'analytics', label: 'Reports', icon: BarChart3 },
    { id: 'contacts', label: 'Relationships', icon: Users },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white text-lg">D</span>
          </div>
          <span className="font-bold text-xl tracking-tight">DealSource</span>
        </div>

        <button 
          onClick={onCreateDeal}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors mb-6 shadow-lg shadow-indigo-900/50"
        >
          <Plus size={18} />
          New Deal
        </button>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-slate-800 text-indigo-400' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-800">
        <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors w-full text-sm font-medium">
          <Settings size={20} />
          Settings
        </button>
        <div className="mt-4 flex items-center gap-3">
          <img 
            src="https://picsum.photos/32/32?random=99" 
            alt="User" 
            className="w-8 h-8 rounded-full border border-slate-600"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-200">Jane Partner</span>
            <span className="text-xs text-slate-500">General Partner</span>
          </div>
        </div>
      </div>
    </div>
  );
};
