import { FaWhatsapp } from "react-icons/fa";
import Button from "../ui/Button";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product, onWhatsApp }) {
  const { addToCart, openCart } = useCart();

  return (
    <article className="group border-[3px] border-black bg-white shadow-[5px_5px_0_#000]">

      {/* Image */}
      <div className="relative aspect-square overflow-hidden border-b-[3px] border-black bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />

        {/* Material */}
        <span className="absolute bottom-2 left-2 border-2 border-black bg-white px-2 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0_#000]">
          {product.material}
        </span>
      </div>

      {/* Details */}
      <div className="p-2.5 sm:p-4">

        {/* Category + Type */}
        <div className="mb-1 truncate text-[8px] font-black uppercase text-neutral-500 sm:mb-2 sm:text-[10px]">
          {product.category} / {product.type}
        </div>

        {/* Name + Price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 wrap-break-word font-display text-sm font-black uppercase leading-[0.95] sm:text-lg">
            {product.name}
          </h3>

          <span className="shrink-0 text-xs font-black text-(--red) sm:text-base">
            ₹{product.price}
          </span>
        </div>

        {/* Description */}
        {product.description && (
          <p className="mt-2 hidden line-clamp-2 text-xs font-bold leading-relaxed text-neutral-600 sm:block">
            {product.description}
          </p>
        )}

        {/* Actions */}
        <div className="mt-3 grid grid-cols-1 gap-2 sm:mt-4 sm:grid-cols-2">

          <Button
            type="button"
            variant="black"
            className="min-h-11 w-full whitespace-nowrap px-1.5 py-2 text-[9px] leading-none sm:px-2 sm:text-[10px]"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              addToCart(product);
            }}
          >
            <span className="sm:hidden">Add</span>
            <span className="hidden sm:inline">Add to cart</span>
          </Button>

          <Button
            type="button"
            variant="whatsapp"
            className="flex min-h-11 w-full items-center justify-center gap-1 whitespace-nowrap px-1.5 py-2 text-[9px] leading-none sm:px-2 sm:text-[10px]"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onWhatsApp?.(product);
              addToCart(product);
              openCart();
            }}
          >
            <FaWhatsapp className="text-sm" />
            WhatsApp
          </Button>

        </div>
      </div>
    </article>
  );
}