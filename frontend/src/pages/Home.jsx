import { useState, useEffect } from "react";

import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Marquee from "../components/home/Marquee";
import CategoryBrowser from "../components/home/CategoryBrowser";
import    FeaturedProducts from "../components/home/FeaturedCard";
import Footer from "../components/layout/Footer";
import PixelLoader from "../components/ui/PixelLoader";

import { getProducts } from "../api/products";
import { filterProducts } from "../utils/productSearch";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [productType, setProductType] = useState("All Items");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  getProducts()
    .then(setProducts)
    .catch((err) => {
      console.error("Failed to load products:", err);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);
  const filteredProducts = filterProducts(
    products,
    search,
    category,
    productType
  );

  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 3);

return loading ? (
  <PixelLoader />
) : (
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
        products={featuredProducts}
      />
    </main>

    <Footer />
  </div>
);
 
}