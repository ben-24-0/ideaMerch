export default function Button({
  children,
  variant = "yellow",
  className = "",
  ...props
}) {
const variants = {
  yellow: "bg-[var(--yellow)] text-black",
  red: "bg-[var(--red)] text-white",
  black: "bg-black text-white",
  white: "bg-white text-black",
  whatsapp: "bg-[#25D366] text-white",
};
  return (
    <button
      className={`
        neo-button
        px-6 py-3
        text-sm font-black uppercase
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}