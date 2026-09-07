import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductSectionSkeleton({ cards = 4 }) {
  return (
    <section className="border-b-[3px] border-black py-14">
      {/* Section header */}
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="h-3 w-24 animate-pulse bg-neutral-300" />

          <div className="h-10 w-40 animate-pulse bg-neutral-200 sm:h-12 sm:w-52" />
        </div>

        <div className="h-3 w-14 animate-pulse bg-neutral-200" />
      </div>

      {/* Products */}
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: cards }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}