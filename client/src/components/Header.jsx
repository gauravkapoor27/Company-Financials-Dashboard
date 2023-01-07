import React from "react";
import Select from "react-select";

const Header = ({ data, setData, setTicker, companies }) => {
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
              value={{ label: "Search for a stock...", value: 0 }}
              options={companies.current}
              onChange={(e) => {
                setTicker(e.value);
                setData(null);
              }}
            />
            <div className="main-title">
              <img
                src={data.logo_url}
                alt=""
                className="ticker-logo"
                style={{
                  height: "40px",
                  borderRadius: "10%",
                  margin: "3px",
                  border: "none",
                }}
              />
              <h1 className="ticker-heading">
                {data.shortName} ({data.symbol}) |{" "}
                {data.currentPrice > data.previousClose ? (
                  <span style={{ color: "green" }}>${data.currentPrice}</span>
                ) : (
                  <span style={{ color: "red" }}>${data.currentPrice}</span>
                )}
              </h1>
            </div>
          </>
        ) : (
          <h1 className="ticker-loading-message">Loading Symbol...</h1>
        )}
      </header>
    </>
  );
};

export default Header;
