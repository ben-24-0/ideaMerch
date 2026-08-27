import ProductGrid from "./ProductGrid";

export default function ProductSection({
  title,
  products = [],
}) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="border-b-[3px] border-black py-10 last:border-b-0 md:py-14">
      {/* Section heading */}
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-black uppercase tracking-widest text-neutral-500">
            Collection
          </p>

          <h2 className="font-display text-3xl font-black uppercase leading-none tracking-tight md:text-5xl">
            {title}
          </h2>
        </div>

        <span className="shrink-0 text-xs font-black uppercase text-neutral-400">
          {products.length}{" "}
          {products.length === 1 ? "item" : "items"}
        </span>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}