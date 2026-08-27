import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

const products = [
  {
    id: 1,
    name: "Custom Name Plate",
    price: "₹499",
    material: "Wood",
    image: "/products/name-plate.jpg",
  },
  {
    id: 2,
    name: "Personalized Keychain",
    price: "₹199",
    material: "MDF",
    image: "/products/keychain.jpg",
  },
  {
    id: 3,
    name: "Tree of Life",
    price: "₹899",
    material: "Wood",
    image: "/products/tree-of-life.jpg",
  },
  {
    id: 4,
    name: "Acrylic QR Stand",
    price: "₹349",
    material: "Acrylic",
    image: "/products/qr-stand.jpg",
  },
  {
    id: 5,
    name: "Engraved Gift Box",
    price: "₹599",
    material: "Plywood",
    image: "/products/gift-box.jpg",
  },
];

export default function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    duration: 35,
  });

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

useEffect(() => {
  if (!emblaApi) return;

  let intervalId = null;

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
    <div className="relative h-full w-full overflow-hidden">

      {/* Heading */}
      <div className="absolute left-6 right-6 top-6 z-20 flex items-center justify-between">
        <h2 className="text-xl font-black uppercase md:text-2xl">
          Our products
        </h2>

        <span className="text-sm font-black uppercase">
          Swipe →
        </span>
      </div>

      {/* Embla viewport */}
      <div
        ref={emblaRef}
        className="h-full overflow-hidden"
      >
        {/* Embla track */}
        <div className="flex h-full">

          {products.map((product) => (
            <div
              key={product.id}
              className="flex min-w-0 shrink-0 grow-0 basis-full items-center justify-center px-6 pb-16 pt-24 md:px-12"
            >
              {/* SAME CARD UI */}
              <article className="w-full max-w-xl overflow-hidden border-[3px] border-black bg-white shadow-[8px_8px_0_#000]">

                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden border-b-[3px] border-black bg-neutral-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="border-t-0 bg-white p-4 md:p-5">
                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <p className="mb-1 text-xs font-black uppercase text-neutral-500">
                        {product.material}
                      </p>

                      <h3 className="text-xl font-black uppercase leading-tight md:text-2xl">
                        {product.name}
                      </h3>
                    </div>

                    <span className="whitespace-nowrap text-xl font-black text-[var(--red)] md:text-2xl">
                      {product.price}
                    </span>

                  </div>
                </div>

              </article>
            </div>
          ))}

        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {products.map((product, index) => (
          <button
            key={product.id}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`View ${product.name}`}
            className="h-3 w-3 border-2 border-black bg-white transition-colors"
          />
        ))}
      </div>

    </div>
  );
}