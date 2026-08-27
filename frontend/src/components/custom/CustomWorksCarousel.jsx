import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

const customWorks = [
  {
    id: 1,
    name: "Custom Letter Keychains",
    type: "Keychains",
    image: "/custom/keychains.jpg",
  },
  {
    id: 2,
    name: "Engraved Portrait",
    type: "Engraving",
    image: "/custom/portrait.jpg",
  },
  {
    id: 3,
    name: "College Mementos",
    type: "Mementos",
    image: "/custom/mementos.jpg",
  },
  {
    id: 4,
    name: "Custom Figures",
    type: "Figures",
    image: "/custom/figures.jpg",
  },
];

export default function CustomWorksCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    duration: 35,
  });

  /* Autoplay */
  useEffect(() => {
    if (!emblaApi) return;

    let intervalId = null;

    const startAutoplay = () => {
      if (intervalId !== null) return;

      intervalId = setInterval(() => {
        emblaApi.scrollNext();
      }, 3500);
    };

    const stopAutoplay = () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    };

    startAutoplay();

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      stopAutoplay();

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [emblaApi]);

  return (
    <section className="border-y-[3px] border-black bg-[var(--yellow)]">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">

        {/* Heading */}
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-widest">
              Made before
            </p>

            <h2 className="font-display text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
              Custom work.
            </h2>
          </div>

          <span className="hidden text-sm font-black uppercase sm:block">
            Swipe →
          </span>
        </div>

        {/* Carousel */}
        <div
          ref={emblaRef}
          className="overflow-hidden"
        >
          <div className="flex">

            {customWorks.map((work) => (
              <div
                key={work.id}
                className="
                  min-w-0
                  shrink-0
                  grow-0
                  basis-full
                  px-1
                  sm:basis-[85%]
                  md:basis-[65%]
                  lg:basis-[50%]
                "
              >
                <article className="overflow-hidden border-[3px] border-black bg-white shadow-[7px_7px_0_#000]">

                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden border-b-[3px] border-black bg-neutral-100">
                    <img
                      src={work.image}
                      alt={work.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-300
                        hover:scale-105
                      "
                    />
                  </div>

                  {/* Details */}
                  <div className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <p className="mb-1 text-xs font-black uppercase text-neutral-500">
                        {work.type}
                      </p>

                      <h3 className="font-display text-2xl font-black uppercase leading-none">
                        {work.name}
                      </h3>
                    </div>

                    <span className="shrink-0 border-[2px] border-black bg-[var(--red)] px-3 py-2 text-xs font-black uppercase text-white">
                      Custom
                    </span>
                  </div>

                </article>
              </div>
            ))}

          </div>
        </div>

        {/* Dots */}
        <div className="mt-7 flex justify-center gap-2">
          {customWorks.map((work, index) => (
            <button
              key={work.id}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`View ${work.name}`}
              className="
                h-3
                w-3
                border-2
                border-black
                bg-white
                transition-transform
                hover:scale-125
              "
            />
          ))}
        </div>

      </div>
    </section>
  );
}