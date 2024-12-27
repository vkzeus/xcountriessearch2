import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        setFilteredCountries(response.data);
        setLoading(false); 
      } catch (err) {
        setError("Error fetching countries.");
        console.error("Error fetching data:", err);
        setLoading(false); 
      }
    };

    fetchCountries(); 
  }, []);

  
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);

    if (query) {
      setFilteredCountries(
        countries.filter((country) =>
          country.name.common.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredCountries(countries); 
    }
  };

  return (
    <div className="app">
      <h1>Country Search</h1>

    
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a country"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

     
      {error && <p className="error-message">{error}</p>}


      {loading && <p className="loading-message">Loading countries...</p>}

  
      <div className="country-cards">
        {filteredCountries.map((country) => (
          <div key={country.cca3} className="countryCard">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="country-flag"
            />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
