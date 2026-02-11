import StarRating from "./StarRating";

export default function ReviewSummary({ average, count }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-5xl font-bold">{average ?.toFixed(1)}</div>

      <div>
        <StarRating value={Math.round(average)} />
        <p className="text-sm text-muted-foreground">
          Based on {count} reviews
        </p>
      </div>
    </div>
  );
}
