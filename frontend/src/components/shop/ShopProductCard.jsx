import { FaWhatsapp } from "react-icons/fa";
import Button from "../ui/Button";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
export default function ShopProductCard({ product }) {
  const { addToCart, openCart } = useCart();

  const handleWhatsApp = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
    openCart();
  };
const [added, setAdded] = useState(false);
  return (
    <article className="group min-w-0 overflow-hidden border-[3px] border-black bg-white shadow-[4px_4px_0_#000]">
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

        <span className="absolute bottom-2 left-2 border-2 border-black bg-white px-2 py-1 text-[9px] font-black uppercase shadow-[2px_2px_0_#000]">
          {product.material}
        </span>
      </div>

      {/* Details */}
      <div className="p-2.5 sm:p-3">
        <div className="flex min-w-0 items-start justify-between gap-2">
          <h3 className="min-w-0 flex-1 wrap-break-word font-display text-sm font-black uppercase leading-[0.95] sm:text-base">
            {product.name}
          </h3>

          <span className="shrink-0 whitespace-nowrap text-xs font-black text-(--red) sm:text-sm">
            ₹{product.price}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-3 grid grid-cols-2 gap-1.5 sm:gap-2">
<Button
  type="button"
  variant={added ? "yellow" : "black"}
  className="
    flex
    w-full
    items-center
    justify-center
    gap-1
    whitespace-nowrap
    px-1
    py-2
    text-[9px]
  "
  onClick={(event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }}
>
  {added ? "Added ✓" : "Add"}
</Button>
          <Button
            type="button"
            variant="whatsapp"
            className="
      flex
      w-full
      items-center
      justify-center
      px-2
      py-2
    "
            onClick={handleWhatsApp}
            aria-label={`Order ${product.name} on WhatsApp`}
          >
            <FaWhatsapp className="text-lg" />
          </Button>
        </div>
      </div>
    </article>
  );
}
