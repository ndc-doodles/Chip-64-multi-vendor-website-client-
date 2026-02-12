export const promoConfig = {
  pc: {
    image: "/pc1.png",
    titleBg: "Top\nPCs",
    tag: "Power Machines",
    heading: "PC Mega Sale",
    description: "High-performance PCs for work and gaming.",
    rotate:5,

  },

  mobile: {
    image: "/phone.png",
    titleBg: "Top\nMobiles",
    tag: "Discover Innovation",
    heading: "Smart Devices Sale",
  rotate:-12,
    description: "Premium mobiles designed for modern life.",
  },

  laptop: {
    image: "/pcimg4.png",
    titleBg: "Top\nLaptops",
     rotate:2,
    tag: "Power Meets Style",
    heading: "Laptop Deals",
    description: "Premium laptops for productivity and creativity.",
  },
  cctv: {
  image: "/cctvs.png",   // put your image in public folder
  titleBg: "Top\nCCTV",
  tag: "Smart Security",
  heading: "CCTV Sale",
  description: "Advanced surveillance systems to protect your home & business.",
  rotate: 5,
},
cpu: {
  image: "/cpuu1.png",   // put cpu image inside public folder
  titleBg: "Top\nCPU",
  tag: "High Performance",
  heading: "CPU Mega Sale",
  description: "Powerful processors & desktop PCs built for gaming, work, and heavy tasks.",
  rotate: -3,
},



  // optional fallback
  default: {
    image: "/default.png",
    titleBg: "Top\nDeals",
    tag: "Limited Time",
     rotate:-12,
    heading: "Exclusive Offers",
    description: "Discover premium products and best deals.",
  },
};
