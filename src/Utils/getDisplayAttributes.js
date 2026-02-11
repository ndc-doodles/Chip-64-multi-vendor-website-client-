export const getDisplayAttributes = (category, attributes) => {
  const map = {
    mobile: ["Storage", "RAM"],
    phone: ["Storage", "RAM"],
    laptop: ["RAM", "Storage", "Processor"],
    chair: ["Material", "Color"],
  };

  const keys = map[category?.toLowerCase()] || Object.keys(attributes).slice(0, 2);

  return keys
    .filter((key) => attributes[key])
    .map((key) => `${attributes[key]}`);
};
