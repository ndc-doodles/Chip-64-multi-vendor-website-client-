export const isProductWishlisted = (wishlist, productId) => {
  return wishlist.some(
    (w) => String(w.productId) === String(productId)
  );
};

// ❤️ variant-level check (EXACT variant)
export const isVariantWishlisted = (wishlist, productId, variantId) => {
  return wishlist.some(
    (w) =>
      String(w.productId) === String(productId) &&
      String(w.variantId) === String(variantId)
  );
};