"use client";
import React, { useEffect, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function NewsIsrael() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchIsraelNews = async () => {
      try {
        const response = await fetch("/api/news/israel");
        const data = await response.json();
        setNews(Array.isArray(data) ? data : []); // ✅ Ensure `news` is always an array
      } catch (error) {
        console.error("Error fetching Israel news:", error);
        setNews([]); // ✅ Fallback to empty array in case of error
      }
    };

    fetchIsraelNews();
  }, []);

  // ✅ Ensure refs are correctly created
  const refs = useMemo(() => (Array.isArray(news) ? news.map(() => React.createRef()) : []), [news]);

  return (
    <div className="min-h-screen bg-dark-blue text-white">
      <div className="max-w-4xl mx-auto">
        {news.length > 0 ? (
          news.map((article, index) => (
            <HeadlineBlock key={article._id} article={article} ref={refs[index]} />
          ))
        ) : (
          <p className="text-center text-gray-400">No Israel news available.</p> // ✅ Display if no articles exist
        )}
      </div>
    </div>
  );
}

// ✅ Reusable Headline Block Component
const HeadlineBlock = React.forwardRef(({ article }, ref) => {
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="p-4 mb-6 flex flex-col"
      initial={{ opacity: 0.5, scale: 0.8 }}
      animate={{
        opacity: isInView ? 1 : 0.2,
        scale: isInView ? 1 : 0.8,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 14,
        delay: 0.4,
      }}
    >
      {/* Image & Arrow Container */}
      <div className="flex justify-between items-center">
        {/* Image (Left) */}
        {article.image && article.image.startsWith("http") ? (
          <div className="w-[60px] h-[50px]">
            <Image
              src={article.image}
              alt={article.headline}
              width={50}
              height={50}
              className="object-cover shadow-lg w-full h-full"
              priority
            />
          </div>
        ) : (
          <div className="w-[60px] h-[50px]"></div> // ✅ Empty div for spacing when no image
        )}

        {/* Arrow (Right) */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:scale-110 transition-transform inline-block"
        >
          <ArrowRight size={60} strokeWidth={4} className="-rotate-50" />
        </a>
      </div>

      {/* Line Separator */}
      <div className="w-full h-[1.5px] bg-white mb-6"></div>

      {/* Text Content */}
      <motion.h2 className="text-4xl sm:text-5xl font-headline font-bold text-white">
        {article.headline}
      </motion.h2>
    </motion.div>
  );
});
