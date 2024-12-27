import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // State variables
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all countries on initial render with async/await and try-catch
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true); // Set loading to true while fetching data
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        setFilteredCountries(response.data); // Show all countries initially
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError("Error fetching countries.");
        console.error("Error fetching data:", err);
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchCountries(); // Call the async function to fetch data
  }, []);

  // Filter countries based on search term
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
      setFilteredCountries(countries); // If no search term, show all countries
    }
  };

  return (
    <div className="app">
      <h1>Country Search</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a country"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Error Handling */}
      {error && <p className="error-message">{error}</p>}

      {/* Display loading state */}
      {loading && <p className="loading-message">Loading countries...</p>}

      {/* Country Cards */}
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
