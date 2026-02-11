"use client";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductDetail from "@/Layout/Products/ProductDetails";
import { getUserProductBySlugApi } from "@/API/userAPI";
import HeaderLayout from "@/Layout/Header/HeaderLayout";
export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const res = await getUserProductBySlugApi(slug);

        if (!res?.success) {
          toast.error("Product not found");
          return;
        }
        setProduct(res.product);


      } catch (error) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);
 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        Product not found
      </div>
    );
  }

  return (
  <ProductDetail product={product} />

  );
}
