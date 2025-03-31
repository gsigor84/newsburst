import NewsList from "./components/NewsList";
import NewsAsia from "./components/NewsAsia";
import NewsIsrael from "./components/NewsIsrael";
import BitcoinPriceList from "./components/bitcoin/BitcoinPriceList";

export default function Home() {
  return (
    <div className="bg-[#F2F2F2] text-gray-900 min-h-screen">
      {/* General News Section */}
      <section className="mb-6">
        <NewsList apiEndpoint="/api/news" />
      </section>

      {/* Asia News Section */}
      <section className="mb-6 ">
        <h2 className="text-2xl font-headline font-bold text-center mb-6">Asia</h2>
        <NewsAsia />
      </section>

      {/* Israel News Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-headline font-bold text-center mb-6">Israel</h2>
        <NewsIsrael />
      </section>

      {/* Bitcoin Prices Section */}
      <section className="mb-6">

        <BitcoinPriceList />
      </section>
    </div>
  );
}
