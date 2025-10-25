import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cafe-dark text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-2xl">☕</span>
            <span className="ml-2 text-xl font-bold">CDO Café Explorer</span>
          </div>
          <p className="text-cafe-cream mb-4">
            Discover the best cafés in Cagayan de Oro
          </p>
          <p className="text-sm text-cafe-beige">
            Developed for fun by Marie Angelene C. Cuevo ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
