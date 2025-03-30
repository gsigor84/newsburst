import NewsList from "./components/NewsList";
import NewsAsia from "./components/NewsAsia";
import NewsIsrael from "./components/NewsIsrael";
import NewsBlog from "./components/NewsBlog";
import BitcoinPriceList from "./components/bitcoin/BitcoinPriceList";

export default function Home() {
  return (
    <div className="bg-dark-blue text-white min-h-screen">
      {/* General News Section */}
      <section className="mb-10">
        <NewsList apiEndpoint="/api/news" />
      </section>

      {/* Asia News Section */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white text-center mb-6">Asia</h2>
        <NewsAsia />
      </section>

      {/* Israel News Section */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white text-center mb-6">Israel</h2>
        <NewsIsrael />
      </section>
      {/* Bitcoin Prices Section */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white text-center mb-6">Bitcoin Prices</h2>
        <BitcoinPriceList />
      </section>
    </div>
  );
}
