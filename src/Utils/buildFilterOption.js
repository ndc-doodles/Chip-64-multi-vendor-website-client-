const normalize = (value) => {
  if (!value) return value;

  return value
    .toString()
    .trim()
    .toUpperCase()
    .replace(/\s+/g, ""); // remove spaces
};

export const buildFilterOptions = (products, keys) => {
  const result = {};

  keys.forEach((key) => {
    result[key] = new Set();
  });

  products.forEach((product) => {
    product.variants?.forEach((variant) => {
      keys.forEach((key) => {
        const raw = variant.attributes?.[key];
        if (!raw) return;

        const cleaned = normalize(raw);

        result[key].add(cleaned);
      });
    });
  });

  return Object.fromEntries(
    Object.entries(result).map(([k, v]) => [k, [...v]])
  );
};
