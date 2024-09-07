import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import {
  faHeart as solidHeart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../App.css";
import { AppState } from "../context";

interface City {
  name: string;
  country: string;
  timezone: string;
}

const CitiesTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const { cities, setCities, favoriteCities, toggleFavorite } = AppState();

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=20&start=${
          page * 20
        }&q=${debouncedSearchTerm}`
      );

      const newCities = response.data.records.map((record: any) => ({
        name: record.fields.name,
        country: record.fields.cou_name_en,
        timezone: record.fields.timezone,
      }));

      setCities((prevCities: City[]) => [...prevCities, ...newCities]);
      if (newCities.length === 0) setHasMore(false);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm === "" || page === 0) setHasMore(true);
    fetchCities();
  }, [page, debouncedSearchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(0);
    setCities([]);
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search city..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-box"
      />

      <div className="favorite-cities">
        <h2>Favorite Cities</h2>
        <ul>
          {favoriteCities.map((city) => (
            <li key={city}>
              <Link to={`/weather/${city}`} className="link">
                {city}
              </Link>
              <FontAwesomeIcon
                icon={faXmark}
                style={{ cursor: "pointer" }}
                onClick={() => toggleFavorite(city)}
              />
            </li>
          ))}
        </ul>
      </div>

      <InfiniteScroll
        dataLength={cities.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more cities to load</p>} // Message when no more cities
      >
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Country</th>
              <th>Timezone</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/weather/${city.name}`} className="link">
                    {city.name}
                  </Link>
                </td>
                <td>{city.country}</td>
                <td>{city.timezone}</td>
                <td>
                  <button onClick={() => toggleFavorite(city.name)}>
                    <FontAwesomeIcon
                      icon={solidHeart}
                      style={{
                        color: favoriteCities.includes(city.name)
                          ? "red"
                          : "gray",
                        cursor: "pointer",
                        border: "none",
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default CitiesTable;
