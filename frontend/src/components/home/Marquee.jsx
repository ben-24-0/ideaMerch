export default function Marquee() {
  const items = [
    "LASER CUT",
    "LASER ENGRAVED",
    "PERSONALIZED",
    "MADE TO ORDER",
  ];

  return (
    <section className="overflow-hidden border-b-[3px] border-black bg-[var(--black)] py-4 text-[var(--yellow)]">
      <div className="marquee-track flex w-max">
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center whitespace-nowrap"
          >
            <span className="px-6 text-xl font-black uppercase md:text-2xl">
              {item}
            </span>

            <span className="text-2xl font-black text-[var(--red)]">
              ★
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}