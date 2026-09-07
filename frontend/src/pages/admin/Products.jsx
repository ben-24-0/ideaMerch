import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { getProducts, deleteProduct } from "../../api/products";


export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts({
        includeInactive: "true",
      });

      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(product) {
    const confirmed = window.confirm(
      `Delete "${product.name}"?\n\nThis cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(product.id);

      await deleteProduct(product.id);

      setProducts((current) =>
        current.filter((item) => item.id !== product.id)
      );
    } catch (err) {
      setError(err.message || "Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-end justify-between gap-5">
        <div>
          <p className="text-xs font-black uppercase text-neutral-500">
            Product management
          </p>

          <h1 className="mt-1 font-display text-5xl font-black uppercase">
            Products.
          </h1>
        </div>

        <Link
          to="/admin/products/new"
          className="
            shrink-0
            border-[3px]
            border-black
            bg-[var(--yellow)]
            px-4
            py-3
            text-sm
            font-black
            uppercase
            shadow-[4px_4px_0_#000]
            transition-all
            hover:translate-x-[2px]
            hover:translate-y-[2px]
            hover:shadow-[2px_2px_0_#000]
          "
        >
          + New Product
        </Link>
      </div>

      {error && (
        <div className="mt-6 border-[3px] border-black bg-[var(--red)] p-4 font-black uppercase text-white shadow-[4px_4px_0_#000]">
          {error}
        </div>
      )}

      <div className="mt-8">
        {loading ? (
          <LoadingState />
        ) : products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-hidden border-[3px] border-black bg-white shadow-[5px_5px_0_#000]">

            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-[3px] border-black bg-black text-left text-xs font-black uppercase text-white">
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <ProductRow
                      key={product.id}
                      product={product}
                      deleting={deletingId === product.id}
                      onDelete={handleDelete}
                      onEdit={() =>
                        navigate(`/admin/products/${product.id}/edit`)
                      }
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="divide-y-[3px] divide-black md:hidden">
              {products.map((product) => (
                <ProductMobileCard
                  key={product.id}
                  product={product}
                  deleting={deletingId === product.id}
                  onDelete={handleDelete}
                  onEdit={() =>
                    navigate(`/admin/products/${product.id}/edit`)
                  }
                />
              ))}
            </div>

          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function ProductRow({
  product,
  deleting,
  onDelete,
  onEdit,
}) {
  return (
    <tr className="border-b-[2px] border-black last:border-b-0">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <ProductImage product={product} />

          <div className="min-w-0">
            <p className="font-black uppercase">
              {product.name}
            </p>

            {product.featured && (
              <span className="mt-1 inline-block text-xs font-black uppercase text-[var(--red)]">
                Featured
              </span>
            )}
          </div>
        </div>
      </td>

      <td className="px-4 py-4 text-sm font-bold uppercase">
        {product.category || "—"}
      </td>

      <td className="px-4 py-4 text-sm font-bold uppercase">
        {product.type || "—"}
      </td>

      <td className="px-4 py-4 font-black">
        ₹{product.price}
      </td>

      <td className="px-4 py-4 font-black">
        {product.stock}
      </td>

      <td className="px-4 py-4">
        <StatusBadge product={product} />
      </td>

      <td className="px-4 py-4">
        <Actions
          product={product}
          deleting={deleting}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </td>
    </tr>
  );
}

function ProductMobileCard({
  product,
  deleting,
  onDelete,
  onEdit,
}) {
  return (
    <div className="p-4">
      <div className="flex gap-4">
        <ProductImage product={product} />

        <div className="min-w-0 flex-1">
          <h2 className="font-black uppercase">
            {product.name}
          </h2>

          <p className="mt-1 text-xs font-black uppercase text-neutral-500">
            {product.category || "—"} / {product.type || "—"}
          </p>

          <p className="mt-2 font-black text-[var(--red)]">
            ₹{product.price}
          </p>

          <div className="mt-2">
            <StatusBadge product={product} />
          </div>
        </div>
      </div>

      <Actions
        product={product}
        deleting={deleting}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}

function ProductImage({ product }) {
  return (
    <div className="h-16 w-16 shrink-0 overflow-hidden border-[3px] border-black bg-neutral-100">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-[10px] font-black uppercase">
          No image
        </div>
      )}
    </div>
  );
}

function StatusBadge({ product }) {
  if (!product.active) {
    return (
      <span className="inline-block border-2 border-black bg-neutral-200 px-2 py-1 text-xs font-black uppercase">
        Inactive
      </span>
    );
  }

  if (!product.available) {
    return (
      <span className="inline-block border-2 border-black bg-[var(--red)] px-2 py-1 text-xs font-black uppercase text-white">
        Unavailable
      </span>
    );
  }

  return (
    <span className="inline-block border-2 border-black bg-[#90EE82] px-2 py-1 text-xs font-black uppercase">
      Active
    </span>
  );
}

function Actions({
  product,
  deleting,
  onDelete,
  onEdit,
}) {
  return (
    <div className="mt-4 flex justify-end gap-2">
      <button
        type="button"
        onClick={onEdit}
        className="
          border-[3px]
          border-black
          bg-white
          px-3
          py-2
          text-xs
          font-black
          uppercase
          shadow-[3px_3px_0_#000]
          hover:translate-x-[2px]
          hover:translate-y-[2px]
          hover:shadow-[1px_1px_0_#000]
        "
      >
        Edit
      </button>

      <button
        type="button"
        disabled={deleting}
        onClick={() => onDelete(product)}
        className="
          border-[3px]
          border-black
          bg-[var(--red)]
          px-3
          py-2
          text-xs
          font-black
          uppercase
          text-white
          shadow-[3px_3px_0_#000]
          hover:translate-x-[2px]
          hover:translate-y-[2px]
          hover:shadow-[1px_1px_0_#000]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="border-[3px] border-black bg-white p-10 text-center shadow-[5px_5px_0_#000]">
      <p className="font-display text-3xl font-black uppercase">
        Loading products...
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border-[3px] border-black bg-[var(--yellow)] p-10 text-center shadow-[5px_5px_0_#000]">
      <h2 className="font-display text-3xl font-black uppercase">
        No products
      </h2>

      <p className="mt-2 font-bold uppercase">
        Add your first product to get started.
      </p>
    </div>
  );
}