import "./assets/css/App.css";
import { useRef, useState } from "react";

import Header from "./components/Header";
import DescriptionContainer from "./components/DescriptionContainer";
import PriceInfoContainer from "./components/PriceInfoContainer";
import FinancialInfoContainer from "./components/FinancialInfoContainer";
import useCreateChart from "./hooks/useCreateChart";
import useFetchData from "./hooks/useFetchData";

function App() {
  const [data, setData] = useState(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const shortDescription = useRef(null);
  const [ticker, setTicker] = useState("AAPL");

  const chartContainerRef = useRef();
  const priceSeries = useRef();
  const companies = useRef();

  useCreateChart(chartContainerRef, priceSeries);
  useFetchData(companies, ticker, priceSeries, setData, shortDescription);

  return (
    <>
      <Header
        data={data}
        setData={setData}
        companies={companies}
        setTicker={setTicker}
      />
      <DescriptionContainer
        data={data}
        shortDescription={shortDescription}
        descriptionExpanded={descriptionExpanded}
        setDescriptionExpanded={setDescriptionExpanded}
      />
      <main className="main-contents">
        <div
          ref={chartContainerRef}
          className="chart-container"></div>
        <PriceInfoContainer data={data} />
        <FinancialInfoContainer data={data} />
      </main>
    </>
  );
}

export default App;

