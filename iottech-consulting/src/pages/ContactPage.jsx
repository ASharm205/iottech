import React, { useState } from 'react';
import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', '197d5ab0-4c88-4b15-ba3b-27ff057aa275');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        setTimeout(() => {
          setSubmitStatus('');
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="contact-page">
      <h2>To get a consultation please contact us:</h2>
      <p>
        Getting started with IOTTech Consulting is simple. Our team is here to answer your questions, 
        learn more about your business challenges, and provide expert guidance tailored to your needs. 
        Whether you're interested in software solutions, management consulting, or a complete digital 
        transformation, we'll work with you to design the best approach. Reach out today to schedule 
        a consultation and discover how we can help your business grow smarter and stronger.
      </p>
      
      <div className="contact-container">
        <div className="contact-form-section">
          <h3>Send us a message</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                placeholder="Tell us about your project:"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={submitStatus === 'sending'}>
              {submitStatus === 'sending' ? 'Sending...' : 'Submit Form'}
            </button>
          </form>

          {submitStatus === 'sending' && (
            <div className="form-message sending">
              <p>Sending your message...</p>
            </div>
          )}
          {submitStatus === 'success' && (
            <div className="form-message success">
              <p>✓ Thank you! Your message has been sent successfully. We will get back to you within 24 hours.</p>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="form-message error">
              <p>✗ Oops! Something went wrong. Please try again or email us directly at IOTTechConsulting@gmail.com</p>
            </div>
          )}
        </div>

        <div className="contact-info-section">
          <div className="contact-info">
            <h3>Contact Information:</h3>
            <p><strong>Email:</strong> IOTTechConsulting@gmail.com</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
            <p><strong>Address:</strong> 123 Main St, New York, NY 10001</p>
          </div>

          <div className="location-info">
            <h3>Find us:</h3>
            <iframe 
              id="map" 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6175411575814!2d-73.98823932392753!3d40.748440471388086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1760457011438!5m2!1sen!2sus" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Empire State Building Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;