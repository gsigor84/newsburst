"use client";

import React, { useEffect, useState } from "react";
import NewsList from "./components/NewsList";
import NewsAsia from "./components/NewsAsia";
import NewsIsrael from "./components/NewsIsrael";
import BitcoinPriceList from "./components/bitcoin/BitcoinPriceList";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import TradingRecommendations from "./components/trading/TradingRecommendations";

export default function Home() {
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setFeatured(Array.isArray(data) && data.length > 0 ? data[0] : null);
      } catch (err) {
        console.error("Failed to fetch featured story", err);
      }
    };

    fetchFeatured();
  }, []);

  const chipStyles = {
    fontSize: "1rem",
    fontFamily: "var(--font-headline)",
    fontWeight: "bold",
    bgcolor: "#405F73",
    color: "#F2EFDF",
    px: 2,
    borderRadius: 1,
    height: "32px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // ✅ Uniform soft shadow
  };

  return (
    <div className="bg-[#F2F2F2] text-gray-900 min-h-screen">

      {/* General News Section */}
      <section className="mb-6">
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 4, pt: 2 }}>
          <Chip label="Global" color="default" variant="filled" sx={chipStyles} />
        </Box>
        <NewsList apiEndpoint="/api/news" />
      </section>

      {/* Asia News Section */}
      <section>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 4, pt: 2 }}>
          <Chip label="Asia" color="default" variant="filled" sx={chipStyles} />
        </Box>
        <NewsAsia />
      </section>

      {/* Israel News Section */}
      <section className="mb-3">
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 4, pt: 2 }}>
          <Chip label="Israel" color="default" variant="filled" sx={chipStyles} />
        </Box>
        <NewsIsrael />
      </section>

      {/* Bitcoin Prices Section */}
      <section className="mb-6">
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 4, pt: 2 }}>
          <Chip label="Bitcoin Prices" color="default" variant="filled" sx={chipStyles} />
        </Box>
        <BitcoinPriceList />
      </section>

      {/* Recommendations Section */}
      <section className="mb-6">
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 4, pt: 2 }}>
          <Chip label="Recommendations" color="default" variant="filled" sx={chipStyles} />
        </Box>
        <TradingRecommendations />
      </section>
    </div>
  );
}
