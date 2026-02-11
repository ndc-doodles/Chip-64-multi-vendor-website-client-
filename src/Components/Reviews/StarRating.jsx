import { Star } from "lucide-react";

export default function StarRating({
  value = 0,
  size = 18,
  interactive = false,
  onChange,
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={`cursor-${interactive ? "pointer" : "default"}
            ${i <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          onClick={() => interactive && onChange(i)}
        />
      ))}
    </div>
  );
}
