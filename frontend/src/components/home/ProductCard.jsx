import { FaWhatsapp } from "react-icons/fa";
import Button from "../ui/Button";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product, onWhatsApp }) {
  const { addToCart ,openCart} = useCart();



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
      <div className="p-4">

        {/* Category + Type */}
        <div className="mb-2 text-[10px] font-black uppercase text-neutral-500">
          {product.category} / {product.type}
        </div>

        {/* Name + Price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-black uppercase leading-[0.95]">
            {product.name}
          </h3>

          <span className="shrink-0 text-base font-black text-[var(--red)]">
            ₹{product.price}
          </span>
        </div>

        {/* Description */}
        {product.description && (
          <p className="mt-2 line-clamp-2 text-xs font-bold leading-relaxed text-neutral-600">
            {product.description}
          </p>
        )}

        {/* Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2">

          <Button
            variant="black"
            className="w-full px-2 py-2 text-[10px]"
            onClick={() => {
              addToCart(product);
              //
            }}
          >
            Add to cart
          </Button>

          <Button
            variant="whatsapp"
            className="flex w-full items-center justify-center gap-1 px-2 py-2 text-[10px]"
            onClick={() => {onWhatsApp?.(product) ; addToCart(product);openCart();}}
          >
            <FaWhatsapp className="text-sm" />
            WhatsApp
          </Button>

        </div>
      </div>
    </article>
  );
}