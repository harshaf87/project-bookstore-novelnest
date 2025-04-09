import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import './Home.css';

function Home({ showFeatureInDevelopment }) {
  const navigate = useNavigate();
  
  const handleExplore = () => {
    navigate('/new-books');
  };

  return (
    <section id="home" className="page-section active">
      <Hero onExplore={handleExplore} />
      <Features />
    </section>
  );
}

export default Home;