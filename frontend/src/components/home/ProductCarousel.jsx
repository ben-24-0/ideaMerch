import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { getProducts } from "../../api/products";

export default function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    duration: 35,
  });


    const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => console.error("Failed to load carousel products:", err));
  }, []);

    useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi, products]);

useEffect(() => {
    if (!emblaApi || products.length === 0) return;

  let intervalId = null;
    let resumeTimeoutId = null;

  const startAutoplay = () => {
    if (intervalId !== null) return;

    intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
  };

  const stopAutoplay = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const scheduleResume = () => {
    window.clearTimeout(resumeTimeoutId);
    resumeTimeoutId = window.setTimeout(startAutoplay, 4000);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  };

  const handlePointerDown = () => stopAutoplay();
  const handleSettle = () => {
    stopAutoplay();
    if (!document.hidden) scheduleResume();
  };

  if (!document.hidden) startAutoplay();

  document.addEventListener(
    "visibilitychange",
    handleVisibilityChange
  );
  emblaApi.on("pointerDown", handlePointerDown);
  emblaApi.on("settle", handleSettle);

  return () => {
    stopAutoplay();
    window.clearTimeout(resumeTimeoutId);
    emblaApi.off("pointerDown", handlePointerDown);
    emblaApi.off("settle", handleSettle);

    document.removeEventListener(
      "visibilitychange",
      handleVisibilityChange
    );
  };
}, [emblaApi, products.length]);
  return (
    <div className="relative h-full w-full min-w-0 overflow-hidden">

      {/* Heading */}
      <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between sm:left-6 sm:right-6 sm:top-6">
        <h2 className="text-lg font-black uppercase sm:text-xl md:text-2xl">
          Our products
        </h2>

          <span className="text-[10px] font-black uppercase sm:text-sm">
          Swipe →
        </span>
      </div>

      {/* Embla viewport */}
      <div
        ref={emblaRef}
        className="h-full min-w-0 overflow-hidden"
      >
        {/* Embla track */}
        <div className="flex h-full">

          {products.map((product) => (
            <div
              key={product.id}
              className="flex min-w-0 shrink-0 grow-0 basis-[78%] items-center justify-center px-3 pb-14 pt-20 sm:basis-[72%] sm:px-5 sm:pb-16 sm:pt-24 lg:basis-full lg:px-12"
            >
              {/* SAME CARD UI */}
              <article className="w-full max-w-xl overflow-hidden border-[3px] border-black bg-white shadow-[6px_6px_0_#000] sm:shadow-[8px_8px_0_#000]">

                {/* Image */}
                <div className="aspect-4/3 overflow-hidden border-b-[3px] border-black bg-neutral-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="border-t-0 bg-white p-3 sm:p-4 md:p-5">
                  <div className="flex items-start justify-between gap-2 sm:gap-4">

                    <div>
                      <p className="mb-1 truncate text-[10px] font-black uppercase text-neutral-500 sm:text-xs">
                        {product.material}
                      </p>

                      <h3 className="text-base font-black uppercase leading-tight sm:text-xl md:text-2xl">
                        {product.name}
                      </h3>
                    </div>

                    <span className="whitespace-nowrap text-base font-black text-(--red) sm:text-xl md:text-2xl">
                     ₹{product.price}
                    </span>

                  </div>
                </div>

              </article>
            </div>
          ))}

        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 sm:bottom-6">
        {products.map((product, index) => (
          <button
            key={product.id}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`View ${product.name}`}
            className="h-3 w-3 border-2 border-black bg-white transition-colors"
          />
        ))}
      </div>

    </div>
  );
}