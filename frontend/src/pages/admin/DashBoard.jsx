import AdminLayout from "../../components/admin/AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout>

      <div>
        <p className="text-xs font-black uppercase text-neutral-500">
          IdeaMerch control center
        </p>

        <h1 className="mt-1 font-display text-5xl font-black uppercase tracking-tight">
          Dashboard.
        </h1>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        <StatCard
          title="Products"
          value="—"
          description="Catalogue items"
        />

        <StatCard
          title="Orders"
          value="—"
          description="Customer orders"
        />

        <StatCard
          title="Custom"
          value="—"
          description="Custom requests"
        />

      </div>

    </AdminLayout>
  );
}

function StatCard({ title, value, description }) {
  return (
    <div className="border-[3px] border-black bg-white p-6 shadow-[5px_5px_0_#000]">
      <p className="text-xs font-black uppercase text-neutral-500">
        {title}
      </p>

      <p className="mt-2 font-display text-5xl font-black">
        {value}
      </p>

      <p className="mt-1 text-sm font-bold text-neutral-600">
        {description}
      </p>
    </div>
  );
}