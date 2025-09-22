import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/services/adminAuth';
import logo from '@/assets/logo-white.png';
import ensureSeedData from '@/services/seedAdminData';
import avatarPlaceholder from '@/assets/logo.png';
import { FileText, Briefcase, User } from 'lucide-react';

const AdminLayout = () => {
  const { isAuthenticated, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    ensureSeedData();
    
    // Redirect to signin if not authenticated and not already on signin page
    if (!isAuthenticated && !location.pathname.endsWith('/signin')) {
      navigate('/admin/signin', { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

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
            <Link to="/admin/services" className={`admin-sidebar-link ${window.location.pathname.startsWith('/admin/services') ? 'active' : ''}`}><Briefcase className="inline mr-3 align-middle" /> <span className="align-middle">Services</span></Link>
            <Link to="/admin/blogs" className={`admin-sidebar-link ${window.location.pathname.startsWith('/admin/blogs') ? 'active' : ''}`}><FileText className="inline mr-3 align-middle" /> <span className="align-middle">Blogs</span></Link>
          </nav>
        </div>

        <div>
          <div className="mb-3">
            {isAuthenticated ? (
              <button className="w-full bg-transparent border border-white/12 text-white px-2 py-1.5 rounded-md hover:bg-white/6 text-sm" onClick={() => { signOut(); navigate('/'); }}>Sign out</button>
            ) : (
              <Link to="/admin/signin"><button className="w-full bg-legal-gold text-white px-2 py-1.5 rounded-md hover:shadow-sm text-sm">Sign in</button></Link>
            )}
          </div>

          <div className="mt-6 text-xs text-white/70 border-t border-white/6 pt-4">
            <div>© {new Date().getFullYear()} Ali Bin Fahad Law Firm. All rights reserved.</div>
            <div className="mt-2">Need assistance? Contact support@abf.sa</div>
          </div>
        </div>
      </aside>

      {/* Main content (push right to leave room for sidebar) */}
  <main className="ml-56 p-4">
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="text-right mr-2">
              <div className="font-medium">Ali Bin Fahad</div>
              <div className="text-xs text-neutral-500">Admin Manager</div>
            </div>
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-sm border border-white/60">
              <User />
            </div>
          </div>
        </div>

        <div className="container-max">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
