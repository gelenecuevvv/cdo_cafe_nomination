import React, { useEffect, useRef, useState } from 'react';
import { Cafe } from '../../../types';
import SimpleMap from './SimpleMap';
import styles from './MapSection.module.css';

interface MapSectionProps {
  cafes: Cafe[];
  onCafeSelect: (cafe: Cafe) => void;
}

const MapSection: React.FC<MapSectionProps> = ({ cafes, onCafeSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (window.google && window.google.maps && mapRef.current) {
        try {
          const cdo = { lat: 8.4808, lng: 124.6479 };
          
          mapInstance.current = new google.maps.Map(mapRef.current, {
            zoom: 13,
            center: cdo,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          setMapLoaded(true);
          createMarkers();
        } catch (error) {
          console.error('Error initializing map:', error);
          setMapError('Failed to initialize map. Please try again.');
        }
      }
    };

    // Simple approach: check if Google Maps is available
    let attempts = 0;
    const maxAttempts = 20; // 10 seconds max
    
    const checkGoogleMaps = () => {
      attempts++;
      
      if (window.google && window.google.maps) {
        console.log('Google Maps detected, initializing...');
        initializeMap();
      } else if (attempts >= maxAttempts) {
        console.error('Google Maps failed to load after 10 seconds');
        setMapError('Google Maps is taking too long to load. Please check your internet connection.');
      } else {
        console.log(`Google Maps not ready, waiting... (attempt ${attempts}/${maxAttempts})`);
        setTimeout(checkGoogleMaps, 500);
      }
    };

    // Start checking after a short delay
    setTimeout(checkGoogleMaps, 1000);
  }, []);

  useEffect(() => {
    if (mapInstance.current) {
      createMarkers();
    }
  }, [cafes]);

  const createMarkers = () => {
    if (!mapInstance.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];

    cafes.forEach(cafe => {
      const marker = new google.maps.Marker({
        position: { lat: parseFloat(cafe.latitude.toString()), lng: parseFloat(cafe.longitude.toString()) },
        map: mapInstance.current,
        title: cafe.cafe_name,
        icon: {
          url: cafe.nomination_count > 5 ? 
            'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" fill="#10B981" stroke="white" stroke-width="2"/>
                <text x="16" y="20" text-anchor="middle" fill="white" font-size="16">☕</text>
              </svg>
            `) :
            'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" fill="#8B4513" stroke="white" stroke-width="2"/>
                <text x="16" y="20" text-anchor="middle" fill="white" font-size="16">☕</text>
              </svg>
            `)
        }
      });

      marker.addListener('click', () => {
        onCafeSelect(cafe);
      });

      markers.current.push(marker);
    });
  };

  return (
    <div className="lg:col-span-2">
      <div className={styles.mapWrapper}>
        <h2 className={styles.mapTitle}>Interactive Map</h2>
        
        {mapError ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="text-gray-600 mb-4">{mapError}</p>
                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      setMapError(null);
                      setMapLoaded(false);
                      window.location.reload();
                    }} 
                    className="block w-full px-4 py-2 bg-cafe-brown text-white rounded-lg hover:bg-cafe-dark transition-colors"
                  >
                    Retry Map
                  </button>
                </div>
              </div>
            </div>
            
            {/* Fallback Simple Map */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">📱 Alternative: Café List View</p>
              <SimpleMap cafes={cafes} onCafeSelect={onCafeSelect} />
            </div>
          </div>
        ) : !mapLoaded ? (
          <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
            <div className="text-center">
              <div className="spinner mb-4"></div>
              <p className="text-gray-600">Loading interactive map...</p>
            </div>
          </div>
        ) : (
          <div ref={mapRef} className={styles.mapContainer}></div>
        )}
        
        <div className={styles.mapDescription}>
          <p>Click on markers to see café details. Green markers indicate highly nominated cafés.</p>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
