import React, { useEffect, useState } from 'react';
import './AddServicePage.css';
import ServiceForm from '../components/ServiceForm';
import ServiceCard from '../components/ServiceCard';

function AddServicePage({ setActivePage }) {
  const fallbackServices = [
    {
      id: 1,
      title: 'Software',
      description: 'Our software consulting and development services are designed to bring your ideas to life through innovative digital solutions...',
      image: 'images/slideshows/software.png',
      page: 'software'
    },
    {
      id: 2,
      title: 'Management',
      description: 'Our management consulting services focus on aligning technology with your business strategy to achieve long-term success...',
      image: 'images/Mangement.png',
      page: 'management'
    }
  ];

  const [services, setServices] = useState(fallbackServices);

  // Fetch services from API on mount
  useEffect(() => {
    const apiBase = process.env.REACT_APP_API_URL;
    if (!apiBase) return;

    let cancelled = false;
    fetch(`${apiBase.replace(/\/$/, '')}/services`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch((err) => {
        console.warn('Failed to load services from API:', err.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Called when a new service is successfully added
  const handleServiceAdded = (newService) => {
    setServices((prev) => [...prev, newService]);
  };

  return (
    <div className="add-service-page">
      <ServiceForm onServiceAdded={handleServiceAdded} />

      <div className="services-list-section">
        <div className="services-list-wrapper">
          <h2>Current Services</h2>
          <p className="services-subtitle">
            Browse all services available in our consulting portfolio
          </p>
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                image={service.image}
                onClick={() => setActivePage(service.page)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddServicePage;
