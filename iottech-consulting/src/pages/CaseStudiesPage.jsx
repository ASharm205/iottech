import React from 'react';
import './CaseStudiesPage.css';
import CaseStudyCard from '../components/CaseStudyCard';

function CaseStudiesPage() {
  const caseStudies = [
    {
      id: 1,
      rating: "★★★★★ 5 Stars",
      title: "So happy with my service from IOTTech!",
      testimonial: "The software developed by IOTTech has truly exceeded my expectations. Not only is it innovative and reliable, but it was also designed in a way that makes it easy for our entire team to use. The employees quickly adapted to the system, and it has streamlined so many of our daily operations. I'm impressed by both the quality of the product and the support we've received throughout the process.",
      client: "Kendall-Jackson's",
      image: "images/BigM.png"
    },
    {
      id: 2,
      rating: "★★★★ 4 Stars",
      title: "Exceptional job!",
      testimonial: "The management services provided by IOTTech played a crucial role in helping my company reach its goals. Their team took the time to understand our unique needs and developed strategies that maximized our efficiency and profitability. Thanks to their guidance, we've been able to grow steadily and make confident business decisions for the future.",
      client: "All Natural Nails",
      image: "images/Times.png"
    },
    {
      id: 3,
      rating: "★★★★★ 5 Stars",
      title: "IOTTech transformed the way we run our business!",
      testimonial: "Partnering with IOTTech has been one of the best decisions we've ever made. Their solutions allowed us to automate repetitive tasks, which freed up our staff to focus on more meaningful projects. The software is intuitive, efficient, and completely customized to our needs. We've seen a noticeable boost in productivity and overall team morale since implementation.",
      client: "Greenfield Enterprises",
      image: "images/comp.png"
    },
    {
      id: 4,
      rating: "★★★★★ 5 Stars",
      title: "Professional, reliable, and results-driven service!",
      testimonial: "IOTTech's management services gave us the structure and guidance we needed to take our company to the next level. Their team worked closely with us to identify opportunities for growth and created a clear plan that delivered measurable results. Thanks to their expertise, we've achieved higher efficiency, reduced costs, and increased profits in just a few months. I would highly recommend them to any business looking to grow.",
      client: "Horizon Global Solutions",
      image: "images/company.png"
    }
  ];

  return (
    <div className="case-studies-page">
      <h2>Client Stories</h2>
      <p className="case-studies-intro">Discover how we've helped businesses transform their operations and achieve their goals through our comprehensive consulting services.</p>
      <div className="case-studies-grid">
        {caseStudies.map((study) => (
          <CaseStudyCard
            key={study.id}
            rating={study.rating}
            title={study.title}
            testimonial={study.testimonial}
            client={study.client}
            image={study.image}
          />
        ))}
      </div>
    </div>
  );
}

export default CaseStudiesPage;