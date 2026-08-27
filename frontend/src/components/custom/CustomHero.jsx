import { FiArrowDown } from "react-icons/fi";

export default function CustomHero() {
  return (
    <section className="border-b-[3px] border-black bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          {/* Heading */}
<div>
  <p className="mb-2 text-xs font-black uppercase tracking-widest text-neutral-500">
    Custom orders
  </p>

  <h1 className="font-display text-5xl font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-6xl md:text-7xl">
    Have an{" "}
 <span className="text-[var(--red)] tracking-[0.02em]">
  idea?
</span>
  </h1>
</div>

          {/* Description */}
          <div className="max-w-md md:pb-1">
            <p className="text-base font-bold leading-relaxed text-neutral-600 md:text-lg">
              Keychains, portraits, mementos, figures and
              more. Tell us what you have in mind and we'll
              make it custom.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-black uppercase">
              <FiArrowDown
                size={18}
                strokeWidth={3}
              />
              See what we've made
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}