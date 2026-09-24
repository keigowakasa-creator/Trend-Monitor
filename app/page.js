"use client";
import { useState } from "react";
const stocks = [
  { symbol: "QQQ", name: "NASDAQ ETF" },
  { symbol: "NVDA", name: "NVIDIA" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "AAPL", name: "Apple" },
  { symbol: "AVGO", name: "Broadcom" },
  { symbol: "TECL", name: "Direxion 3x Tech ETF" },
];
export default function Home() {
  const [selected, setSelected] = useState("QQQ");
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ marginBottom: "8px" }}>
          TREND MONITOR
        </h1>
        <p style={{ color: "#666", marginBottom: "24px" }}>
          レバレッジETF運用モニター
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "10px",
            marginBottom: "24px",
          }}
        >
          {stocks.map((stock) => (
            <button
              key={stock.symbol}
              onClick={() => setSelected(stock.symbol)}
              style={{
                padding: "14px 10px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                background:
                  selected === stock.symbol
                    ? "#222"
                    : "#fff",
                color:
                  selected === stock.symbol
                    ? "#fff"
                    : "#222",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {stock.symbol}
            </button>
          ))}
        </div>
        <section
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h2>{selected}</h2>
          <p style={{ color: "#666" }}>
            {stocks.find((s) => s.symbol === selected)?.name}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <Metric label="現在値" value="---" />
            <Metric label="MA25" value="---" />
            <Metric label="MA50" value="---" />
            <Metric label="MA99" value="---" />
          </div>
          <div
            style={{
              marginTop: "24px",
              padding: "20px",
              borderRadius: "12px",
              background: "#f7f7f7",
            }}
          >
            <h3>トレンド判定</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              データ取得待ち
            </p>
          </div>
        </section>
        <p
          style={{
            marginTop: "24px",
            fontSize: "13px",
            color: "#777",
          }}
        >
          ※現在は画面確認用です。次の段階で株価データと移動平均を接続します。
        </p>
      </div>
    </main>
  );
}
function Metric({ label, value }) {
  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <div style={{ fontSize: "13px", color: "#777" }}>
        {label}
      </div>
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "6px",
        }}
      >
        {value}
      </div>
    </div>
  );
}
