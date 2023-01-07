import React from "react";

const FinancialInfoContainer = ({ data }) => {
  return (
    <>
      <section className="financial-info">
        {data ? (
          <>
            <h2>Company Financials</h2>
            <div className="financial-info-item">
              <h3>Total Revenue</h3>
              <p>
                {data.totalRevenue
                  ? `$${data.totalRevenue.toLocaleString()}`
                  : "N/A"}
              </p>
            </div>
            <div className="financial-info-item">
              <h3>Revenue Growth</h3>
              <p>{data.revenueGrowth}%</p>
            </div>
            <div className="financial-info-item">
              <h3>Net Income</h3>
              <p>
                {data.netIncomeToCommon
                  ? `$${data.netIncomeToCommon.toLocaleString()}`
                  : "N/A"}
              </p>
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
              <p>{data.debtToEquity ? data.debtToEquity : "N/A"}</p>
            </div>
            <div className="financial-info-item">
              <h3>Total Debt</h3>
              <p>
                {data.totalDebt ? `$${data.totalDebt.toLocaleString()}` : "N/A"}
              </p>
            </div>
            <div className="financial-info-item">
              <h3>Operating Cash Flow</h3>
              <p>
                {data.operatingCashflow
                  ? `$${data.operatingCashflow.toLocaleString()}`
                  : "N/A"}
              </p>
            </div>
            <div className="financial-info-item">
              <h3>Free Cash Flow</h3>
              <p>
                {data.freeCashflow
                  ? `$${data.freeCashflow.toLocaleString()}`
                  : "N/A"}
              </p>
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
              <p>
                {data.sharesOutstanding
                  ? `$${data.sharesOutstanding.toLocaleString()}`
                  : "N/A"}
              </p>
            </div>
            <div className="financial-info-item">
              <h3>Float</h3>
              <p>
                {data.floatShares
                  ? `$${data.floatShares.toLocaleString()}`
                  : "N/A"}
              </p>
            </div>
            <div className="financial-info-item">
              <h3>Full-Time Employees</h3>
              <p>
                {data.fullTimeEmployees
                  ? `$${data.fullTimeEmployees.toLocaleString()}`
                  : "N/A"}
              </p>
            </div>
          </>
        ) : (
          "Loading Financials..."
        )}
      </section>
    </>
  );
};

export default FinancialInfoContainer;
