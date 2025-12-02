import React, { useState } from 'react';
import './ServiceCard.css';

function ServiceCard({ id, title, description, image, onClick, onDelete, isDeletable }) {
  const [imageError, setImageError] = useState(false);
  
  // If it's already a full URL (http/https), use it directly
  // Otherwise treat it as a local path and prepend PUBLIC_URL
  const resolvedSrc = typeof image === 'string' && image.match(/^https?:\/\//)
    ? image
    : `${process.env.PUBLIC_URL}/${(image || '').replace(/^\//, '')}`;

  // Fallback placeholder when image fails to load
  const placeholderSrc = `${process.env.PUBLIC_URL}/images/comp.png`;

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(id);
  };

  return (
    <div className="service-item" onClick={onClick}>
      {isDeletable && (
        <button 
          className="delete-service-btn" 
          onClick={handleDeleteClick}
          title="Delete service"
        >
          ×
        </button>
      )}
      <div className="service-image">
        <img 
          src={imageError ? placeholderSrc : resolvedSrc} 
          alt={title}
          onError={() => setImageError(true)}
        />
      </div>
      <div className="service-title">{title}</div>
      <p>{description}</p>
      <div className="learn-more">Click to learn more</div>
    </div>
  );
}

export default ServiceCard;