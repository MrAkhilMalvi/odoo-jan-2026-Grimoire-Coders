import { Outlet, useNavigate } from "react-router-dom";
import Header from "../features/Layout/Header";

interface Props {
  currentUser: any;
}

const Layout: React.FC<Props> = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-hr-bg text-hr-text font-sans">
      {/* Header */}
      <Header
        currentUser={currentUser}
        onLogout={() => navigate("/login")}
        onMyProfile={() => navigate("/profile/ADMIN001")}
      />

      {/* Welcome Message */}
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-hr-text">
          Welcome to HR Management System
        </h1>
        <p className="text-sm text-hr-muted mt-1">
          Manage employees, attendance, and time off from one place.
        </p>
      </div>

      {/* Page Content */}
      <main className="pb-12 px-6 pt-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
