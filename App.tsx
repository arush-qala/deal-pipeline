import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DealCard } from './components/DealCard';
import { DealDetail } from './components/DealDetail';
import { MOCK_DEALS, PIPELINE_COLUMNS, MOCK_CONTACTS } from './constants';
import { Deal, Contact } from './types';
import { Search, Filter, Bell, Download } from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend 
} from 'recharts';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('pipeline');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS);

  const portfolioData = [
    { name: 'B2B SaaS', value: 45 },
    { name: 'FinTech', value: 25 },
    { name: 'HealthTech', value: 20 },
    { name: 'Climate', value: 10 },
  ];
  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#6366F1'];

  const renderHeader = (title: string) => (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500 text-sm mt-1">
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search deals, companies..." 
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
          />
        </div>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg border border-gray-200">
          <Filter size={18} />
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg border border-gray-200 relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>
    </div>
  );

  const renderPipeline = () => (
    <div className="flex-1 overflow-x-auto pb-4">
      <div className="flex gap-6 min-w-max px-1">
        {PIPELINE_COLUMNS.map((stage) => {
          const stageDeals = deals.filter(d => d.stage === stage);
          const totalValue = stageDeals.length; // Simplified for now
          
          return (
            <div key={stage} className="w-80 flex flex-col shrink-0">
              <div className="flex justify-between items-center mb-4 px-1">
                <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${stageDeals.length > 0 ? 'bg-indigo-500' : 'bg-gray-300'}`}></div>
                  {stage}
                </h3>
                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-md">{totalValue}</span>
              </div>
              
              <div className="flex flex-col gap-4 min-h-[calc(100vh-200px)]">
                {stageDeals.map(deal => (
                  <DealCard key={deal.id} deal={deal} onClick={setSelectedDeal} />
                ))}
                {stageDeals.length === 0 && (
                  <div className="h-32 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                    No active deals
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Sector Allocation</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-sm text-indigo-600 font-medium mb-1">Total Deployed</p>
            <p className="text-2xl font-bold text-gray-900">£45.2M</p>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg">
            <p className="text-sm text-teal-600 font-medium mb-1">Active Companies</p>
            <p className="text-2xl font-bold text-gray-900">18</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
             <p className="text-sm text-orange-600 font-medium mb-1">Avg Ownership</p>
             <p className="text-2xl font-bold text-gray-900">12.5%</p>
          </div>
           <div className="bg-purple-50 p-4 rounded-lg">
             <p className="text-sm text-purple-600 font-medium mb-1">TVPI</p>
             <p className="text-2xl font-bold text-gray-900">1.8x</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContacts = () => (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {MOCK_CONTACTS.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                        {contact.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                        <div className="text-sm text-gray-500">{contact.email}</div>
                    </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.company}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {contact.type}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.lastContact}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">Email</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
  )

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        onCreateDeal={() => alert('Modal would open here in full implementation')} 
      />
      
      <main className="ml-64 flex-1 p-8 h-screen overflow-y-auto">
        {currentView === 'pipeline' && (
            <>
                {renderHeader('Deal Pipeline')}
                {renderPipeline()}
            </>
        )}
        
        {currentView === 'portfolio' && (
             <>
                {renderHeader('Portfolio Performance')}
                {renderPortfolio()}
             </>
        )}

        {currentView === 'contacts' && (
             <>
                {renderHeader('Relationship Manager')}
                {renderContacts()}
             </>
        )}

         {currentView === 'analytics' && (
             <>
                {renderHeader('Analytics')}
                <div className="p-12 text-center text-gray-400 border-2 border-dashed border-gray-300 rounded-xl">
                    <Download className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Analytics Module</h3>
                    <p className="mt-1 text-sm text-gray-500">Advanced reports and funnel analysis would be rendered here.</p>
                </div>
             </>
        )}
      </main>

      {selectedDeal && (
        <DealDetail deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
      )}
    </div>
  );
};

export default App;
