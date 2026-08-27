import Fuse from "fuse.js";

const fuseOptions = {
  keys: [
    {
      name: "name",
      weight: 0.45,
    },
    {
      name: "category",
      weight: 0.2,
    },
    {
      name: "type",
      weight: 0.2,
    },
    {
      name: "material",
      weight: 0.1,
    },
    {
      name: "tags",
      weight: 0.05,
    },
    {
      name: "description",
      weight: 0.05,
    },
  ],

  threshold: 0.35,
  ignoreLocation: true,
};

export function filterProducts(
  products,
  search = "",
  category = "All Categories",
  productType = "All Items"
) {
  let results = products;

  // Fuzzy search
  if (search.trim()) {
    const fuse = new Fuse(products, fuseOptions);

    results = fuse
      .search(search.trim())
      .map((result) => result.item);
  }

  // Category filter
  if (category !== "All Categories") {
    results = results.filter(
      (product) => product.category === category
    );
  }

  // Product type filter
  if (productType !== "All Items") {
    results = results.filter(
      (product) => product.type === productType
    );
  }

  return results;
}