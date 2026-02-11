"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Star, MessageSquare, ThumbsUp, Filter, SortDesc } from "lucide-react";
import ReviewSummary from "@/Components/Reviews/ReviewSummary";
import ReviewCard from "@/Components/Reviews/ReviewCard";
import WriteReview from "@/Components/Reviews/WriteReview";
import { getProductReviewsApi } from "@/API/userAPI";
import { Button } from "@/components/ui/button";

export default function ProductReviews({ product }) {
  const { user } = useSelector((s) => s.user);
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    const res = await getProductReviewsApi(product._id);
    setReviews(res);
  };

  useEffect(() => {
    loadReviews();
  }, [product._id]);

  return (
    <section className="mt-3  pt-16 font-jakarta">
      {/* HEADER: Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Customer Feedback
          </h2>
          <p className="text-gray-400 text-sm mt-2 font-medium">
            Real insights from the CHIP community.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-gray-200 text-[11px] font-black uppercase tracking-widest h-10">
            <Filter className="mr-2 w-3 h-3" /> Filter
          </Button>
          <Button variant="outline" className="rounded-xl border-gray-200 text-[11px] font-black uppercase tracking-widest h-10">
            <SortDesc className="mr-2 w-3 h-3" /> Recent
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-16">
        {/* LEFT: Summary & Write Review (Sticky) */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="bg-gray-50/50 p-8 rounded-[32px] border border-gray-100">
              <ReviewSummary
                average={product.averageRating}
                count={product.reviewCount}
              />
            </div>

            {user ? (
              <div className="bg-white p-2 rounded-[32px] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                <WriteReview
                  productId={product._id}
                  onSuccess={loadReviews}
                />
              </div>
            ) : (
              <div className="p-8 rounded-[32px] bg-[#39b02c]/5 border border-[#39b02c]/10 text-center">
                <MessageSquare className="mx-auto text-primary mb-3" size={24} />
                <p className="text-xs font-black text-gray-900 uppercase tracking-widest mb-2">Have this product?</p>
                <p className="text-[11px] text-gray-500 font-medium mb-4">Log in to share your thoughts with others.</p>
                <Button className="w-full bg-primary hover:bg-[#2e8f24] rounded-xl text-[10px] font-black uppercase tracking-widest">
                  Sign In to Review
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Review List */}
        <div className="lg:col-span-8">
          {reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50/30 rounded-[40px] border border-dashed border-gray-200">
              <Star className="text-gray-200 mb-4" size={48} strokeWidth={1} />
              <p className="text-gray-400 font-bold text-sm tracking-tight">
                Be the first to leave a mark.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((r) => (
                <div key={r._id} className="group relative">
                  <ReviewCard review={r} />
                  {/* Modern Touch: Add a 'Helpful' interaction if your backend supports it later */}
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-[#39b02c]">
                      <ThumbsUp size={14} /> Helpful?
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Pagination Placeholder */}
              {reviews.length > 5 && (
                <div className="pt-10 text-center">
                  <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-primary">
                    Load More Insights
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}