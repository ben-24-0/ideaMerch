import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { logout } from "../../api/auth.js";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-neutral-100 lg:flex">

      <AdminSidebar />

      <div className="min-w-0 flex-1">

        {/* Top bar */}
        <header className="flex items-center justify-between border-b-[3px] border-black bg-white px-5 py-4">
          <p className="font-black uppercase">
            Admin
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="
              border-[3px]
              border-black
              bg-[var(--red)]
              px-4
              py-2
              text-sm
              font-black
              uppercase
              text-white
              shadow-[3px_3px_0_#000]
              transition-all
              hover:translate-x-[2px]
              hover:translate-y-[2px]
              hover:shadow-[1px_1px_0_#000]
            "
          >
            Logout
          </button>
        </header>

        {/* Page */}
        <main className="p-5 md:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}