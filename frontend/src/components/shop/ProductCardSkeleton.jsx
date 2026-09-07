function SkeletonBlock({ className = "" }) {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-neutral-200
        before:absolute before:inset-0
        before:-translate-x-full
        before:bg-gradient-to-r
        before:from-transparent
        before:via-white/60
        before:to-transparent
        before:animate-shimmer
        ${className}
      `}
    />
  );
}

export default function ProductCardSkeleton() {
  return (
    <article className="border-[3px] border-black bg-white shadow-[6px_6px_0_#000]">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden border-b-[3px] border-black bg-neutral-200">
        <SkeletonBlock className="absolute inset-0" />

        {/* Material badge */}
        <div className="absolute bottom-3 left-3 border-[3px] border-black bg-white px-3 py-1">
          <SkeletonBlock className="h-3 w-14" />
        </div>
      </div>

      {/* Card content */}
      <div className="p-3">
        {/* Name + price */}
        <div className="flex items-center justify-between gap-2">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-4 w-10 shrink-0" />
        </div>

        {/* Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <SkeletonBlock className="h-12 w-full" />
          <SkeletonBlock className="h-12 w-full" />
        </div>
      </div>
    </article>
  );
}