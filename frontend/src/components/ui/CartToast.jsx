import { FiCheck, FiX } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

const toastColors = [
  "bg-[#90EE82]",
  "bg-[var(--yellow)]",
  "bg-[#FF8A8A]",
];

export default function CartToast() {
  const {
    toasts,
    undoAddToCart,
    closeToast,
  } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div
      className="
        fixed
        bottom-5
        right-5
        z-[100]
        flex
        w-[calc(100%-2.5rem)]
        max-w-sm
        flex-col
        gap-3
        sm:bottom-6
        sm:right-6
      "
    >
      {toasts.map((toast, index) => {
        const color =
          toastColors[index % toastColors.length];

        return (
          <div
            key={toast.id}
            className={`
              border-[3px]
              border-black
              p-4
              shadow-[6px_6px_0_#000]
              ${color}
            `}
          >
            {/* Header */}
            <div className="flex items-start gap-3">

              <div className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-black bg-white">
                <FiCheck
                  size={17}
                  strokeWidth={3}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-black uppercase leading-none">
                  Added to cart
                </p>

                <p className="mt-1 truncate text-sm font-bold">
                  {toast.product.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => closeToast(toast.id)}
                aria-label="Close notification"
                className="shrink-0"
              >
                <FiX
                  size={17}
                  strokeWidth={3}
                />
              </button>

            </div>

            {/* Undo */}
            <button
              type="button"
              onClick={() =>
                undoAddToCart(
                  toast.id,
                  toast.product.id
                )
              }
              className="
                mt-3
                border-[3px]
                border-black
                bg-white
                px-4
                py-1.5
                text-sm
                font-black
                uppercase
                shadow-[3px_3px_0_#000]
                transition-all
                hover:translate-x-[2px]
                hover:translate-y-[2px]
                hover:shadow-[1px_1px_0_#000]
              "
            >
              Undo
            </button>
          </div>
        );
      })}
    </div>
  );
}