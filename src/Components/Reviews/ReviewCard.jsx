import StarRating from "./StarRating";

export default function ReviewCard({ review }) {
  return (
    <div className="border-b pb-6 space-y-2">
      <div className="flex items-center gap-3 ">
        <img
          src={review.user.avatar || "/avatar.png"}
          className="w-9 h-9 rounded-full bg-primary"
        />
        <div>
          <p className="font-medium">{review.user.name}</p>
          <StarRating value={review.rating} size={14} />
        </div>
      </div>

      {review.comment && (
        <p className="text-sm text-muted-foreground">
          {review.comment}
        </p>
      )}

      {review.isVerifiedPurchase && (
        <span className="text-xs text-primary font-medium">
          ✔ Verified Purchase
        </span>
      )}
    </div>
  );
}
