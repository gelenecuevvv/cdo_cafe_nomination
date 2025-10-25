import React from 'react';
import { Cafe } from '../../../types';
import styles from './SimpleMap.module.css';

interface SimpleMapProps {
  cafes: Cafe[];
  onCafeSelect: (cafe: Cafe) => void;
}

const SimpleMap: React.FC<SimpleMapProps> = ({ cafes, onCafeSelect }) => {
  return (
    <div className={styles.simpleMapContainer}>
      <div className={styles.mapHeader}>
        <h3 className={styles.mapTitle}>Café Locations</h3>
        <p className={styles.mapSubtitle}>Cagayan de Oro, Philippines</p>
      </div>
      
      <div className={styles.mapArea}>
        <div className={styles.mapGrid}>
          {cafes.map((cafe, index) => (
            <div 
              key={cafe.cafe_id} 
              className={styles.cafeMarker}
              onClick={() => onCafeSelect(cafe)}
            >
              <div className={styles.markerIcon}>
                ☕
              </div>
              <div className={styles.markerInfo}>
                <div className={styles.cafeName}>{cafe.cafe_name}</div>
                <div className={styles.cafeNominations}>
                  {cafe.nomination_count} nominations
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {cafes.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📍</div>
            <p className={styles.emptyText}>No cafés found</p>
          </div>
        )}
      </div>
      
      <div className={styles.mapLegend}>
        <div className={styles.legendItem}>
          <div className={styles.legendIcon}>☕</div>
          <span>Café locations</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendIcon}>🏆</div>
          <span>Highly nominated</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleMap;
