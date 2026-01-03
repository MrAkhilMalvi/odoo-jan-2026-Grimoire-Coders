import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./features/AUTH/components/SignIn";
import SignUp from "./features/AUTH/components/SignUp";

import Dashboard from "./pages/Dashboard/Dashboard";
import AttendancePage from "./features/Attendance/AttendancePage";
import TimeOffPage from "./features/TimeOFF/components/TimeOffPage";
import EmployeeProfile from "./features/Profile/EmployeeProfile";

import Layout from "./pages/Layout";
import { RequireAuth, RedirectIfAuth } from "./providers/authGuard";
import { User } from "./shared/types";
import SignUpWizard from "./features/AUTH/SignUpWizard";

const MOCK_EMPLOYEES = [
  {
    id: "OIJODO2022001",
    name: "Anshkumar Darji",
    role: "UX Designer",
    status: "present",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: "OIJODO2022002",
    name: "Janvi S",
    role: "Frontend Dev",
    status: "leave",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
];

const CURRENT_USER: User = {
  id: "ADMIN001",
  name: "Admin User",
  role: "SUPERADMIN", // ⚠ must match UserRole
  avatar: "https://i.pravatar.cc/150?u=50",
};

const App = () => {
  return (
    <Routes>
      {/* ---------- AUTH ROUTES (BLOCK IF LOGGED IN) ---------- */}
      <Route element={<RedirectIfAuth />}>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUpWizard />} />
      </Route>

      {/* ---------- PROTECTED APP ROUTES ---------- */}
      {/* <Route element={<RequireAuth />}> */}
        <Route path="/" element={<Layout currentUser={CURRENT_USER} />}>
          <Route index element={<Dashboard employees={MOCK_EMPLOYEES} />} />

          <Route
            path="attendance"
            element={<AttendancePage currentUser={CURRENT_USER} />}
          />

          <Route
            path="timeoff"
            element={<TimeOffPage currentUser={CURRENT_USER} />}
          />

          <Route
            path="profile/:employeeId"
            element={<EmployeeProfile isAdmin={true} />}
          />
        </Route>
      {/* </Route> */}

      {/* ---------- FALLBACK ---------- */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
