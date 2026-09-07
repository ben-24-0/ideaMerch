import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="overflow-hidden">
        {/* 404 HERO */}
        <section className="border-b-[3px] border-black px-5 py-12 sm:py-16 md:py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-center">

            {/* 404 */}
            <div className="relative">
              <h1
                className="
                  select-none
                  font-display
                  text-[clamp(7rem,22vw,18rem)]
                  font-black
                  uppercase
                  leading-[0.73]
                  tracking-[-0.08em]
                  text-[var(--yellow)]
                  [-webkit-text-stroke:3px_#000]
                  drop-shadow-[10px_10px_0_#000]
                  sm:[-webkit-text-stroke:4px_#000]
                "
              >
                404
              </h1>

              {/* Decorative lines */}
              <span className="absolute -left-8 top-1/2 h-1 w-10 rotate-[-35deg] bg-black sm:-left-14 sm:w-14" />
              <span className="absolute -right-8 top-1/3 h-1 w-10 rotate-[35deg] bg-black sm:-right-14 sm:w-14" />
            </div>

            {/* Bunny */}
            <div className="relative -mt-3 w-full max-w-[430px] sm:-mt-6">
              {/* Question marks */}
              <span className="absolute left-[8%] top-[28%] z-10 rotate-[-12deg] font-display text-6xl font-black text-[var(--red)] drop-shadow-[3px_3px_0_#000] sm:text-7xl">
                ?
              </span>

              <span className="absolute right-[7%] top-[20%] z-10 rotate-[12deg] font-display text-5xl font-black text-[var(--red)] drop-shadow-[3px_3px_0_#000] sm:text-6xl">
                ?
              </span>

              <span className="absolute right-[15%] bottom-[24%] z-10 rotate-[8deg] font-display text-4xl font-black text-[var(--yellow)] drop-shadow-[3px_3px_0_#000] sm:text-5xl">
                ?
              </span>

              <img
                src="/bunny.png"
                alt="Confused IdeaMerch bunny"
                className="relative z-[1] mx-auto block w-full object-contain"
              />
            </div>

            {/* Message */}
            <div className="-mt-2 text-center sm:-mt-6">
              <h2 className="font-display text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl md:text-5xl">
                Oops. This page
                <br className="sm:hidden" /> hopped away.
              </h2>

              <p className="mx-auto mt-5 max-w-xl font-mono text-sm font-bold leading-relaxed text-neutral-600 sm:text-base">
                The page you're looking for doesn't exist
                <br className="hidden sm:block" />
                or might have been moved.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 grid w-full max-w-xl gap-4 sm:grid-cols-2">
              <Link
                to="/"
                className="
                  neo-button
                  flex items-center justify-center
                  bg-[var(--yellow)]
                  px-6 py-4
                  text-center
                  font-black
                  uppercase
                "
              >
                Back home
                <span className="ml-3 text-2xl leading-none">→</span>
              </Link>

              <Link
                to="/shop"
                className="
                  neo-button
                  flex items-center justify-center
                  bg-white
                  px-6 py-4
                  text-center
                  font-black
                  uppercase
                "
              >
                Shop products
              </Link>
            </div>

            {/* Footer line */}
            <div className="mt-12 flex items-center gap-3 font-mono text-xs font-black uppercase tracking-widest sm:mt-16">
              <span className="text-xl text-[var(--red)]">♥</span>
              <span>Ideas look good on you.</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}