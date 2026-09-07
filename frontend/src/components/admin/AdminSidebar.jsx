import { NavLink } from "react-router-dom";

const links = [
  { label: "Dashboard", to: "/admin" },
  { label: "Products", to: "/admin/products" },
  { label: "Orders", to: "/admin/orders" },
  { label: "Custom Requests", to: "/admin/custom-requests" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-full border-b-[3px] border-black bg-black text-white lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r-[3px]">
      <div className="p-5">
        <p className="font-display text-3xl font-black uppercase">
          Idea<span className="text-[var(--red)]">Merch</span>
        </p>

        <p className="mt-1 text-xs font-black uppercase text-neutral-400">
          Admin panel
        </p>
      </div>

      <nav className="flex overflow-x-auto px-3 pb-3 lg:block lg:px-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/admin"}
            className={({ isActive }) =>
              `
              mr-2
              block
              whitespace-nowrap
              border-[3px]
              border-white
              px-4
              py-3
              text-sm
              font-black
              uppercase
              lg:mb-2
              lg:mr-0
              ${
                isActive
                  ? "bg-[var(--yellow)] text-black"
                  : "bg-black text-white hover:bg-white hover:text-black"
              }
              `
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}