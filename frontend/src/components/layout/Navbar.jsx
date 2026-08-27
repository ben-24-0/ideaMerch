import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const { itemCount, openCart } = useCart();

  return (
   <header className="sticky top-0 z-50 border-b-[3px] border-black bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-black uppercase tracking-[-0.06em]"
        >
          Idea<span className="text-[var(--red)]">Merch</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
                    <Link
            to="/"
            className="font-black uppercase hover:underline"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="font-black uppercase hover:underline"
          >
            Shop
          </Link>

          <Link
            to="/custom"
            className="font-black uppercase hover:underline"
          >
            Custom
          </Link>

          <Link
            to="/about"
            className="font-black uppercase hover:underline"
          >
            About
          </Link>
        </nav>

        {/* Cart */}
        <button
          type="button"
          onClick={openCart}
          className="
            neo-button
            bg-[var(--yellow)]
            px-4
            py-2
            text-sm
            font-black
            uppercase
          "
        >
          Cart ({itemCount})
        </button>

      </div>
    </header>
  );
}