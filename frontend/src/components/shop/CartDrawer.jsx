import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { openWhatsApp } from "../../utils/whatsapp";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
    customer,
    updateCustomer,
  } = useCart();

  useEffect(() => {
    if (!isCartOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCartOpen]);

  const handleWhatsAppOrder = () => {
    if (
      cart.length === 0 ||
      !customer.name.trim() ||
      !customer.email.trim()
    ) {
      return;
    }

    const items = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}
Qty: ${item.quantity}
Unit Price: ₹${item.price}
Subtotal: ₹${item.price * item.quantity}`
      )
      .join("\n\n");

    const message = ` IDEAMERCH ORDER

CUSTOMER
Name: ${customer.name}
Email: ${customer.email}

ORDER ITEMS
━━━━━━━━━━━━━━━━

${items}

━━━━━━━━━━━━━━━━
TOTAL: ₹${cartTotal}

Please confirm availability and invoice details.`;

    openWhatsApp(message);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`
          fixed inset-0 z-40 bg-black/50
          transition-opacity duration-200
          ${
            isCartOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed right-0 top-0 z-50
          flex h-full w-full max-w-md flex-col
          border-l-[3px] border-black bg-white
          shadow-[-8px_0_0_#000]
          transition-transform duration-300 ease-out
          ${
            isCartOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
        aria-hidden={!isCartOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-[3px] border-black bg-(--yellow) px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase">
              Your selection
            </p>

            <h2 className="font-display text-3xl font-black uppercase leading-none">
              Cart
            </h2>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="
              flex h-10 w-10 items-center justify-center
              border-[3px] border-black bg-white
              shadow-[3px_3px_0_#000]
              transition-all
              hover:translate-x-0.5
              hover:translate-y-0.5
              hover:shadow-[1px_1px_0_#000]
            "
          >
            <FiX size={22} strokeWidth={3} />
          </button>
        </div>

        {/* Items */}
        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
          {cart.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="w-full border-[3px] border-black bg-neutral-100 p-8 text-center shadow-[5px_5px_0_#000]">
                <p className="font-display text-3xl font-black uppercase">
                  Cart is empty
                </p>

                <p className="mt-2 text-sm font-bold uppercase text-neutral-500">
                  Add something you like.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() =>
                    increaseQuantity(item.id)
                  }
                  onDecrease={() =>
                    decreaseQuantity(item.id)
                  }
                  onRemove={() =>
                    removeFromCart(item.id)
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="max-h-[55%] overflow-y-auto border-t-[3px] border-black bg-white p-3 sm:p-5">

          {/* Total */}
          <div className="mb-5 flex items-center justify-between">
            <span className="font-black uppercase">
              Total
            </span>

            <span className="font-display text-3xl font-black text-(--red)">
              ₹{cartTotal}
            </span>
          </div>

          {/* Customer details */}
          <div className="mb-5">
            <div className="mb-3">
              <p className="text-xs font-black uppercase text-neutral-500">
                Before you order
              </p>

              <h3 className="font-display text-xl font-black uppercase">
                Your details
              </h3>
            </div>

            <div className="space-y-3">

              {/* Name */}
              <input
                type="text"
                placeholder="Your name *"
                value={customer.name}
                onChange={(event) =>
                  updateCustomer(
                    "name",
                    event.target.value
                  )
                }
                className="
                  w-full border-[3px] border-black
                  bg-white px-4 py-3
                  font-bold outline-none
                  placeholder:text-neutral-400
                  focus:border-(--red)
                "
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Email address *"
                value={customer.email}
                onChange={(event) =>
                  updateCustomer(
                    "email",
                    event.target.value
                  )
                }
                className="
                  w-full border-[3px] border-black
                  bg-white px-4 py-3
                  font-bold outline-none
                  placeholder:text-neutral-400
                  focus:border-(--red)
                "
              />

            </div>
          </div>

          {/* WhatsApp */}
          <button
            type="button"
            onClick={handleWhatsAppOrder}
            disabled={
              cart.length === 0 ||
              !customer.name.trim() ||
              !customer.email.trim()
            }
            className="
              flex w-full items-center justify-center gap-2
              border-[3px] border-black
              bg-[#25D366]
              px-5 py-4
              font-display text-lg font-black uppercase
              shadow-[5px_5px_0_#000]
              transition-all
              hover:translate-x-0.5
              hover:translate-y-0.5
              hover:shadow-[3px_3px_0_#000]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            Order on WhatsApp
          </button>
        </div>
      </aside>
    </>
  );
}

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="border-[3px] border-black bg-white shadow-[4px_4px_0_#000]">
      <div className="flex gap-4 p-4">

        {/* Image */}
        <div className="h-24 w-24 shrink-0 overflow-hidden border-[3px] border-black bg-neutral-100">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-black uppercase leading-tight">
              {item.name}
            </h3>

            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remove ${item.name}`}
              className="shrink-0 text-(--red) hover:scale-110"
            >
              <FiTrash2
                size={18}
                strokeWidth={3}
              />
            </button>
          </div>

          <p className="mt-1 text-xs font-black uppercase text-neutral-500">
            {item.material}
          </p>

          <p className="mt-2 font-black">
            ₹{item.price}
          </p>

          {/* Quantity */}
          <div className="mt-3 flex items-center">

            <button
              type="button"
              onClick={onDecrease}
              className="
                flex h-8 w-8
                items-center justify-center
                border-2 border-black
                bg-white
                hover:bg-neutral-100
              "
            >
              <FiMinus strokeWidth={3} />
            </button>

            <span className="flex h-8 min-w-10 items-center justify-center border-y-2 border-black px-2 font-black">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={onIncrease}
              className="
                flex h-8 w-8
                items-center justify-center
                border-2 border-black
                bg-(--yellow)
                hover:bg-(--red)
                hover:text-white
              "
            >
              <FiPlus strokeWidth={3} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}