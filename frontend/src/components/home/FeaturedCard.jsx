import ProductCard from "./ProductCard";

export default function FeaturedProducts({ products = [] }) {
  return (
    <section className="border-b-[3px] border-black px-5 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className="mb-2 font-black uppercase">
              Don't miss these
            </p>

            <h2 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
              Featured.
            </h2>
          </div>

          <button className="neo-button hidden bg-white px-5 py-3 uppercase sm:block">
            View all
          </button>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="border-[3px] border-black bg-[var(--yellow)] p-10 text-center shadow-[5px_5px_0_#000]">
            <h3 className="text-3xl font-black uppercase">
              No products found
            </h3>

            <p className="mt-2 font-bold uppercase">
              Try another search or filter.
            </p>
          </div>
        )}

        {/* Mobile */}
        <button className="neo-button mt-8 w-full bg-white px-5 py-4 uppercase sm:hidden">
          View all products
        </button>

      </div>
    </section>
  );
}