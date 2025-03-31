"use client";
import React, { useEffect, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Skeleton from "@mui/material/Skeleton";

const NewsAsia = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchAsiaNews = async () => {
      setLoading(true);
      setHasError(false);
      try {
        const response = await fetch("/api/news/asia");
        const data = await response.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching Asia news:", error);
        setHasError(true);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAsiaNews();
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
          <div className="text-red-500 text-center">Failed to load Asia news.</div>
        )}

        {!loading && !hasError && news.length === 0 && (
          <div className="text-gray-600 text-center">No Asia news available.</div>
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
          bgcolor: "#FFFFFF",
          borderRadius: 3,
          color: "#1a1a1a",
          px: 2,
          py: 2,
          position: "relative",
          transition: "0.3s",
          "&:hover": {
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          },
        }}
        elevation={2}
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
              color: "#1a1a1a",
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
            color: "#888",
            transform: "rotate(-45deg)",
          }}
        />
      </Card>
    </motion.a>
  );
});

NewsCard.displayName = "NewsCard";
NewsAsia.displayName = "NewsAsia";

export default NewsAsia;
