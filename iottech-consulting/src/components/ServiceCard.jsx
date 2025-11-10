import React from 'react';
import './ServiceCard.css';

function ServiceCard({ title, description, image, onClick }) {
  return (
    <div className="service-item" onClick={onClick}>
      <div className="service-image">
        <img src={image} alt={title} />
      </div>
      <div className="service-title">{title}</div>
      <p>{description}</p>
      <div className="learn-more">Click to learn more</div>
    </div>
  );
}

export default ServiceCard;