"use client";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

const NewsCardExample = ({ apiEndpoint }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setNews([]);
      }
    };

    fetchNews();
  }, [apiEndpoint]);

  const refs = useMemo(() => news.map(() => React.createRef()), [news]);

  return (
    <div className="min-h-screen bg-dark-blue pr-4">
      <div className="max-w-xl mx-auto space-y-6">
        {news.map((article, index) => (
          <NewsCard key={article._id} article={article} ref={refs[index]} />
        ))}
      </div>
    </div>
  );
};

const NewsCard = React.forwardRef(({ article }, ref) => {
  const isValidImage = article.image && article.image.startsWith("http");
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <motion.div
      ref={ref}
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
      className="not-prose overflow-hidden rounded-lg"
    >
      {/* Line and Arrow container */}
      <div className="relative max-w-sm mx-auto mb-2">
        {/* Arrow */}
        <div className="absolute -top-1 right-0 z-10">
          <ArrowRight size={30} strokeWidth={3} className="-rotate-45 text-white" />
        </div>

        {/* White Line */}
        <div className="w-full h-[1px] bg-white" />
      </div>

      {/* Card Content */}
      <div className="relative mx-auto flex max-w-sm items-center ring-1 ring-black/5 min-h-[96px]">
        {/* Floating Image */}
        <Image
          src={isValidImage ? article.image : "/placeholder.jpg"}
          alt={article.headline}
          width={96}
          height={96}
          className="absolute -left-9 h-24 w-24 rounded-full shadow-lg object-cover"
          priority
        />

        {/* Headline Text */}
        <div className="flex flex-col pl-20 pr-4">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <strong className="text-lg sm:text-lg font-headline font-bold text-white leading-snug">
              {article.headline}
            </strong>
          </a>
        </div>
      </div>
    </motion.div>
  );
});

NewsCard.displayName = "NewsCard";
NewsCardExample.displayName = "NewsCardExample";

export default NewsCardExample;
