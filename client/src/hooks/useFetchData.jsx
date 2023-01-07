import fetchData from "../utils/api/fetchData";
import fetchHistoricalData from "../utils/api/fetchHistoricalData";
import fetchCompanyList from "../utils/api/fetchCompanyList";
import { useEffect } from "react";

const useFetchData = (
  companies,
  ticker,
  priceSeries,
  setData,
  shortDescription
) => {
  useEffect(() => {
    fetchCompanyList(companies);
    fetchData(ticker, setData, shortDescription);
    fetchHistoricalData(ticker, priceSeries);
  }, [ticker]);
};

export default useFetchData;
