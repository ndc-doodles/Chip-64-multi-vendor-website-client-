export default function LuxButton({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseStyles =
    "px-8 py-3 text-sm uppercase tracking-widest font-light transition-all rounded-sm inline-block";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-border bg-card hover:bg-card/80 text-foreground",
    ghost:
      "text-foreground hover:text-accent",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
