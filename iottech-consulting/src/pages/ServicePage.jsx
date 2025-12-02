import React, { useEffect, useState } from 'react';
import './ServicePage.css';
import ServiceCard from '../components/ServiceCard';

function ServicesPage({ setActivePage }) {
  const fallbackServices = [
    {
      id: 1,
      title: "Software",
      description: "Our software consulting and development services are designed to bring your ideas to life through innovative digital solutions...",
      image: "images/slideshows/software.png",
      page: "software"
    },
    {
      id: 2,
      title: "Management",
      description: "Our management consulting services focus on aligning technology with your business strategy to achieve long-term success...",
      image: "images/Mangement.png",
      page: "management"
    }
  ];

  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('customServices');
      const list = raw ? JSON.parse(raw) : [];
      if (Array.isArray(list) && list.length) {
        setServices((prev) => [...prev, ...list]);
      }
    } catch {}
  }, []);

  const handleDelete = (serviceId) => {
    // only allow deletion of custom services 
    if (serviceId <= 2) {
      alert('Cannot delete default services (Software and Management)');
      return;
    }
    
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      const raw = localStorage.getItem('customServices');
      const list = raw ? JSON.parse(raw) : [];
      const updated = list.filter((s) => s.id !== serviceId);
      localStorage.setItem('customServices', JSON.stringify(updated));
      setServices((prev) => prev.filter((s) => s.id !== serviceId));
    } catch (err) {
      alert('Failed to delete service');
    }
  };

  const handleServiceClick = (service) => {
    // only navigate for software and management which have detail pages
    if (service.page && (service.page === 'software' || service.page === 'management')) {
      setActivePage(service.page);
    }
  };

  return (
    <div className="services-page">
      <h2>Services we offer for different solutions:</h2>
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            image={service.image}
            onClick={() => handleServiceClick(service)}
            onDelete={handleDelete}
            isDeletable={service.id > 2}
            hasDetailPage={service.page === 'software' || service.page === 'management'}
          />
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;