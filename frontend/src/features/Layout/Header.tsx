import { useEffect, useState } from "react";
import {
  Briefcase,
  CheckCircle,
  ChevronDown,
  User,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

import StatusDot from "../../shared/components/ui/StatusDot";
import { useTheme } from "../../shared/context/ThemeContext";
import {
  lastCheckIn,
  storeCheckIn,
  storeCheckInOut,
} from "./services/layoutservice";

const Header = ({ currentUser, onLogout, onMyProfile }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [lastCheckInTime, setLastCheckInTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await lastCheckIn(currentUser.login_id);

        if (res?.is_checked_in) {
          setIsCheckedIn(true);
          setLastCheckInTime(res.check_in_time);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStatus();
  }, [currentUser.login_id]);

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      await storeCheckIn(currentUser.login_id);

      const res = await lastCheckIn(currentUser.login_id);

      setIsCheckedIn(true);
      setLastCheckInTime(res.check_in_time);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      await storeCheckInOut(currentUser.login_id);

      setIsCheckedIn(false);
      setLastCheckInTime(null);
      setShowConfirm(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCheckIn = () => setIsCheckedIn(!isCheckedIn);

  return (
    <header className="bg-hr-card border-b border-hr-border h-20 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-8">
        <div className="text-xl font-bold text-hr-primary tracking-wider">
          Day<span className="dark:text-white">Flow</span>
        </div>

        <nav className="hidden md:flex gap-6 text-sm font-medium text-hr-muted">
          <button className="text-hr-text hover:text-hr-primary transition">
            Dashboard
          </button>
          <button className="hover:text-hr-primary transition">
            Employees
          </button>
        </nav>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* 🌙 THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-hr-border hover:bg-hr-bg transition"
          title="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-hr-muted" />
          )}
        </button>

        {/* Check-in Button */}
        <button
          onClick={() => (isCheckedIn ? setShowConfirm(true) : handleCheckIn())}
          disabled={loading}
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition ${
            isCheckedIn
              ? "bg-hr-success/20 text-hr-success border border-hr-success/50"
              : "bg-hr-border text-hr-muted hover:bg-hr-border/80"
          }`}
        >
          {isCheckedIn ? <CheckCircle size={18} /> : <Briefcase size={18} />}
          {isCheckedIn ? "Checked In" : "Check In"}
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 focus:outline-none group"
          >
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-hr-border group-hover:border-hr-primary transition"
              />
              <div className="absolute bottom-0 right-0 translate-x-1 translate-y-1">
                <StatusDot status={isCheckedIn ? "present" : "offline"} />
              </div>
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-hr-text">
                {currentUser.name}
              </p>
            </div>

            <ChevronDown size={16} className="text-hr-muted" />
          </button>

          {showConfirm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-hr-card p-6 rounded-xl w-96 text-center">
                <h3 className="text-lg font-semibold text-hr-text">
                  Check Out?
                </h3>

                <p className="text-sm text-hr-muted mt-2">
                  You checked in at
                  <span className="font-semibold text-hr-primary">
                    {" "}
                    {lastCheckInTime}
                  </span>
                </p>

                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-4 py-2 rounded-lg bg-hr-border"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleCheckOut}
                    className="px-4 py-2 rounded-lg bg-hr-danger text-white"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          )}

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-hr-card border border-hr-border rounded-lg shadow-xl py-2 z-50">
              <button
                onClick={() => {
                  onMyProfile();
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-hr-text hover:bg-hr-bg hover:text-hr-primary flex items-center gap-2"
              >
                <User size={16} /> My Profile
              </button>

              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm text-hr-danger hover:bg-hr-bg flex items-center gap-2"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
