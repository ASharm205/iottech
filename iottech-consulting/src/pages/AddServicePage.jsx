import React, { useState } from 'react';
import './AddServicePage.css';
import ServiceForm from '../components/ServiceForm';

function AddServicePage({ setActivePage }) {
  const handleServiceAdded = (newService) => {
    // service was successfully added via the form
    console.log('New service added:', newService);
  };

  return (
    <div className="add-service-page">
      <ServiceForm onServiceAdded={handleServiceAdded} />
    </div>
  );
}

export default AddServicePage;
