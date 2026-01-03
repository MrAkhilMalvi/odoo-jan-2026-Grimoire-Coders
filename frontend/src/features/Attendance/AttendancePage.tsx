import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { User } from '../../shared/types/index';

// Mock Data
const MOCK_ATTENDANCE = [
  { id: '1', date: '26/10/2025', employeeName: 'Anshkumar', checkIn: '09:00', checkOut: '18:00', workHours: '09:00', extraHours: '00:00', status: 'present' },
  { id: '2', date: '26/10/2025', employeeName: 'Janvi S', checkIn: '09:15', checkOut: '18:15', workHours: '09:00', extraHours: '00:00', status: 'late' },
  { id: '3', date: '26/10/2025', employeeName: 'Rahul V', checkIn: '-', checkOut: '-', workHours: '00:00', extraHours: '00:00', status: 'absent' },
] as const;

interface AttendancePageProps {
  currentUser: User;
}

const AttendancePage: React.FC<AttendancePageProps> = ({ currentUser }) => {
  const [currentDate, setCurrentDate] = useState('26 October 2025');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* 1. Top Controls: Date Navigator */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-hr-card border border-hr-border p-4 rounded-xl">
        <h2 className="text-xl font-bold text-hr-text flex items-center gap-2">
          <Calendar className="text-hr-primary" size={20}/> 
          Attendance
        </h2>
        
        <div className="flex items-center gap-4 bg-hr-bg px-4 py-2 rounded-lg border border-hr-border">
          <button className="text-hr-muted hover:text-hr-primary transition"><ChevronLeft size={20} /></button>
          <span className="text-hr-text font-mono w-40 text-center font-medium">{currentDate}</span>
          <button className="text-hr-muted hover:text-hr-primary transition"><ChevronRight size={20} /></button>
        </div>
      </div>

      {/* 2. Employee Summary Cards (Only visible for Employees) */}
      {currentUser.role === 'EMPLOYEE' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="bg-hr-card border border-hr-border p-5 rounded-xl border-l-4 border-l-hr-success">
             <div className="text-hr-muted text-sm">Days Present</div>
             <div className="text-2xl font-bold text-white">22</div>
           </div>
           <div className="bg-hr-card border border-hr-border p-5 rounded-xl border-l-4 border-l-hr-warning">
             <div className="text-hr-muted text-sm">Late Logins</div>
             <div className="text-2xl font-bold text-white">02</div>
           </div>
           <div className="bg-hr-card border border-hr-border p-5 rounded-xl border-l-4 border-l-hr-primary">
             <div className="text-hr-muted text-sm">Total Hours</div>
             <div className="text-2xl font-bold text-white">186h</div>
           </div>
        </div>
      )}

      {/* 3. The Table */}
      <div className="bg-hr-card border border-hr-border rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-hr-muted">
            <thead className="bg-hr-bg border-b border-hr-border text-hr-text uppercase tracking-wider font-semibold">
              <tr>
                {currentUser.role === 'SUPERADMIN' && <th className="px-6 py-4">Employee</th>}
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Check In</th>
                <th className="px-6 py-4">Check Out</th>
                <th className="px-6 py-4">Work Hours</th>
                <th className="px-6 py-4">Extra Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hr-border">
              {MOCK_ATTENDANCE.map((record) => (
                <tr key={record.id} className="hover:bg-hr-border/30 transition-colors">
                  {currentUser.role === 'SUPERADMIN' && (
                    <td className="px-6 py-4 font-medium text-hr-text flex items-center gap-2">
                       {record.employeeName}
                    </td>
                  )}
                  <td className="px-6 py-4">{record.date}</td>
                  <td className="px-6 py-4 text-hr-success">{record.checkIn}</td>
                  <td className="px-6 py-4 text-hr-danger">{record.checkOut}</td>
                  <td className="px-6 py-4 text-hr-text font-mono">{record.workHours}</td>
                  <td className="px-6 py-4">{record.extraHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <p className="text-xs text-hr-muted italic opacity-60">
        * Note: Attendance data serves as the basis for payroll generation. Missing entries may affect payable days.
      </p>
    </div>
  );
};

export default AttendancePage;