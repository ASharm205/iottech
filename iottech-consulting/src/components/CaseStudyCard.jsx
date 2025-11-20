import React from 'react';
import './CaseStudyCard.css';

function CaseStudyCard({ rating, title, testimonial, client, image, onEdit, onDelete }) {
  return (
    <div className="case-study">
      <div className="case-image">
        <img src={image} alt={client} />
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
