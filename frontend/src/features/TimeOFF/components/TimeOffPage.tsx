import React, { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';
import { User, TimeOffRequest } from '../../../shared/types/index';
import { Badge } from '../../../shared/components/ui/Badge';
import { RequestModal } from './RequestModal';

// Mock Data
const MOCK_REQUESTS: TimeOffRequest[] = [
  { id: '1', employeeName: 'Anshkumar Darji', startDate: '20/10/2025', endDate: '22/10/2025', type: 'Paid Time Off', status: 'Pending', days: 2 },
  { id: '2', employeeName: 'Janvi S', startDate: '15/10/2025', endDate: '16/10/2025', type: 'Sick Leave', status: 'Approved', days: 1 },
];

interface TimeOffPageProps {
  currentUser: User;
}

const TimeOffPage: React.FC<TimeOffPageProps> = ({ currentUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'requests' | 'allocation'>('requests');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* 1. Header & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4 border-b border-hr-border pb-4">
        <div className="flex gap-6">
           <button 
             onClick={() => setActiveTab('requests')}
             className={`pb-4 text-sm font-semibold transition relative ${activeTab === 'requests' ? 'text-hr-primary' : 'text-hr-muted hover:text-hr-text'}`}
           >
             Time Off
             {activeTab === 'requests' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-hr-primary"/>}
           </button>
           
           {currentUser.role === 'SUPERADMIN' && (
             <button 
               onClick={() => setActiveTab('allocation')}
               className={`pb-4 text-sm font-semibold transition relative ${activeTab === 'allocation' ? 'text-hr-primary' : 'text-hr-muted hover:text-hr-text'}`}
             >
               Allocation
               {activeTab === 'allocation' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-hr-primary"/>}
             </button>
           )}
        </div>

        {/* Employee "New Request" Button */}
        {currentUser.role === 'EMPLOYEE' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-hr-primary hover:bg-hr-primaryHover text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-purple-900/20"
          >
            <Plus size={16} /> New Request
          </button>
        )}
      </div>

      {/* 2. Balance Cards (Visible to Employee) */}
      {currentUser.role === 'EMPLOYEE' && activeTab === 'requests' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-hr-card border border-hr-border p-4 rounded-xl flex justify-between items-center">
             <div>
               <h4 className="text-hr-primary font-bold text-lg">Paid Time Off</h4>
               <p className="text-hr-muted text-xs mt-1">Available for vacation</p>
             </div>
             <div className="text-3xl font-bold text-white">04 <span className="text-sm font-normal text-hr-muted">Days</span></div>
          </div>
          <div className="bg-hr-card border border-hr-border p-4 rounded-xl flex justify-between items-center">
             <div>
               <h4 className="text-pink-500 font-bold text-lg">Sick Leave</h4>
               <p className="text-hr-muted text-xs mt-1">Medical emergencies</p>
             </div>
             <div className="text-3xl font-bold text-white">02 <span className="text-sm font-normal text-hr-muted">Days</span></div>
          </div>
        </div>
      )}

      {/* 3. The Table */}
      <div className="bg-hr-card border border-hr-border rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left text-sm text-hr-muted">
          <thead className="bg-hr-bg border-b border-hr-border text-hr-text uppercase tracking-wider font-semibold">
            <tr>
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Start Date</th>
              <th className="px-6 py-4">End Date</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              {currentUser.role === 'SUPERADMIN' && <th className="px-6 py-4 text-right">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-hr-border">
            {MOCK_REQUESTS.map((req) => (
              <tr key={req.id} className="hover:bg-hr-border/30 transition-colors">
                <td className="px-6 py-4 font-medium text-hr-text">{req.employeeName}</td>
                <td className="px-6 py-4">{req.startDate}</td>
                <td className="px-6 py-4">{req.endDate}</td>
                <td className="px-6 py-4"><Badge status={req.type} type="leaveType" /></td>
                <td className="px-6 py-4"><Badge status={req.status} type="status" /></td>
                
                {/* Admin Actions */}
                {currentUser.role === 'SUPERADMIN' && req.status === 'Pending' && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 bg-hr-success/10 text-hr-success rounded hover:bg-hr-success hover:text-white transition" title="Approve">
                        <Check size={16} />
                      </button>
                      <button className="p-1.5 bg-hr-danger/10 text-hr-danger rounded hover:bg-hr-danger hover:text-white transition" title="Reject">
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                )}
                {currentUser.role === 'SUPERADMIN' && req.status !== 'Pending' && <td className="px-6 py-4 text-right text-xs">-</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default TimeOffPage;