import chartDesign from "../utils/chartDesign";
import { createChart } from "lightweight-charts";
import { useLayoutEffect } from "react";

const useCreateChart = (chartContainerRef, priceSeries) => {
  useLayoutEffect(() => {
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    };

    const { chartOptions, lineOptions } = chartDesign(chartContainerRef);

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
  }, [chartContainerRef, priceSeries]);
};

export default useCreateChart;
