"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Chip, Typography } from "@mui/material";

const tokenLogos = {
  BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  DOGE: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
  SOL: "https://cryptologos.cc/logos/solana-sol-logo.png",
  AVAX: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
  BNB: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
  ADA: "https://cryptologos.cc/logos/cardano-ada-logo.png",
  XRP: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
  LINK: "https://cryptologos.cc/logos/chainlink-link-logo.png",
  ARB: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
};

// Format: 31 Mar 2025
const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const TradingRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch("/api/recommendations");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setRecommendations(data);
          setLastUpdated(new Date(data[0].timestamp));
        }
      } catch (err) {
        console.error("Error loading trading recommendations:", err);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <section className="mb-12 px-2">
      {lastUpdated && (
        <div className="text-xs text-gray-500 text-right mb-3 pr-4 font-medium">
          updated: {formatDate(lastUpdated)}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {recommendations.map((token) => (
          <div
            key={token.token}
            className="bg-[#F2F2F2] border border-gray-200 p-4 shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition-transform transform hover:scale-[1.03]"
            style={{ borderRadius: 0 }} // Square corners
          >
            <div className="flex items-center gap-2 mb-2">
              <Avatar
                src={tokenLogos[token.token]}
                alt={token.token}
                sx={{ width: 36, height: 36 }}
              />
              <h3 className="text-lg font-semibold text-gray-900">
                {token.token}
              </h3>
            </div>

            <div className="text-sm text-gray-700 mb-2 leading-tight">
              <strong>Hype:</strong> {token.hype} &nbsp;|&nbsp;
              <strong>Fear:</strong> {token.fear}
            </div>

            <Chip
              label={token.recommendation}
              color={token.recommendation === "BUY" ? "success" : "error"}
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: "0.8rem",
                textTransform: "uppercase",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TradingRecommendations;
