import React from 'react';
import './ServiceDetailPage.css';

function SoftwareDetailPage({ setActivePage }) {
  return (
    <div className="service-detail-page">
      <div className="service-detail">
        <button className="back-btn" onClick={() => setActivePage('services')}>
          ← Back to Services
        </button>
        <h2>Software Solutions</h2>
        <div className="service-hero">
          <img src="images/solutions.png" alt="Software Solutions" />
        </div>
        <div className="service-content">
          <h3>Custom Software Development</h3>
          <p>We specialize in creating tailored software solutions that meet your specific business needs. Our team develops everything from web applications to mobile apps and enterprise software systems.</p>
          
          <h3>What We Offer:</h3>
          <ul>
            <li>Custom web application development</li>
            <li>Mobile app development (iOS & Android)</li>
            <li>Database design and management</li>
            <li>Software maintenance and support</li>
          </ul>
          
          <h3>Technologies We Use:</h3>
          <p>JavaScript, Python, Java, React, Node.js, MySQL, MongoDB, and more.</p>
          
          <div className="contact-cta">
            <h3>Ready to start your software project?</h3>
            <p>Contact us today to discuss how we can help bring your ideas to life.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoftwareDetailPage;