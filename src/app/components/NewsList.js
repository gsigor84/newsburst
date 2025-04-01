"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Skeleton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const NewsCardExample = ({ apiEndpoint }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setHasError(false);
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setHasError(true);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [apiEndpoint]);

  const refs = useMemo(() => news.map(() => React.createRef()), [news]);

  return (
    <div className="min-h-screen pr-4 py-6">
      <div className="max-w-xl mx-auto space-y-5">
        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} variant="rounded" width="100%" height={96} />
            ))}
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="text-red-500 text-center">Failed to load news.</div>
        )}

        {/* Empty State */}
        {!loading && !hasError && news.length === 0 && (
          <div className="text-gray-600 text-center">No news available.</div>
        )}

        {/* News Cards */}
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
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
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
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          position: "relative",
          bgcolor: "#FFFFFF",
          borderRadius: 3,
          px: 2,
          py: 2,
          overflow: "hidden",
          display: "flex", // ✅ Add this line
          alignItems: "center",
          transition: "0.3s",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            opacity: 0.03,
            zIndex: 0,
          },
        }}
      >

        <Avatar
          src={isValidImage ? article.image : "/placeholder.jpg"}
          alt={article.headline}
          sx={{
            width: 64,
            height: 64,
            mr: 2,
            border: "2px solid #eaeaea",
          }}
        />

        <CardContent sx={{ p: 0, flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              fontSize: "1rem",
              color: "#1a1a1a",
              pr: 4,
              lineHeight: 1.4,
            }}
          >
            {article.headline}
          </Typography>
        </CardContent>

        <ArrowForwardIosIcon
          fontSize="small"
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "#999",
            transform: "rotate(-45deg)",
          }}
        />
      </Card>
    </motion.a>
  );
});

NewsCard.displayName = "NewsCard";
NewsCardExample.displayName = "NewsCardExample";

export default NewsCardExample;
