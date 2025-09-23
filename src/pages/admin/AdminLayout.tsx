import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo-white.png';
import { FileText, Briefcase, User, LogOut, ChevronDown } from 'lucide-react';

const AdminLayout = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    // Example: Clear auth token, redirect to login, etc.
    // navigate('/admin/login');
  };
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#071427]">
      {/* Fixed left sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-56 bg-legal-navy text-white flex flex-col justify-between p-3 admin-compact-sidebar">
        <div>
          <div className="flex flex-col items-center gap-1 mb-4">
            <div className="bg-white/5 rounded-md p-1.5 w-full flex items-center justify-center">
              <img src={logo} alt="Ali Bin Fahad Law Firm" className="h-8 w-auto" />
            </div>
            <div className="text-center mt-1">
              <div className="font-semibold text-xs tracking-wide">Ali Bin Fahad Law Firm</div>
              <div className="text-[10px] text-white/80">Admin Panel</div>
            </div>
          </div>

          <nav className="space-y-2 mt-4 px-1 text-sm">
            <Link
              to="/admin/services"
              className={`admin-sidebar-link ${window.location.pathname.startsWith('/admin/services') ? 'active' : ''}`}
            >
              <Briefcase className="inline mr-3 align-middle" />
              <span className="align-middle">Services</span>
            </Link>
            <Link
              to="/admin/blogs"
              className={`admin-sidebar-link ${window.location.pathname.startsWith('/admin/blogs') ? 'active' : ''}`}
            >
              <FileText className="inline mr-3 align-middle" />
              <span className="align-middle">Blogs</span>
            </Link>
          </nav>
        </div>

        <div>
          <div className="mt-6 text-xs text-white/70 border-t border-white/6 pt-4">
            <div>{new Date().getFullYear()} Ali Bin Fahad Law Firm. All rights reserved.</div>
            <div className="mt-2">Need assistance? Contact support@abf.sa</div>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="pl-56 p-4">
        <div className="flex justify-end mb-4">
          <div className="relative flex items-center gap-3 group" ref={profileRef}>
            <div className="text-right">
              <div className="text-sm font-medium text-legal-navy">Ali Bin Fahad</div>
              <div className="text-xs text-legal-navy/70">Admin Manager</div>
            </div>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center justify-center w-10 h-10 bg-legal-navy/5 hover:bg-legal-navy/10 rounded-full transition-colors duration-200"
            >
              <User className="w-5 h-5 text-legal-navy" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <p className="text-sm font-medium text-legal-navy">Ali Bin Fahad</p>
                  <p className="text-xs text-legal-navy/70">admin@abf.sa</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2.5 text-sm text-left text-legal-navy hover:bg-gray-50 flex items-center transition-colors duration-150"
                  >
                    <LogOut className="w-4 h-4 mr-2 text-legal-navy/70" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
