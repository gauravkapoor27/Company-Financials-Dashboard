const fetchHistoricalData = (ticker, priceSeries) => {
  fetch(`http://localhost:5555/historical/${ticker}`)
    .then((res) => res.json())
    .then((data) => {
      const next = data.map((item) => {
        return { value: item[1], time: item[0] };
      });
      priceSeries.current.setData(next);
    });
};

export default fetchHistoricalData;
