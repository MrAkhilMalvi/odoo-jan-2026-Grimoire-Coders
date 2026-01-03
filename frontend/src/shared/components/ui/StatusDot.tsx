

const StatusDot = ({ status }) => {
  const colors = {
    present: 'bg-hr-success shadow-[0_0_8px_rgba(34,197,94,0.6)]',
    leave: 'bg-hr-warning shadow-[0_0_8px_rgba(234,179,8,0.6)]',
    absent: 'bg-hr-danger shadow-[0_0_8px_rgba(239,68,68,0.6)]',
    offline: 'bg-hr-muted'
  };
  return <div className={`w-3 h-3 rounded-full ${colors[status] || colors.offline}`} />;
};

export default StatusDot;