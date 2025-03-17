"use client";
import React, { useEffect, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const NewsList = ({ apiEndpoint }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        setNews(Array.isArray(data) ? data : []); // ✅ Ensure news is always an array
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]); // ✅ Fallback to empty array in case of error
      }
    };

    fetchNews();
  }, [apiEndpoint]);

  // ✅ Ensure refs persist correctly using `useMemo()`
  const refs = useMemo(() => news.map(() => ({ current: null })), [news]);

  return (
    <div className="min-h-screen bg-dark-blue text-white p-4">
      <div className="max-w-4xl mx-auto">
        {news.length > 0 ? (
          news.map((article, index) => (
            <HeadlineBlock key={article._id} article={article} ref={refs[index]} />
          ))
        ) : (
          <p className="text-center text-gray-400 text-lg">No news available.</p>
        )}
      </div>
    </div>
  );
};

// ✅ Reusable Headline Block Component
const HeadlineBlock = React.forwardRef(({ article }, ref) => {
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="p-3 mb-6 flex flex-col border-l-4 border-blue-500"
      initial={{ opacity: 0.5, scale: 0.9 }}
      animate={{
        opacity: isInView ? 1 : 0.3,
        scale: isInView ? 1 : 0.9,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 14,
        delay: 0.3,
      }}
    >
      {/* Image & Arrow Container */}
      <div className="flex justify-between items-center">
        {/* Image (Left) */}
        {article.image && article.image.startsWith("http") ? (
          <div className="w-[80px] h-[60px]">
            <Image
              src={article.image}
              alt={article.headline}
              width={80}
              height={60}
              className="object-cover shadow-lg w-full h-full rounded"
              priority
            />
          </div>
        ) : (
          <div className="w-[80px] h-[60px]"></div> // ✅ Empty div for spacing when no image
        )}

        {/* Arrow (Right) */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:scale-110 transition-transform inline-block"
        >
          <ArrowRight size={30} strokeWidth={3} className="-rotate-45" />
        </a>
      </div>

      {/* Line Separator */}
      <div className="w-full h-[1px] bg-white my-2"></div>

      {/* Text Content */}
      <motion.h2 className="text-2xl sm:text-3xl font-headline font-bold text-white leading-snug">
        {article.headline}
      </motion.h2>
    </motion.div>
  );
});

// ✅ Assign display names to prevent React warnings
HeadlineBlock.displayName = "HeadlineBlock";
NewsList.displayName = "NewsList";

export default NewsList;
