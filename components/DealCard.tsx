import React from 'react';
import { Deal, Priority } from '../types';
import { MoreHorizontal, AlertCircle, Clock, TrendingUp } from 'lucide-react';

interface DealCardProps {
  deal: Deal;
  onClick: (deal: Deal) => void;
}

export const DealCard: React.FC<DealCardProps> = ({ deal, onClick }) => {
  const priorityColor = 
    deal.priority === Priority.HOT ? 'bg-red-100 text-red-700 border-red-200' :
    deal.priority === Priority.TRACKING ? 'bg-blue-100 text-blue-700 border-blue-200' :
    'bg-gray-100 text-gray-600 border-gray-200';

  return (
    <div 
      onClick={() => onClick(deal)}
      className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-3 group"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <img src={deal.logoUrl} alt={deal.companyName} className="w-10 h-10 rounded-lg object-cover bg-gray-50" />
          <div>
            <h3 className="font-semibold text-gray-900 leading-tight">{deal.companyName}</h3>
            <span className="text-xs text-gray-500">{deal.sector[0]}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
        {deal.oneLiner}
      </p>

      <div className="flex flex-wrap gap-2 mt-1">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${priorityColor} flex items-center gap-1`}>
          {deal.priority === Priority.HOT && <AlertCircle size={10} />}
          {deal.priority}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium">
          {deal.investmentSize}
        </span>
      </div>

      <div className="border-t border-gray-100 pt-3 mt-1 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">
            {deal.leadInvestor.split(' ').map(n => n[0]).join('')}
          </div>
          <span>{deal.leadInvestor}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>2d</span>
        </div>
      </div>
    </div>
  );
};
