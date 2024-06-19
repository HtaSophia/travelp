// src/pages/Travels/Travels.js

import React, { useEffect, useState } from 'react';
import { useFirebase } from '../../firebase/useFirebase';
import Button from '../../components/shared/Button/Button';
import CardComponent from '../../components/Card/CardComponent';
import Map from '../../components/Map/Map';
import './Travels.css';

const Travels = () => {
  const { getTravels } = useFirebase();
  const [travels, setTravels] = useState([]);
  const [filteredTravels, setFilteredTravels] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    async function fetchTravels() {
      try {
        const travelList = await getTravels();
        console.log("Travel List: ", travelList); // Debugging log
        setTravels(travelList);
        setFilteredTravels(travelList);
      } catch (error) {
        console.error("Error fetching travels:", error);
      }
    }
    fetchTravels();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredTravels(travels);
    } else {
      setFilteredTravels(travels.filter(travel => travel.category === category));
    }
  };

  return (
    <div className="travels-page">
      <div className="travels-header">
        <h1>Travels</h1>
        <div className="travels-filters">
          <button
            className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-button ${activeFilter === 'favorites' ? 'active' : ''}`}
            onClick={() => handleFilter('favorites')}
          >
            Favorites
          </button>
          {/* Add more filter buttons as needed */}
        </div>
        <Button text="Create a Travel Plan" onClick={() => { /* navigate to travel form */ }} />
      </div>
      <div className="travels-content">
        <div className="travels-list">
          {filteredTravels.length > 0 ? (
            filteredTravels.map(travel => (
              <CardComponent 
                key={travel.id} 
                imgUrl={travel.imgUrl} 
                title={travel.title} 
                description={travel.description}
                onClick={() => { /* navigate to travel details */ }}
              />
            ))
          ) : (
            <p>No travels found.</p>
          )}
        </div>
        <div className="travels-map">
          <Map markers={filteredTravels.map((travel, index) => ({
            position: { lat: travel.latitude, lng: travel.longitude },
            title: travel.title,
            index,
          }))} />
        </div>
      </div>
    </div>
  );
};

export default Travels;
