import React, { useState, useEffect } from 'react';
import './Slideshow.css';

function Slideshow() {
  const slides = [
    {
      id: 1,
      title: "Innovative IoT Solutions",
      description: "Transform your business with cutting-edge technology",
      image: "/images/slideshows/company.png"
    },
    {
      id: 2,
      title: "Expert Software Development",
      description: "Custom applications tailored to your needs",
      image: "/images/slideshows/software.png"
    },
    {
      id: 3,
      title: "Strategic Management Consulting",
      description: "Optimize operations and drive growth",
      image: "/images/slideshows/solutions.png"    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="slideshow">
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="slide-image-placeholder">{slide.emoji}</div>
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}

        <button className="slide-arrow prev" onClick={goToPrevious}>❮</button>
        <button className="slide-arrow next" onClick={goToNext}>❯</button>
      </div>

      <div className="slide-dots">
        {slides.map((slide, index) => (
          <span
            key={slide.id}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;