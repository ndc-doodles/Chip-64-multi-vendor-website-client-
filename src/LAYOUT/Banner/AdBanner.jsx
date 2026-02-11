import CollectionBanner from "@/Components/Banner/Banner";

export default function HomeCollections() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CollectionBanner
          title="Mobile Collection"
          subtitle="From ₹9,999"
          image="/images/collections/mobiles.png"
          slug="mobile"
        />

        <CollectionBanner
          title="CCTV Collection"
          subtitle="Secure your space"
          image="/lapCollection.png"
          slug="cctv"
        />
      </div>
    </section>
  );
}
