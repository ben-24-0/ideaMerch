import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [toasts, setToasts] = useState([]);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
  });
  const toastColors = [
  "green",
  "yellow",
  "red",
];

const [nextToastColor, setNextToastColor] = useState(0);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const updateCustomer = (field, value) => {
    setCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  };

const addToCart = (product) => {
  setCart((currentCart) => {
    const existingItem = currentCart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      return currentCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    }

    return [
      ...currentCart,
      {
        ...product,
        quantity: 1,
      },
    ];
  });

  const toast = {
    id: crypto.randomUUID(),
    product,
    color: toastColors[nextToastColor],
  };

  setNextToastColor(
    (current) => (current + 1) % toastColors.length
  );

  setToasts((current) => [toast, ...current]);
};
const undoAddToCart = useCallback((toastId, productId) => {
  setToasts((current) =>
    current.filter((toast) => toast.id !== toastId)
  );

  setCart((currentCart) =>
    currentCart
      .map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
}, []);
const closeToast = useCallback((toastId) => {
  setToasts((current) =>
    current.filter((toast) => toast.id !== toastId)
  );
}, []);

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,

        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,

        itemCount,
        cartTotal,

        isCartOpen,
        openCart,
        closeCart,

        customer,
        updateCustomer,

        toasts,
        undoAddToCart,
        closeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider"
    );
  }

  return context;
}