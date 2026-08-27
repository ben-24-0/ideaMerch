import { useMemo, useState } from "react";

import Navbar from "../components/layout/Navbar";
import CategoryBrowser from "../components/home/CategoryBrowser";
import ProductSection from "../components/shop/ProductSection";

import { products } from "../data/products";
import { filterProducts } from "../utils/productSearch";

const categoryOrder = [
  "General",
  "Anime",
  "Cute",
  "Festivals",
  "Personalized",
  "Wedding",
  "Corporate",
  "Gaming",
  "Quotes",
  "Regional",
];

export default function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [productType, setProductType] = useState("All Items");

  const filteredProducts = filterProducts(
    products,
    search,
    category,
    productType
  );

  const productsByCategory = useMemo(() => {
    return categoryOrder
      .map((categoryName) => ({
        category: categoryName,
        products: filteredProducts.filter(
          (product) => product.category === categoryName
        ),
      }))
      .filter((section) => section.products.length > 0);
  }, [filteredProducts]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Shop heading */}
        <section className="border-b-[3px] border-black">
          <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-neutral-500">
              IdeaMerch collection
            </p>

            <h1 className="font-display text-5xl font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-6xl md:text-8xl">
              Shop
              <span className="text-[var(--red)]"> all.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base font-bold leading-relaxed text-neutral-600 md:text-lg">
              Browse our laser-cut and engraved products,
              from everyday pieces to custom-inspired designs.
            </p>
          </div>
        </section>

        {/* Filters */}
        <CategoryBrowser
          search={search}
          category={category}
          productType={productType}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onProductTypeChange={setProductType}
        />

        {/* Products */}
        <div className="mx-auto max-w-7xl px-5 md:px-8">

          {productsByCategory.length === 0 ? (
            <div className="py-16">
              <div className="border-[3px] border-black bg-neutral-100 p-10 text-center shadow-[5px_5px_0_#000]">
                <h2 className="font-display text-3xl font-black uppercase">
                  Nothing found
                </h2>

                <p className="mt-2 font-bold uppercase text-neutral-500">
                  Try another search or change your filters.
                </p>
              </div>
            </div>
          ) : (
            productsByCategory.map((section) => (
              <ProductSection
                key={section.category}
                title={section.category}
                products={section.products}
              />
            ))
          )}

        </div>
      </main>
    </div>
  );
}