import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherDetail from './components/WeatherDetail';
import Navbar from './Navbar';
import CityList from './components/CityList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<CityList />} />
          <Route path="/weather/:cityName" element={<WeatherDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;