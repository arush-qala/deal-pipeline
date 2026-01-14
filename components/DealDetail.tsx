import React, { useState } from 'react';
import { Deal, DealStage, Priority } from '../types';
import { 
  X, ExternalLink, Calendar, Users, FileText, 
  PieChart, MessageSquare, Sparkles, Building2, 
  Target, DollarSign, Activity, CheckCircle, TrendingUp 
} from 'lucide-react';
import { generateDealAnalysis } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DealDetailProps {
  deal: Deal;
  onClose: () => void;
}

export const DealDetail: React.FC<DealDetailProps> = ({ deal, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleGenerateAI = async () => {
    setLoadingAi(true);
    const analysis = await generateDealAnalysis(deal);
    setAiAnalysis(analysis);
    setLoadingAi(false);
  };

  const financialsData = [
    { year: '2022', revenue: 1.2 },
    { year: '2023', revenue: 2.8 },
    { year: '2024 (E)', revenue: 6.5 },
    { year: '2025 (E)', revenue: 14.2 },
    { year: '2026 (E)', revenue: 32.0 },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end transition-opacity">
      <div className="w-full max-w-4xl bg-white h-full shadow-2xl overflow-hidden flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-start bg-slate-50">
          <div className="flex items-center gap-4">
            <img src={deal.logoUrl} alt={deal.companyName} className="w-16 h-16 rounded-xl border border-gray-200 bg-white" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">{deal.companyName}</h1>
                <a href={`https://${deal.website}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <ExternalLink size={18} />
                </a>
              </div>
              <p className="text-gray-600 mt-1">{deal.oneLiner}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wide">
                  {deal.stage}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-white border border-gray-300 text-gray-600 text-xs font-medium">
                  {deal.sector.join(', ')}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
              Move Stage
            </button>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-gray-200 flex gap-6 text-sm font-medium text-gray-500">
          {['Overview', 'Team', 'Documents', 'Financials', 'IC Memo'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === tab.toLowerCase() 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-white">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2 space-y-8">
                {/* Investment Thesis */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Target size={20} className="text-indigo-600" />
                    Investment Thesis
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-xl text-gray-700 leading-relaxed border border-slate-100">
                    {deal.thesis}
                  </div>
                </section>

                {/* AI Analysis */}
                <section>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Sparkles size={20} className="text-teal-500" />
                      AI Analyst
                    </h3>
                    <button 
                      onClick={handleGenerateAI}
                      disabled={loadingAi}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                    >
                      {loadingAi ? 'Analyzing...' : 'Generate Memo'}
                    </button>
                  </div>
                  {aiAnalysis ? (
                    <div className="bg-gradient-to-br from-indigo-50 to-white p-5 rounded-xl border border-indigo-100 text-sm text-gray-800 whitespace-pre-wrap">
                      {aiAnalysis}
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-400">
                      Click generate to get an AI-powered risk and opportunity assessment.
                    </div>
                  )}
                </section>
              </div>

              {/* Sidebar Metrics */}
              <div className="col-span-1 space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Key Metrics</h4>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">ARR / Revenue</span>
                      <span className="text-lg font-semibold text-gray-900">{deal.metrics.revenue}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">YoY Growth</span>
                      <span className="text-lg font-semibold text-green-600 flex items-center gap-1">
                        <TrendingUp size={16} />
                        {deal.metrics.growth}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">Burn Rate</span>
                      <span className="text-lg font-semibold text-red-600">{deal.metrics.burn}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Deal Terms</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Round Size</span>
                      <span className="text-sm font-semibold text-gray-900">{deal.investmentSize}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Valuation</span>
                      <span className="text-sm font-semibold text-gray-900">{deal.valuation}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Structure</span>
                      <span className="text-sm font-semibold text-gray-900">Equity - Seed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="h-full flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Projected Revenue (£M)</h3>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financialsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      cursor={{fill: '#F1F5F9'}}
                    />
                    <Bar dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8">
                 <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2022</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2023</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2024E</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Revenue</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£1.2M</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£2.8M</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£6.5M</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">EBITDA</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-red-500">(£0.8M)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-red-500">(£0.4M)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-green-600">£0.2M</td>
                      </tr>
                    </tbody>
                 </table>
              </div>
            </div>
          )}

          {activeTab === 'ic memo' && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex gap-3">
                <CheckCircle className="text-yellow-600 shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800">IC Vote Pending</h4>
                  <p className="text-sm text-yellow-700 mt-1">Scheduled for Thursday, Nov 2nd. 3/5 votes received.</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-8">
                 <h2 className="text-3xl font-serif text-gray-900 text-center mb-8 border-b pb-4">Investment Memorandum</h2>
                 
                 <section>
                   <h3 className="text-lg font-bold text-gray-900 mb-2">Executive Summary</h3>
                   <p className="text-gray-700 leading-relaxed">
                     {deal.companyName} represents a unique opportunity to back a repeat founding team in the rapidly growing {deal.sector[0]} space. 
                     The company has demonstrated exceptional capital efficiency with {deal.metrics.revenue} revenue on minimal burn.
                   </p>
                 </section>

                 <section>
                   <h3 className="text-lg font-bold text-gray-900 mb-2">Market Analysis</h3>
                   <p className="text-gray-700 leading-relaxed">
                     The global market is estimated at £24B, growing at 15% CAGR. {deal.companyName} is positioned to capture the enterprise segment
                     which is currently underserved by legacy incumbents.
                   </p>
                 </section>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};