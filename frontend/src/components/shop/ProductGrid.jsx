import ShopProductCard from "./ShopProductCard";

export default function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <div className="border-[3px] border-black bg-neutral-100 p-10 text-center shadow-[5px_5px_0_#000]">
        <p className="font-display text-2xl font-black uppercase">
          No products found
        </p>

        <p className="mt-2 text-sm font-bold uppercase text-neutral-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {products.map((product) => (
        <ShopProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}