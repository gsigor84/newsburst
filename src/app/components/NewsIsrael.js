"use client";
import React, { useEffect, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Skeleton from "@mui/material/Skeleton";

const NewsIsrael = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchIsraelNews = async () => {
      setLoading(true);
      setHasError(false);
      try {
        const response = await fetch("/api/news/israel");
        const data = await response.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching Israel news:", error);
        setHasError(true);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIsraelNews();
  }, []);

  const refs = useMemo(() => news.map(() => React.createRef()), [news]);

  return (
    <div className="min-h-screen  pr-4 py-6">
      <div className="max-w-xl mx-auto space-y-6">
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} variant="rounded" width="100%" height={96} />
            ))}
          </div>
        )}

        {hasError && (
          <div className="text-red-500 text-center">Failed to load news.</div>
        )}

        {!loading && !hasError && news.length === 0 && (
          <div className="text-white text-center">No news available.</div>
        )}

        {!loading &&
          !hasError &&
          news.map((article, index) => (
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
      initial={{ opacity: 0.5, scale: 0.95 }}
      animate={{
        opacity: isInView ? 1 : 0.3,
        scale: isInView ? 1 : 0.95,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 14,
        delay: 0.3,
      }}
    >
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#F2F2F2",
          borderRadius: 2,
          color: "#0D0D0D",
          px: 2,
          py: 1.5,
          position: "relative",
          overflow: "hidden",
        }}
        elevation={4}
      >
        <Avatar
          src={isValidImage ? article.image : "/placeholder.jpg"}
          alt={article.headline}
          sx={{
            width: 72,
            height: 72,
            mr: 2,
            border: "2px solid white",
          }}
        />
        <CardContent sx={{ p: 0, flexGrow: 1 }}>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            title={article.headline}
            aria-label={`Read article: ${article.headline}`}
            className="hover:underline"
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ lineHeight: 1.3, color: "#0D0D0D" }}
            >
              {article.headline}
            </Typography>
          </a>
        </CardContent>

        <ArrowForwardIosIcon
          fontSize="small"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
            transform: "rotate(-45deg)",
          }}
        />
      </Card>
    </motion.div>
  );
});

NewsCard.displayName = "NewsCard";
NewsIsrael.displayName = "NewsIsrael";

export default NewsIsrael;
