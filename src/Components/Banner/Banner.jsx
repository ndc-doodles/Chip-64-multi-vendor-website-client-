import { Link } from "react-router-dom";

export default function CollectionBanner({ title, subtitle, image, slug }) {
  return (
    <Link
      to={`/collections/${slug}`}
      className="group flex items-center gap-6 bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
    >
      {/* IMAGE */}
      <div className="w-40 h-40 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-foreground">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground mt-1">
          {subtitle}
        </p>

        <span className="inline-block mt-4 text-sm font-medium text-primary border-b border-primary">
          Shop Now →
        </span>
      </div>
    </Link>
  );
}
