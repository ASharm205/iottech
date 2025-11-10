import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicePage';
import SoftwareDetailPage from './pages/SoftwareDetailPage';
import ManagementDetailPage from './pages/ManagementDetailPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [activePage, setActivePage] = useState('home');

  return (
    <div className="app">
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      
      <main className="main-content">
        {activePage === 'home' && <HomePage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'services' && <ServicesPage setActivePage={setActivePage} />}
        {activePage === 'software' && <SoftwareDetailPage setActivePage={setActivePage} />}
        {activePage === 'management' && <ManagementDetailPage setActivePage={setActivePage} />}
        {activePage === 'case-studies' && <CaseStudiesPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>
    </div>
  );
}

export default App;