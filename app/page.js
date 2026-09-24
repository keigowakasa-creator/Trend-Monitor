"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/stocks");

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "データ取得に失敗しました");
      }

      setStocks(result.data || []);
      setUpdatedAt(result.updatedAt || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getTrend = (stock) => {
    const { current, ma25, ma50, ma99 } = stock;

    if (
      current > ma25 &&
      ma25 > ma50 &&
      ma50 > ma99
    ) {
      return "上昇";
    }

    if (
      current < ma25 &&
      ma25 < ma50 &&
      ma50 < ma99
    ) {
      return "下降";
    }

    return "中立";
  };

  const formatPrice = (price) => {
    if (price == null) return "---";
    return price.toFixed(2);
  };

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>TREND MONITOR</h1>

      <p>レバレッジETF運用モニター</p>

      <button
        onClick={loadData}
        disabled={loading}
        style={{
          padding: "10px 18px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {loading ? "取得中..." : "データ更新"}
      </button>

      {error && (
        <div
          style={{
            padding: "15px",
            marginBottom: "20px",
            border: "1px solid #ccc",
          }}
        >
          エラー：{error}
        </div>
      )}

      {updatedAt && (
        <p>
          最終更新：{new Date(updatedAt).toLocaleString("ja-JP")}
        </p>
      )}

      <div
        style={{
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>銘柄</th>
              <th>現在値</th>
              <th>MA25</th>
              <th>MA50</th>
              <th>MA99</th>
              <th>判定</th>
            </tr>
          </thead>

          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.symbol}>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {stock.symbol}
                </td>

                <td style={{ padding: "12px", textAlign: "center" }}>
                  {formatPrice(stock.current)}
                </td>

                <td style={{ padding: "12px", textAlign: "center" }}>
                  {formatPrice(stock.ma25)}
                </td>

                <td style={{ padding: "12px", textAlign: "center" }}>
                  {formatPrice(stock.ma50)}
                </td>

                <td style={{ padding: "12px", textAlign: "center" }}>
                  {formatPrice(stock.ma99)}
                </td>

                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {getTrend(stock)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: "30px", fontSize: "14px" }}>
        判定ルール：現在値・MA25・MA50・MA99の並びからトレンドを判定
      </p>
    </main>
  );
}
