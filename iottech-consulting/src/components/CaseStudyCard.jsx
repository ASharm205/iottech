import React from 'react';
import './CaseStudyCard.css';

function CaseStudyCard({ rating, title, testimonial, client, image, imageUrl, imagePath, onEdit, onDelete }) {
  const apiBase = process.env.REACT_APP_API_URL?.replace(/\/$/, '') || '';
  
  let resolvedImg = image || '';
  if (imagePath) {
    resolvedImg = `${apiBase}${imagePath}`;
  }
  if (imageUrl) {
    resolvedImg = imageUrl;
  }
  
  // fallback path, resolve via PUBLIC_URL for gh-pages
  if (resolvedImg && !resolvedImg.startsWith('http') && !resolvedImg.startsWith('/uploads')) {
    resolvedImg = `${process.env.PUBLIC_URL}/${resolvedImg.replace(/^\//, '')}`;
  }
  return (
    <div className="case-study">
      <div className="case-image">
        <img src={resolvedImg} alt={client} />
      </div>
      <div className="case-content">
        <div className="case-rating">{rating}</div>
        <h3>{title}</h3>
        <p>{testimonial}</p>
        <div className="case-client">- {client}</div>
        <div className="case-actions">
          {onEdit && <button className="btn-edit" onClick={onEdit}>Edit</button>}
          {onDelete && <button className="btn-delete" onClick={onDelete}>Delete</button>}
        </div>
      </div>
    </div>
  );
}

export default CaseStudyCard;
