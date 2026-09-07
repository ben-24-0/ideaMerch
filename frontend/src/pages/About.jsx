import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>

        {/* Intro */}
        <section className="border-b-[3px] border-black">
          <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">

            <p className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">
              About IdeaMerch
            </p>

            <h1 className="max-w-4xl font-display text-5xl font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-6xl md:text-8xl">
              Ideas
              <span className="text-[var(--red)]"> made</span>
              <br />
              tangible.
            </h1>

            <p className="mt-8 max-w-2xl text-lg font-bold leading-relaxed text-neutral-600 md:text-xl">
              We create laser-cut, engraved and personalized
              products that turn ideas into something you can
              actually hold, use and remember.
            </p>

          </div>
        </section>

        {/* What we do */}
        <section className="border-b-[3px] border-black">
          <div className="mx-auto grid max-w-7xl md:grid-cols-2">

            <div className="border-b-[3px] border-black px-5 py-12 md:border-b-0 md:border-r-[3px] md:px-8 md:py-16">
              <p className="mb-2 text-xs font-black uppercase tracking-widest text-neutral-500">
                What we do
              </p>

              <h2 className="font-display text-4xl font-black uppercase leading-none md:text-5xl">
                From simple
                <br />
                to custom.
              </h2>
            </div>

            <div className="px-5 py-12 md:px-8 md:py-16">
              <p className="max-w-xl text-base font-bold leading-relaxed text-neutral-700 md:text-lg">
                From personalized keychains and name plates
                to engraved portraits, mementos, figures and
                custom pieces, we work with different materials
                and designs to make each piece your own.
              </p>
            </div>

          </div>
        </section>

        {/* Values */}
        <section className="border-b-[3px] border-black bg-[var(--yellow)]">
          <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">

            <div className="grid gap-5 md:grid-cols-3">

              <InfoCard
                number="01"
                title="Personal"
                text="Your idea, your design, your way."
              />

              <InfoCard
                number="02"
                title="Made to order"
                text="We create pieces with your requirements in mind."
              />

              <InfoCard
                number="03"
                title="Built with care"
                text="Every piece gets attention from design to finish."
              />

            </div>

          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">

            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">

              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-widest text-neutral-500">
                  Have something in mind?
                </p>

                <h2 className="font-display text-4xl font-black uppercase leading-none md:text-6xl">
                  Let's make it.
                </h2>
              </div>

              <Link
                to="/custom"
                className="neo-button bg-[var(--red)] px-6 py-3 text-sm font-black uppercase text-white"
              >
                Start a custom order
              </Link>

            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
// d
function InfoCard({ number, title, text }) {
  return (
    <div className="border-[3px] border-black bg-white p-5 shadow-[5px_5px_0_#000]">
      <p className="mb-8 text-xs font-black text-neutral-400">
        {number}
      </p>

      <h3 className="font-display text-2xl font-black uppercase">
        {title}
      </h3>

      <p className="mt-2 text-sm font-bold leading-relaxed text-neutral-600">
        {text}
      </p>
    </div>
  );
}