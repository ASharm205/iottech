import React, { useState } from 'react';
import './ServiceCard.css';

function ServiceCard({ id, title, description, image, onClick, onDelete, isDeletable, hasDetailPage }) {
  const [imageError, setImageError] = useState(false);
  
  
  const resolvedSrc = typeof image === 'string' && image.match(/^https?:\/\//)
    ? image
    : `${process.env.PUBLIC_URL}/${(image || '').replace(/^\//, '')}`;

  // fallback placeholder when image fails to load
  const placeholderSrc = `${process.env.PUBLIC_URL}/images/comp.png`;

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(id);
  };

  return (
    <div 
      className={`service-item ${hasDetailPage ? 'clickable' : 'non-clickable'}`} 
      onClick={hasDetailPage ? onClick : undefined}
      style={{ cursor: hasDetailPage ? 'pointer' : 'default' }}
    >
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
      {hasDetailPage && <div className="learn-more">Click to learn more</div>}
    </div>
  );
}

export default ServiceCard;