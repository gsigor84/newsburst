"use client";
import React, { useEffect, useState, useMemo } from "react";
import Avatar from "@mui/material/Avatar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Map symbols to logo URLs
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

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const BitcoinPriceList = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [sortBy, setSortBy] = useState("price_usd");

  useEffect(() => {
    const fetchCryptoData = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const response = await fetch("/api/bitcoin");
        const data = await response.json();
        setCryptoData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("❌ Error fetching Bitcoin prices:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  const sortedData = useMemo(() => {
    return [...cryptoData].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [cryptoData, sortBy]);

  return (
    <div className="min-h-screen  px-2 bg-[#F2F2F2] text-gray-900">
      <div className="max-w-4xl mx-auto">


        {/* Loading / Error States */}
        {isLoading && (
          <div className="text-center text-gray-500">Loading prices...</div>
        )}
        {hasError && (
          <div className="text-center text-red-500">
            Error loading data. Please try again later.
          </div>
        )}
        {!isLoading && !cryptoData.length && !hasError && (
          <div className="text-center text-gray-500">No data available.</div>
        )}

        {/* Token Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {sortedData.map((token) => (
            <a
              key={token.symbol}
              href={`https://coinmarketcap.com/currencies/${token.symbol.toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-lg transition-transform transform hover:scale-105"
            >
              {/* Logo & Symbol */}
              <div className="flex items-center gap-2 mb-2">
                <Avatar
                  src={tokenLogos[token.symbol]}
                  alt={token.symbol}
                  sx={{
                    width: 32,
                    height: 32,
                    fontSize: 14,
                    fontWeight: 500,
                    bgcolor: "#03318C",
                  }}
                />
                <h2 className="text-lg font-semibold text-gray-800">
                  {token.symbol}
                </h2>
              </div>

              {/* Price */}
              <div className="flex items-center text-sm mb-1 text-gray-700">
                <AttachMoneyIcon fontSize="small" className="mr-1 opacity-80" />
                {formatter.format(token.price_usd)}
              </div>

              {/* Change */}
              <div
                className={`flex items-center text-sm ${token.change_24h >= 0
                  ? "text-green-500"
                  : "text-red-500"
                  }`}
                title={`${token.change_24h >= 0 ? "Increased" : "Decreased"
                  } by ${Math.abs(token.change_24h).toFixed(2)}%`}
              >
                {token.change_24h >= 0 ? (
                  <ArrowDropUpIcon fontSize="small" className="mr-1" />
                ) : (
                  <ArrowDropDownIcon fontSize="small" className="mr-1" />
                )}
                {token.change_24h.toFixed(2)}%
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BitcoinPriceList;
