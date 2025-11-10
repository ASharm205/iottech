import React from 'react';
import './ServiceDetailPage.css';

function ManagementDetailPage({ setActivePage }) {
  return (
    <div className="service-detail-page">
      <div className="service-detail">
        <button className="back-btn" onClick={() => setActivePage('services')}>
          ← Back to Services
        </button>
        <h2>Management Solutions</h2>
        <div className="service-hero">
          <img src="images/mange.png" alt="Management Solutions" />
        </div>
        <div className="service-content">
          <h3>Business Management</h3>
          <p>Our management consulting services help streamline your business operations, improve efficiency, and drive growth through strategic planning and implementation.</p>
          
          <h3>What We Offer:</h3>
          <ul>
            <li>Business process optimization</li>
            <li>Project management consulting</li>
            <li>Digital transformation strategies</li>
            <li>Performance analytics and reporting</li>
          </ul>
          
          <h3>Our Approach:</h3>
          <p>We work closely with your team to understand your challenges and develop customized solutions that deliver measurable results.</p>
          
          <div className="contact-cta">
            <h3>Transform your business operations</h3>
            <p>Let's discuss how our management expertise can help your business thrive.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagementDetailPage;