import NewsList from "./components/NewsList";
import NewsAsia from "./components/NewsAsia";
import NewsIsrael from "./components/NewsIsrael";
import NewsBlog from "./components/NewsBlog";


export default function Home() {
  return (
    <div className="bg-dark-blue text-white min-h-screen p-2">
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
        <h2 className="text-xl font-bold text-white text-center mb-6">Israel </h2>
        <NewsIsrael />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white text-center mb-6">Blogs </h2>
        <NewsBlog apiEndpoint="/api/news/blog" />
      </section>
    </div>
  );
}
