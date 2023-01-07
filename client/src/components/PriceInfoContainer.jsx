import React from "react";

const PriceInfoContainer = ({ data }) => {
  return (
    <>
      <section className="price-info">
        {data ? (
          <>
            <h2>Stock Information</h2>
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
    </>
  );
};

export default PriceInfoContainer;
