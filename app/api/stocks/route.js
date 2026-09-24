import { NextResponse } from "next/server";
const symbols = ["QQQ", "NVDA", "MSFT", "AAPL", "AVGO", "TECL"];
export async function GET() {
  const apiKey = process.env.TWELVE_DATA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key is not configured." },
      { status: 500 }
    );
  }
  try {
    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const url =
          `https://api.twelvedata.com/time_series` +
          `?symbol=${symbol}` +
          `&interval=1day` +
          `&outputsize=100` +
          `&apikey=${apiKey}`;
        const response = await fetch(url, {
          cache: "no-store",
        });
        const data = await response.json();
        if (data.status === "error") {
          throw new Error(`${symbol}: ${data.message}`);
        }
        const values = data.values || [];
        const prices = values
          .map((item) => Number(item.close))
          .filter((price) => Number.isFinite(price));
        if (prices.length === 0) {
          throw new Error(`${symbol}: No price data`);
        }
        const current = prices[0];
        const average = (n) => {
          const slice = prices.slice(0, n);
          if (slice.length < n) {
            return null;
          }
          return (
            slice.reduce((sum, price) => sum + price, 0) /
            slice.length
          );
        };
        return {
          symbol,
          current,
          ma25: average(25),
          ma50: average(50),
          ma99: average(99),
        };
      })
    );
    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message || "Failed to fetch stock data.",
      },
      { status: 500 }
    );
  }
}
