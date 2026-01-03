

const Card = ({ children, className = "" }) => (
  <div className={`bg-hr-card border border-hr-border rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);

export default Card;