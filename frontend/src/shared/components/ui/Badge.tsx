import React from 'react';

interface BadgeProps {
  status: string;
  type?: 'status' | 'leaveType';
}

export const Badge: React.FC<BadgeProps> = ({ status, type = 'status' }) => {
  let colorClass = 'bg-hr-border text-hr-muted'; // Default

  if (type === 'status') {
    switch (status) {
      case 'Approved': colorClass = 'bg-hr-success/20 text-hr-success border border-hr-success/30'; break;
      case 'Rejected': colorClass = 'bg-hr-danger/20 text-hr-danger border border-hr-danger/30'; break;
      case 'Pending':  colorClass = 'bg-hr-warning/20 text-hr-warning border border-hr-warning/30'; break;
    }
  } else {
    // Leave Types
    if (status === 'Paid Time Off') colorClass = 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
    if (status === 'Sick Leave') colorClass = 'bg-pink-500/20 text-pink-400 border border-pink-500/30';
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
};