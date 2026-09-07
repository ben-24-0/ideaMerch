import { useEffect ,useState} from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

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
      {toasts.map((toast) => (
        <ToastCard
          key={toast.id}
          toast={toast}
          onUndo={undoAddToCart}
          onClose={closeToast}
        />
      ))}
    </div>
  );
}
function ToastCard({
  toast,
  onUndo,
  onClose,
}) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id]);

  useEffect(() => {
    if (!isLeaving) return;

    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 300);

    return () => clearTimeout(timer);
  }, [isLeaving, toast.id, onClose]);

  const handleClose = () => {
    setIsLeaving(true);
  };

  const handleUndo = () => {
    setIsLeaving(true);

    setTimeout(() => {
      onUndo(
        toast.id,
        toast.product.id
      );
    }, 300);
  };

  const color =
    toast.color === "green"
      ? "bg-[#90EE82]"
      : toast.color === "yellow"
        ? "bg-[var(--yellow)]"
        : "bg-[#FF8A8A]";

  return (
    <div
      className={`
        border-[3px]
        border-black
        p-4
        shadow-[6px_6px_0_#000]
        ${color}

        transition-all
        duration-300
        ease-out

        ${
          isLeaving
            ? "translate-x-8 opacity-0"
            : "translate-x-0 opacity-100"
        }
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
          onClick={handleClose}
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
        onClick={handleUndo}
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
}