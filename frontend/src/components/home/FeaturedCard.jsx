import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";
import FeaturedProductsSkeleton from "./FeaturedProductsSkeleton";

export default function FeaturedProducts({
  products = [],
  loading = false,
}) {
  return (
    <section className="border-b-[3px] border-black px-4 py-12 sm:px-5 sm:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className="mb-2 font-black uppercase">
              Don't miss these
            </p>

            <h2 className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl">
              Featured.
            </h2>
          </div>

          <Link
            to="/shop"
            className="neo-button hidden bg-white px-5 py-3 uppercase sm:block"
          >
            View all
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <FeaturedProductsSkeleton />
        ) : products.length > 0 ? (
          /* Products */
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-7">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="border-[3px] border-black bg-[var(--yellow)] p-10 text-center shadow-[5px_5px_0_#000]">
            <h3 className="font-display text-3xl font-black uppercase">
              Nothing featured yet
            </h3>

            <p className="mt-2 font-bold uppercase">
              Check back soon for our top picks.
            </p>
          </div>
        )}

        {/* Mobile View All */}
        <Link
          to="/shop"
          className="neo-button mt-8 block w-full bg-white px-5 py-4 text-center uppercase sm:hidden"
        >
          View all products
        </Link>

      </div>
    </section>
  );
}