import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-cafe-beige to-cafe-cream py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-cafe-dark mb-6">
            Nominate Your Favorite Cafés in CDO ☕
          </h1>
          <p className="text-xl text-cafe-brown mb-8 max-w-3xl mx-auto">
            Discover and share the best coffee spots in Cagayan de Oro. 
            Help build a community-driven map of amazing cafés that locals and visitors can explore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/nominate" className="btn-cafe inline-block text-center">
              Nominate a Café
            </Link>
            <Link to="/map" className="btn-cafe-outline inline-block text-center">
              View Map & Top Cafés
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
