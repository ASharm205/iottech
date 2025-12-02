import React from 'react';
import './ServiceCard.css';

function ServiceCard({ title, description, image, onClick }) {
  // If it's already a full URL (http/https), use it directly
  // Otherwise treat it as a local path and prepend PUBLIC_URL
  const resolvedSrc = typeof image === 'string' && image.match(/^https?:\/\//)
    ? image
    : `${process.env.PUBLIC_URL}/${(image || '').replace(/^\//, '')}`;

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