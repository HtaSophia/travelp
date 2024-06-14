import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import './CardComponent.css';

const CardComponent = ({ imgUrl, title, description, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleIconClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card's onClick
    setIsLiked(!isLiked);
  };

  return (
    <div className="custom-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <img src={imgUrl} className="custom-card-img-top" alt={title} />
      <div className="custom-card-body">
        <h5 className="custom-card-title">{title}</h5>
        <p className="custom-card-text">{description}</p>
        <div className="custom-icon-container" onClick={handleIconClick}>
          <FontAwesomeIcon 
            icon={isLiked ? faHeartSolid : faHeartRegular} 
            className={`custom-heart-icon ${isLiked ? 'liked' : ''}`} 
          />
        </div>
      </div>
    </div>
  );
};

CardComponent.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

CardComponent.defaultProps = {
  onClick: () => {},
};

export default CardComponent;
