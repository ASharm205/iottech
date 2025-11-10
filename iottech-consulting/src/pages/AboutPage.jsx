import React from 'react';
import './AboutPage.css';
import TeamMember from '../components/TeamMember';

function AboutPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Anuska Sharma",
      position: "CEO",
      bio: "With over three years of experience in the consulting industry, I founded IOTTech Consulting to help businesses, especially small and growing companies—unlock their potential through technology. My passion lies in building strategies that connect people, processes, and IOT solutions to deliver real results. As CEO, I focus on driving our vision forward and ensuring every client receives innovative solutions tailored to their needs.",
      image: "/images/Anuska.png"
    },
    {
      id: 2,
      name: "Jacob Lotter",
      position: "CFO",
      bio: "As a founding member of IOTTech Consulting, I bring financial expertise and strategic planning to support our clients' growth. With two years of experience in the consulting field, I have helped companies implement cost-efficient IOT and technology-driven solutions that maximize profitability. My role as CFO is to ensure sustainable financial health for both IOTTech and the organizations we partner with.",
      image: "/images/jacob.png"
    },
    {
      id: 3,
      name: "Andrea Class",
      position: "CTO",
      bio: "As CTO, I lead the development and implementation of our technology solutions, ensuring clients receive cutting-edge IOT and software strategies. With a strong background in computer systems and software integration, I specialize in bridging technical innovation with practical business needs. In my first year at IOTTech, I've worked closely with teams to design scalable, secure, and user-friendly solutions that help businesses stay ahead in today's digital landscape.",
      image: "/images/Girl.png"
    },
    {
      id: 4,
      name: "John Summit",
      position: "COO",
      bio: "With four years of experience in consulting and business operations, I oversee the delivery of our services to ensure every client engagement runs smoothly and efficiently. My role as COO is to transform business challenges into opportunities by implementing proven processes and scalable IOT-driven strategies. I take pride in helping companies achieve operational excellence while positioning them for future growth.",
      image: "/images/Guy.png"
    }
  ];

  return (
    <div className="about-page">
      <div className="about-content">
        <div className="about-description">
          <h2>What does IOTTech Consulting do?</h2>
          <p>At IOTTech Consulting, we provide expert consulting services that empower businesses to adopt and maximize IoT solutions. 
          Our experienced professionals collaborate with clients to design and implement customized strategies that bring measurable results.
          Whether it's automating processes, integrating software platforms, or improving customer engagement through smart technology, 
          we are committed to helping organizations grow with innovation and confidence. We believe in building lasting partnerships that adapt to the 
          unique needs of every industry we serve.</p>

          <div className="mission-statement">
            <h3>Mission Statement</h3>
            <p>At IOTTech, our mission is to help companies unlock their full potential by embracing modern technologies with clarity and confidence. 
            We aim to bridge the gap between business goals and technical solutions, ensuring that every project we take on delivers meaningful impact. 
            By prioritizing innovation, collaboration, and trust, we create strategies that not only solve today's challenges but also prepare companies 
            for the opportunities of tomorrow. Contact us today and let's build a smarter future together.</p>
          </div>

          <div className="team-section">
            <h3>Meet the C-Suite!</h3>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <TeamMember
                  key={member.id}
                  name={member.name}
                  position={member.position}
                  bio={member.bio}
                  image={member.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;