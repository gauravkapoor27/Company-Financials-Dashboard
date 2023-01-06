import "./assets/css/App.css";
import { useRef, useState, useLayoutEffect } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import Select from "react-select";

function App() {
  const [data, setData] = useState(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const shortDescription = useRef(null);
  const [ticker, setTicker] = useState("AAPL");

  const chartContainerRef = useRef();
  const priceSeries = useRef();

  useLayoutEffect(() => {
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    };

    const chartOptions = {
      layout: {
        textColor: "white",
        background: { type: "solid", color: "rgb(0,2,27)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0)",
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0)",
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
        borderVisible: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        style: 0,
        vertLine: {
          width: 1,
          color: "rgba(224, 227, 235, 0.1)",
          style: 0,
        },
        horzLine: {
          width: 1,
          color: "rgba(224, 227, 235, 0.1)",
          style: 0,
        },
      },
      leftPriceScale: {
        visible: false,
      },
      rightPriceScale: {
        visible: true,
        borderVisible: true,
      },
    };

    const lineOptions = {
      color: "rgb(50, 122, 155)",
      lineWidth: 2,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 2,
      lastPriceAnimation: 1,
      priceLineVisible: false,
    };

    const chart = createChart(chartContainerRef.current, chartOptions);
    chart.resize(
      chartContainerRef.current.clientWidth,
      chartContainerRef.current.clientHeight
    );
    priceSeries.current = chart.addLineSeries(lineOptions);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, []);

  useLayoutEffect(() => {
    fetchData(ticker);
    fetchHistoricalData(ticker);
  }, [ticker, data]);

  const fetchData = (ticker) => {
    fetch(`http://localhost:5555/${ticker}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        shortDescription.current = `${data.longBusinessSummary
          .split(" ")
          .slice(0, 27)
          .join(" ")} ...`;
      });
  };

  const fetchHistoricalData = (ticker) => {
    fetch(`http://localhost:5555/historical/${ticker}`)
      .then((res) => res.json())
      .then((data) => {
        const next = data.map((item) => {
          return { value: item[1], time: item[0] };
        });
        priceSeries.current.setData(next);
      });
  };

  return (
    <>
      <header>
        {data ? (
          <>
            <Select
              styles={{
                container: (provided) => ({
                  ...provided,
                  position: "absolute",
                  top: "50px",
                  right: "50px",
                  width: "400px",
                  height: "10px",
                  fontSize: "0.8rem",
                  color: "black",
                }),
                menu: (provided) => ({
                  ...provided,
                  top: "35px",
                }),
              }}
              className="ticker-select"
              type="text"
              value={{ label: "Search for ticker...", value: 0 }}
              options={[
                { value: "AAPL", label: "Apple" },
                { value: "MSFT", label: "Microsoft" },
                { value: "AMZN", label: "Amazon" },
                { value: "GOOG", label: "Google" },
              ]}
              onChange={(e) => {
                setTicker(e.value);
              }}
            />
            <div className="main-title">
              <img
                src={data.logo_url}
                alt=""
                className="ticker-logo"
                style={{
                  width: "40px",
                  borderRadius: "50%",
                  border: "none",
                }}
              />
              <h1 className="ticker-heading">
                {data.shortName} ({data.symbol}) |{" "}
                {data.regularMarketPrice > data.regularMarketPreviousClose ? (
                  <span style={{ color: "green" }}>
                    ${data.regularMarketPrice}
                  </span>
                ) : (
                  <span style={{ color: "red" }}>
                    ${data.regularMarketPrice}
                  </span>
                )}
              </h1>
            </div>
          </>
        ) : (
          <h1 className="ticker-loading-message">Loading Symbol...</h1>
        )}
      </header>
      <section className="description-container">
        {data ? (
          <>
            <h3 className="ticker-sector">
              {data.sector} | {data.industry}
            </h3>
            <h3>
              <a
                className="ticker-website"
                href={data.website}>
                {data.website}
              </a>
            </h3>
            <p className="description-text">
              {descriptionExpanded
                ? data.longBusinessSummary
                : shortDescription.current}
            </p>
          </>
        ) : (
          "Loading Description..."
        )}
        {data && (
          <button
            className="description-button"
            onClick={() => {
              setDescriptionExpanded(!descriptionExpanded);
            }}>
            {descriptionExpanded
              ? "Hide Full Description"
              : "Read Full Description"}
          </button>
        )}
      </section>
      <main className="main-contents">
        <div
          ref={chartContainerRef}
          className="chart-container"></div>
        <section className="price-info">
          {data ? (
            <>
              <h2>Price Information</h2>
              <div className="price-info-item">
                <h3>Market Cap</h3>
                <p>${data.marketCap.toLocaleString()}</p>
              </div>
              <div className="price-info-item">
                <h3>Volume</h3>
                <p>{data.volume.toLocaleString()}</p>
              </div>
              <div className="price-info-item">
                <h3>Beta</h3>
                <p>{data.beta ? data.beta : "N/A"}</p>
              </div>
              <div className="price-info-item">
                <h3>Target High Price</h3>
                <p>${data.targetHighPrice}</p>
              </div>
              <div className="price-info-item">
                <h3>Target Low Price</h3>
                <p>${data.targetLowPrice}</p>
              </div>
              <div className="price-info-item">
                <h3>52-Week Change</h3>
                <p>{data["52WeekChange"]}%</p>
              </div>
              <div className="price-info-item">
                <h3>52-Week High</h3>
                <p>${data.fiftyTwoWeekHigh}</p>
              </div>
              <div className="price-info-item">
                <h3>52-Week High</h3>
                <p>${data.fiftyTwoWeekLow}</p>
              </div>
              <div className="price-info-item">
                <h3>50-Day Average</h3>
                <p>${data.fiftyDayAverage}</p>
              </div>
              <div className="price-info-item">
                <h3>200-Day Average</h3>
                <p>${data.twoHundredDayAverage}</p>
              </div>
              <div className="price-info-item">
                <h3>Dividend Rate</h3>
                <p>{data.dividendRate}%</p>
              </div>
              <div className="price-info-item">
                <h3>Ex-Dividend Date</h3>
                <p>{new Date(data.exDividendDate * 1000).toDateString()}</p>
              </div>
              <div className="price-info-item">
                <h3>Last Dividend Value</h3>
                <p>${data.lastDividendValue}</p>
              </div>
              <div className="price-info-item">
                <h3>5-Year Ave. Dividend Yield</h3>
                <p>{data.fiveYearAvgDividendYield}%</p>
              </div>
            </>
          ) : (
            "Loading Price Information..."
          )}
        </section>
        <section className="financial-info">
          {data ? (
            <>
              <h2>Financial Information</h2>
              <div className="financial-info-item">
                <h3>Total Revenue</h3>
                <p>${data.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="financial-info-item">
                <h3>Revenue Growth</h3>
                <p>{data.revenueGrowth}%</p>
              </div>
              <div className="financial-info-item">
                <h3>Net Income</h3>
                <p>${data.netIncomeToCommon.toLocaleString()}</p>
              </div>
              <div className="financial-info-item">
                <h3>Return on Equity</h3>
                <p>{data.returnOnEquity}%</p>
              </div>
              <div className="financial-info-item">
                <h3>Return on Assets</h3>
                <p>{data.returnOnAssets}%</p>
              </div>
              <div className="financial-info-item">
                <h3>Debt-to-Equity Ratio</h3>
                <p>{data.debtToEquity}</p>
              </div>
              <div className="financial-info-item">
                <h3>Total Debt</h3>
                <p>${data.totalDebt.toLocaleString()}</p>
              </div>
              <div className="financial-info-item">
                <h3>Operating Cash Flow</h3>
                <p>${data.operatingCashflow.toLocaleString()}</p>
              </div>
              <div className="financial-info-item">
                <h3>Free Cash Flow</h3>
                <p>${data.freeCashflow.toLocaleString()}</p>
              </div>
              <div className="financial-info-item">
                <h3>Price-to-Earnings Ratio</h3>
                <p>{data.trailingPE}</p>
              </div>
              <div className="financial-info-item">
                <h3>Earning per Share</h3>
                <p>{data.trailingEps}</p>
              </div>
              <div className="financial-info-item">
                <h3>Shares Outstanding</h3>
                <p>{data.sharesOutstanding.toLocaleString()}</p>
              </div>
              <div className="financial-info-item">
                <h3>Float</h3>
                <p>{data.floatShares.toLocaleString()}</p>
              </div>
              <div className="financial-info-item">
                <h3>Full-Time Employees</h3>
                <p>{data.fullTimeEmployees.toLocaleString()}</p>
              </div>
            </>
          ) : (
            "Loading Financials..."
          )}
        </section>
      </main>
    </>
  );
}

export default App;

