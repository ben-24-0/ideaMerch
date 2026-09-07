import ProductCarousel from "./ProductCarousel";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <section className="border-b-[3px] border-black bg-white">
      <div className="mx-auto grid w-full min-w-0 max-w-7xl lg:grid-cols-2">

        {/* Hero content */}
        <div className="min-w-0 flex flex-col justify-center px-4 py-10 sm:px-5 sm:py-14 md:px-10 md:py-24">

          <div className="mb-7 w-fit border-[3px] border-black bg-[var(--yellow)] px-4 py-2 font-black uppercase shadow-[5px_5px_0_#000]">
            Laser cut + engraved
          </div>

          <h1 className="text-[clamp(3.5rem,16vw,8.5rem)] font-black uppercase leading-[0.8] tracking-[-0.075em] sm:text-[clamp(4rem,9vw,8.5rem)]">
            Your
            <br />
            idea.
            <br />
            <span className="text-[var(--red)]">
              Made.
            </span>
          </h1>

          <div className="mt-6 h-[3px] w-20 bg-black" />

          <p className="mt-7 max-w-xl text-lg font-bold leading-relaxed md:text-xl">
            Laser-cut and engraved pieces made from
            wood, acrylic, MDF, leather and more.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8 sm:gap-5">
            <Link
            to ="/shop"
            className="neo-button bg-red-500 px-4 py-3 text-sm uppercase sm:px-5">
               Shop products
            </Link>

            <Link
            to ="/custom"
            className="neo-button bg-yellow-300 px-4 py-3 text-sm uppercase sm:px-5">
               Custom Order
            </Link>

          </div>

          {/* Small service highlights */}
          <div className="mt-8 grid max-w-xl grid-cols-2 gap-0 border-t-[3px] border-black sm:mt-12 sm:grid-cols-4">

            <div className="border-b-[3px] border-black py-4 sm:border-b-0 sm:border-r-[3px] sm:pr-4">
              <p className="text-xs font-black uppercase">
                Precision
              </p>
              <p className="mt-1 text-xs font-bold uppercase text-neutral-600">
                Clean cuts
              </p>
            </div>

            <div className="border-b-[3px] border-black py-4 sm:border-b-0 sm:border-r-[3px] sm:px-4">
              <p className="text-xs font-black uppercase">
                Premium
              </p>
              <p className="mt-1 text-xs font-bold uppercase text-neutral-600">
                Quality
              </p>
            </div>

            <div className="border-b-[3px] py-4 sm:border-b-0 sm:border-r-[3px] sm:border-black sm:px-4">
              <p className="text-xs font-black uppercase">
                Custom
              </p>
              <p className="mt-1 text-xs font-bold uppercase text-neutral-600">
                Your design
              </p>
            </div>

            <div className="py-4 sm:pl-4">
              <p className="text-xs font-black uppercase">
                Fast
              </p>
              <p className="mt-1 text-xs font-bold uppercase text-neutral-600">
                Delivery
              </p>
            </div>

          </div>

        </div>

        {/* Product carousel */}
        <div className="min-w-0 h-[455px] border-t-[3px] border-black bg-[var(--yellow)] sm:h-[540px] lg:h-auto lg:min-h-[680px] lg:border-l-[3px] lg:border-t-0">
          <ProductCarousel />
        </div>

      </div>
    </section>
  );
}