import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const CityList = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:3001/cities');
        setCities(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  if (loading) return <div className="loading">Loading cities...</div>;

  return (
    <div className="city-list">
      <h2>CURRENT TOWN'S WEATHER</h2>
      <div className="cities-grid">
        {cities.map(city => (
          <Link to={`/weather/${city.name}`} key={city.id} className="city-card">
            <h3>{city.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CityList;