import React from "react";
import Select from "react-select";

const Header = ({ data, setData, setTicker, companies }) => {
  return (
    <>
      <header>
        {data ? (
          <>
            <Select
              theme={(theme) => ({
                ...theme,
                borderRadius: 10,
                colors: {
                  ...theme.colors,
                  primary25: "lightblue",
                  primary: "black",
                },
              })}
              styles={{
                container: (provided) => ({
                  ...provided,
                  position: "absolute",
                  top: "50px",
                  right: "70px",
                  width: "500px",
                  fontSize: "1.5rem",
                  color: "black",
                }),
                menu: (provided) => ({
                  ...provided,
                  top: "45px",
                  right: "0px",
                  width: "500px",
                  fontSize: "1.5rem",
                  overflow: "hidden",
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
