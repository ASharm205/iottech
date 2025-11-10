import React from 'react';
import './ServicePage.css';
import ServiceCard from '../components/ServiceCard';

function ServicesPage({ setActivePage }) {
  const services = [
    {
      id: 1,
      title: "Software",
      description: "Our software consulting and development services are designed to bring your ideas to life through innovative digital solutions...",
      image: "/images/slideshows/software.png",
      page: "software"
    },
    {
      id: 2,
      title: "Management",
      description: "Our management consulting services focus on aligning technology with your business strategy to achieve long-term success...",
      image: "/images/Mangement.png",
      page: "management"
    }
  ];

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