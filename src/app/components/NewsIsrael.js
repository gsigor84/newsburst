"use client";
import React, { useEffect, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Skeleton from "@mui/material/Skeleton";

const NewsIsrael = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setHasError(false);
      try {
        const response = await fetch("/api/news/israel");
        const data = await response.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching Israel news:", err);
        setHasError(true);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const refs = useMemo(() => news.map(() => React.createRef()), [news]);

  return (
    <div className="min-h-screen pr-4 py-6">
      <div className="max-w-xl mx-auto space-y-5">
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} variant="rounded" width="100%" height={96} />
            ))}
          </div>
        )}

        {hasError && (
          <div className="text-red-500 text-center">Failed to load Israel news.</div>
        )}

        {!loading && !hasError && news.length === 0 && (
          <div className="text-gray-600 text-center">No Israel news available.</div>
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
          display: "flex",
          alignItems: "center",
          bgcolor: "#F2F2F2",
          borderTopLeftRadius: 0,       // Left top: square
          borderBottomLeftRadius: 0,    // Left bottom: square
          borderTopRightRadius: 12,     // Right top: rounded
          borderBottomRightRadius: 0,   // Right bottom: square
          px: 2,
          py: 2,
          position: "relative",
          transition: "0.3s ease-in-out",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)", // ⬅️ Custom shadow
          "&:hover": {
            boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)", // ⬅️ Slightly stronger on hover
          },
        }}
      >

        <Avatar
          src={isValidImage ? article.image : "/placeholder.jpg"}
          alt={article.headline}
          sx={{
            width: 72,
            height: 72,
            mr: 2,
            border: "2px solid #eaeaea",
          }}
        />

        <CardContent sx={{ p: 0, flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              lineHeight: 1.4,
              fontSize: "1rem",
              color: "#0D0D0D",
              pr: 3,
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
            color: "#405F73",
            transform: "rotate(-45deg)",
          }}
        />
      </Card>
    </motion.a >
  );
});

NewsCard.displayName = "NewsCard";
NewsIsrael.displayName = "NewsIsrael";

export default NewsIsrael;
