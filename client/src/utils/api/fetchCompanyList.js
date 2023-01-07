const fetchCompanyList = (companies) => {
  fetch(`http://localhost:5555/companies`)
    .then((res) => res.json())
    .then((data) => {
      companies.current = data;
    });
};

export default fetchCompanyList;
