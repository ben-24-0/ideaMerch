import { FiSearch, FiX, FiChevronDown } from "react-icons/fi";

const categories = [
  "All Categories",
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

const productTypes = [
  "All Items",
  "Keychains",
  "Name Plates",
  "Stands",
  "Mementos",
  "Puzzles",
  "Photo Frames",
  "Wall Decor",
  "Bookmarks",
  "Coasters",
  "Gift Boxes",
  "Signs",
  "Ornaments",
  "Desk Accessories",
];

export default function CategoryBrowser({
  search = "",
  category = "All Categories",
  productType = "All Items",
  onSearchChange,
  onCategoryChange,
  onProductTypeChange,
}) {
  return (
    <section className="border-b-[3px] border-black bg-white">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">

        {/* Header */}
        <div className="mb-6">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-neutral-500">
            Explore our collection
          </p>

          <h2 className="font-display text-4xl font-black uppercase leading-none tracking-tight md:text-5xl">
            Browse products
          </h2>
        </div>

        {/* Controls */}
        <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr]">

          {/* Search */}
          <div>
            <label
              htmlFor="product-search"
              className="mb-2 block text-xs font-black uppercase tracking-wide"
            >
              Search
            </label>

            <div className="relative">
<FiSearch
  size={20}
  strokeWidth={3}
  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
/>

              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(event) =>
                  onSearchChange?.(event.target.value)
                }
                placeholder="Search products..."
                className="
                  w-full
                  border-[3px]
                  border-black
                  bg-white
                  py-3
                  pl-12
                  pr-12
                  font-display
                  text-base
                  font-bold
                  uppercase
                  shadow-[4px_4px_0_#000]
                  outline-none
                  transition-all
                  placeholder:text-neutral-400
                  hover:translate-x-[2px]
                  hover:translate-y-[2px]
                  hover:shadow-[2px_2px_0_#000]
                  focus:translate-x-[4px]
                  focus:translate-y-[4px]
                  focus:border-[var(--red)]
                  focus:shadow-none
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() => onSearchChange?.("")}
                  aria-label="Clear search"
                  className="
                    absolute
                    right-3
                    top-1/2
                    flex
                    h-7
                    w-7
                    -translate-y-1/2
                    items-center
                    justify-center
                    border-2
                    border-black
                    bg-[var(--red)]
                    text-white
                    transition-transform
                    hover:translate-x-[1px]
                    hover:translate-y-[1px]
                  "
                >
                 <FiX size={16} strokeWidth={4} />
                </button>
              )}
            </div>
          </div>

          {/* Category */}
          <FilterSelect
            id="category"
            label="Category"
            value={category}
            options={categories}
            onChange={onCategoryChange}
            accent="red"
          />

          {/* Item Type */}
          <FilterSelect
            id="product-type"
            label="Item type"
            value={productType}
            options={productTypes}
            onChange={onProductTypeChange}
            accent="yellow"
          />

        </div>
      </div>
    </section>
  );
}

function FilterSelect({
  id,
  label,
  value,
  options,
  onChange,
  accent = "yellow",
}) {
  const accentClass =
    accent === "red"
      ? "bg-[var(--red)] text-white"
      : "bg-[var(--yellow)] text-black";

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-black uppercase tracking-wide"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          className="
            w-full
            appearance-none
            border-[3px]
            border-black
            bg-white
            px-4
            py-3
            pr-14
            font-display
            text-base
            font-bold
            uppercase
            shadow-[4px_4px_0_#000]
            outline-none
            transition-all
            hover:translate-x-[2px]
            hover:translate-y-[2px]
            hover:shadow-[2px_2px_0_#000]
            focus:translate-x-[4px]
            focus:translate-y-[4px]
            focus:border-[var(--red)]
            focus:shadow-none
          "
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div
          className={`
            pointer-events-none
            absolute
            right-3
            top-1/2
            flex
            h-7
            w-7
            -translate-y-1/2
            items-center
            justify-center
            border-2
            border-black
            text-xs
            font-black
            ${accentClass}
          `}
        >
<FiChevronDown size={16} strokeWidth={4} />
        </div>
      </div>
    </div>
  );
}