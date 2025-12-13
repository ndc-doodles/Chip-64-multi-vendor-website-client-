export default function InputField({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`flex-1 px-4 py-3 border border-border/50 bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all rounded-sm text-sm font-light ${className}`}
      {...props}
    />
  );
}
