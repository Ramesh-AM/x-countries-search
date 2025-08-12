import React, { useState, useEffect } from "react";

function CountriesSearch() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    const filtered = Array.isArray(countries)
      ? countries.filter(
          (country) =>
            country?.common &&
            country.common.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  return (
    <div className="countries-search" style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      />

      <div
        className="App"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((item, index) => (
            <div
              key={index}
              className="countryCard"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                border: "1px solid black",
                borderRadius: "4px",
                width: "200px",
                height: "200px",
                textAlign: "center",
                padding: "10px",
              }}
            >
              <img
                src={item?.png}
                alt={`Flag of ${item?.common}`}
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
              <h2 style={{ margin: "0" }}>{item?.common}</h2>
            </div>
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </div>
  );
}

export default CountriesSearch;
