import { FaWhatsapp } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Button from "../ui/Button";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
export default function ShopProductCard({ product }) {
  const { addToCart, openCart } = useCart();

  const handleWhatsApp = () => {
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
      <div className="p-3">
        <div className="flex min-w-0 items-start justify-between gap-2">
          <h3 className="min-w-0 flex-1 break-words font-display text-base font-black uppercase leading-[0.95]">
            {product.name}
          </h3>

          <span className="shrink-0 whitespace-nowrap text-sm font-black text-[var(--red)]">
            ₹{product.price}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-3 grid grid-cols-2 gap-2">
<Button
  variant={added ? "yellow" : "black"}
  className="
    flex
    w-full
    items-center
    justify-center
    gap-1
    whitespace-nowrap
    px-2
    py-2
    text-[9px]
  "
  onClick={() => {
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
