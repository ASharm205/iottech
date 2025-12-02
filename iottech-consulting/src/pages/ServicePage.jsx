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
    // Merge in any locally added services (from AddServicePage)
    try {
      const raw = localStorage.getItem('customServices');
      const list = raw ? JSON.parse(raw) : [];
      if (Array.isArray(list) && list.length) {
        setServices((prev) => [...prev, ...list]);
      }
    } catch {}
  }, []);

  return (
    <div className="services-page">
      <h2>Services we offer for different solutions:</h2>
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
  );
}

export default ServicesPage;