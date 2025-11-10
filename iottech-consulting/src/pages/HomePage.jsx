import React from 'react';
import './HomePage.css';
import Slideshow from '../components/Slideshow';

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to IOTTech Consulting!</h1>
          <p className="hero-subtitle">We are the consulting service for your company!</p>
        </div>
        <div className="hero-image">
          <div className="hero-image-placeholder">🏙️</div>
        </div>
      </div>

      <Slideshow />
      
      <div className="about-preview">
        <h2>What does IOTTech Consulting do?</h2>
        <p>At IOTTech Consulting, we specialize in providing top-notch consulting services to help businesses 
        leverage the power of Internet of Things (IoT) technologies. Our team of experts works closely with clients 
        to develop tailored solutions that drive innovation, improve efficiency, and enhance customer experiences. From 
        optimizing smart devices and streamlining data systems to creating digital transformation strategies, we ensure your
        company stays competitive in today's fast-paced, tech-driven world.</p>
        
        <div className="mission-statement">
          <h3>Contact Us for your needs</h3>
          <p>We proudly serve companies across a wide range of industries, from retail and healthcare
          to logistics and finance. Whether you are a growing startup or an established enterprise, 
          our consulting services are designed to scale with your business. We focus on creating long-term 
          partnerships by offering flexible, reliable, and cost-effective solutions that align with your goals. 
          Let us know your challenges, and we'll design the right strategy to take your organization to the next level.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;