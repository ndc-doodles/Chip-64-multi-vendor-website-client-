export const getCategoryFilters = (category) => {
  const map = {
    mobile: ["RAM", "Storage", "Color"],
    phone: ["RAM", "Storage", "Color"],
    laptop: ["RAM", "Storage", "Processor", "Color"],
    chair: ["Material", "Color"],
    cctv: ["Resolution", "Lens"],
  };

  return map[category?.toLowerCase()] || [];
};
