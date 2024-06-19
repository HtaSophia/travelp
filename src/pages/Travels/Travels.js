import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useFirebase } from '../../firebase/useFirebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faFlag, faGlobe } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/shared/Button/Button';
import CardComponent from '../../components/Card/CardComponent';
import Map from '../../components/Map/Map';
import './Travels.css';

const Travels = () => {
  const navigate = useNavigate(); // Hook for navigation
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
    } else if (category === 'favorites') {
      setFilteredTravels(travels.filter(travel => travel.isFavorite)); // Assuming `isFavorite` is a boolean field
    } else {
      setFilteredTravels(travels.filter(travel => travel.category === category));
    }
  };
  

  return (
    <div className="travels-page container py-5">
      <div className="travels-header d-flex justify-content-between align-items-center mb-4">
        <h1>Travels</h1>
        <Button onClick={() => navigate('/create-travel')}>
          Create a Travel Plan
        </Button>
      </div>
      <div className="travels-filters mb-4 d-flex">
        <button
          className={`filter-button ${activeFilter === 'all' ? 'active' : ''} me-2 all`}
          onClick={() => handleFilter('all')}
        >
          <FontAwesomeIcon icon={faGlobe} />
        </button>
        <button
          className={`filter-button ${activeFilter === 'favorites' ? 'active' : ''} me-2 favorites`}
          onClick={() => handleFilter('favorites')}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <button
          className={`filter-button ${activeFilter === 'flag' ? 'active' : ''} me-2 flag`}
          onClick={() => handleFilter('flag')}
        >
          <FontAwesomeIcon icon={faFlag} />
        </button>
      </div>
      <div className="travels-content row">
        <div className="travels-list col-md-8">
          {filteredTravels.length > 0 ? (
            filteredTravels.map(travel => (
              <CardComponent 
                key={travel.id} 
                imgUrl={travel.imgUrl} 
                title={travel.title} 
                description={travel.description}
                onClick={() => navigate(`/travel/${travel.id}`)} // Navigate to travel details
              />
            ))
          ) : (
            <p>No travels found.</p>
          )}
        </div>
        <div className="travels-map col-md-4">
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
