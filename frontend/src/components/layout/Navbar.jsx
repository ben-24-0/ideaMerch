import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-black bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">

        {/* Logo */}
        <Link
          to="/"
          className="min-w-0 text-2xl font-black uppercase tracking-[-0.06em] sm:text-3xl"
          onClick={closeMenu}
        >
          Idea<span className="text-(--red)">Merch</span>
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

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className="neo-button bg-(--yellow) px-3 py-2 text-xs font-black uppercase sm:px-4 sm:text-sm"
            aria-label={`Open cart with ${itemCount} items`}
          >
            Cart ({itemCount})
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center border-[3px] border-black bg-white md:hidden"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMenuOpen ? <FiX size={22} strokeWidth={3} /> : <FiMenu size={22} strokeWidth={3} />}
          </button>
        </div>

      </div>

      <nav
        className={`${isMenuOpen ? "block" : "hidden"} border-t-[3px] border-black bg-(--yellow) px-4 py-3 md:hidden`}
      >
        <div className="grid grid-cols-2 gap-2">
          {[
            ["Home", "/"],
            ["Shop", "/shop"],
            ["Custom", "/custom"],
            ["About", "/about"],
          ].map(([label, path]) => (
            <Link
              key={path}
              to={path}
              onClick={closeMenu}
              className="border-[3px] border-black bg-white px-3 py-3 text-center text-sm font-black uppercase shadow-[3px_3px_0_#000]"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}