import ProductCardFeatured from "@/Components/Cards/ProductFeaturedCard";

export default function FeaturedProducts() {
  const products = [
    { id: 1, name: "Classic Leather Tote", price: "$450", image: "/bagProduct.png" },
    { id: 2, name: "Oxford Loafers", price: "$380", image: "/shoesProduct.png" },
    { id: 3, name: "Heritage Belt", price: "$220", image: "/beltProduct.png" },
    { id: 4, name: "Travel Duffle", price: "$650", image: "/accessories.png" },
       { id: 5, name: "Classic Leather Tote", price: "$450", image: "/bagProduct.png" },
    { id: 6, name: "Oxford Loafers", price: "$380", image: "/shoesProduct.png" },
    { id: 7, name: "Heritage Belt", price: "$220", image: "/beltProduct.png" },
    { id: 8, name: "Travel Duffle", price: "$650", image: "/accessories.png" },
  ];

  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-6 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-foreground mb-2">
            Featured Products
          </h2>
          <div className="h-0.5 w-12 bg-linear-to-r from-transparent via-accent to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCardFeatured
              key={product.id}
              {...product}
              onAddToCart={(id) => console.log("Adding to cart:", id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
