import { useState } from "react";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createReviewApi } from "@/API/userAPI";

export default function WriteReview({ productId, onSuccess }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!rating) {
      toast.error("Please select rating");
      return;
    }

    try {
      setLoading(true);
      await createReviewApi({ productId, rating, comment });
      toast.success("Review submitted");
      setRating(0);
      setComment("");
      onSuccess?.();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 rounded-xl p-5 ">
      <h4 className="font-semibold">Write a review</h4>

      <StarRating
        value={rating}
        interactive
        onChange={setRating}
      />

      <textarea
        rows={3}
        placeholder="Share your experience…"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full rounded-lg border bg-background p-3 text-sm"
      />

      <Button onClick={submit} disabled={loading} className="bg-primary text-black">
        Submit Review
      </Button>
    </div>
  );
}
