import ProductCardSkeleton from "../shop/ProductCardSkeleton";

export default function FeaturedProductsSkeleton() {
  return (
    <div className="grid gap-7 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}