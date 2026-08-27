import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-black bg-black text-white">
      <div className="mx-auto max-w-7xl">

        {/* Main footer */}
        <div className="grid gap-10 px-5 py-12 md:grid-cols-3 md:px-8 md:py-16">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-display text-4xl font-black uppercase tracking-[-0.05em]"
            >
              Idea<span className="text-[var(--red)]">Merch</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm font-bold leading-relaxed text-neutral-400">
              Turning ideas into things you can hold,
              use and remember.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-widest text-neutral-500">
              Explore
            </p>

            <nav className="flex flex-col items-start gap-2">
              <Link
                to="/"
                className="font-black uppercase hover:text-[var(--yellow)]"
              >
                Home
              </Link>

              <Link
                to="/shop"
                className="font-black uppercase hover:text-[var(--yellow)]"
              >
                Shop
              </Link>

              <Link
                to="/custom"
                className="font-black uppercase hover:text-[var(--yellow)]"
              >
                Custom
              </Link>

              <Link
                to="/about"
                className="font-black uppercase hover:text-[var(--yellow)]"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-widest text-neutral-500">
              Get in touch
            </p>

            <div className="space-y-2 text-sm font-bold">
              <a
                href="mailto:hello@ideamerch.in"
                className="block hover:text-[var(--yellow)]"
              >
                hello@ideamerch.in
              </a>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[var(--yellow)]"
              >
                <FaWhatsapp />
                WhatsApp
              </a>
            </div>

            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center border-2 border-white bg-black hover:bg-[var(--yellow)] hover:text-black"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center border-2 border-white bg-black hover:bg-[var(--yellow)] hover:text-black"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t-[3px] border-neutral-700 px-5 py-5 md:px-8">
          <div className="flex flex-col justify-between gap-2 text-xs font-bold uppercase text-neutral-500 sm:flex-row">
            <p>
              © {new Date().getFullYear()} IdeaMerch
            </p>

            <p>
              Made with ideas.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}