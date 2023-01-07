const fetchData = (ticker, setData, shortDescription) => {
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

export default fetchData;
