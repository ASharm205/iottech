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
    const apiBase = process.env.REACT_APP_API_URL;
    if (!apiBase) return; // no API configured

    let cancelled = false;
    fetch(`${apiBase.replace(/\/$/, '')}/services`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) setServices(data);
      })
      .catch((err) => {
        // keep fallback services
        // eslint-disable-next-line no-console
        console.warn('Failed to load services from API:', err.message);
      });

    return () => {
      cancelled = true;
    };
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