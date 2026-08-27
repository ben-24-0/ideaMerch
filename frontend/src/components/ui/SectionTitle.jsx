export default function SectionTitle({
  eyebrow,
  title,
  description,
}) {
  return (
    <div>
      {eyebrow && (
        <p className="mb-2 font-black uppercase">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 max-w-xl font-bold">
          {description}
        </p>
      )}
    </div>
  );
}