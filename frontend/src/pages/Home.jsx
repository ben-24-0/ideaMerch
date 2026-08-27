import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Marquee from "../components/home/Marquee";
import CategoryBrowser from "../components/home/CategoryBrowser";
import FeaturedProducts from "../components/home/FeaturedCard";
import Footer from "../components/layout/Footer";
import { products } from "../data/products";
import { filterProducts } from "../utils/productSearch";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [productType, setProductType] = useState("All Items");

  const filteredProducts = filterProducts(
    products,
    search,
    category,
    productType
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <Hero />

        <Marquee />

        <CategoryBrowser
          search={search}
          category={category}
          productType={productType}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onProductTypeChange={setProductType}
        />

        <FeaturedProducts
          products={filteredProducts}
        />
      </main>
      <Footer/>
    </div>
  );
}