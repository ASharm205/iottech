import React from 'react';
import './ServiceCard.css';

function ServiceCard({ title, description, image, onClick }) {
  const resolvedSrc = typeof image === 'string' && !image.match(/^https?:\/\//)
    ? `${process.env.PUBLIC_URL}/${image.replace(/^\//, '')}`
    : image;

  return (
    <div className="service-item" onClick={onClick}>
      <div className="service-image">
        <img src={resolvedSrc} alt={title} />
      </div>
      <div className="service-title">{title}</div>
      <p>{description}</p>
      <div className="learn-more">Click to learn more</div>
    </div>
  );
}

export default ServiceCard;