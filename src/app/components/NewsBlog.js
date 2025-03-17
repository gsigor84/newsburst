"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function NewsBlog({ apiEndpoint }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        setNews(Array.isArray(data) ? data : []); // ✅ Ensure it's always an array
      } catch (error) {
        console.error("Error fetching blog news:", error);
        setNews([]); // ✅ Fallback to empty array
      }
    };

    fetchNews();
  }, [apiEndpoint]);

  const refs = useMemo(() => (Array.isArray(news) ? news.map(() => React.createRef()) : []), [news]);

  return (
    <div className="min-h-screen bg-dark-blue text-white p-2">
      <div className="max-w-4xl mx-auto">
        {news.length > 0 ? (
          news.map((article, index) => (
            <HeadlineBlock key={article._id} article={article} ref={refs[index]} />
          ))
        ) : (
          <p className="text-center text-gray-400">No blog news available.</p>
        )}
      </div>
    </div>
  );
}

// ✅ Headline Block Component (NO IMAGE, ONLY TEXT & ARROW)
const HeadlineBlock = React.forwardRef(({ article }, ref) => {
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="p-2 mb-6 flex flex-col"
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
      {/* Arrow (Right) */}
      <div className="flex justify-end items-center">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:scale-110 transition-transform inline-block"
        >
          <ArrowRight size={25} strokeWidth={4} className="-rotate-50" />
        </a>
      </div>

      {/* Line Separator */}
      <div className="w-full h-[1.5px] bg-white mb-1"></div>

      {/* Text Content (Headline & Date) */}
      <motion.h2 className="text-xl sm:text-5xl font-headline font-bold text-white">
        {article.headline}
      </motion.h2>
      <p className="text-gray-400 text-sm mt-2">{article.date}</p>
    </motion.div>
  );
});
