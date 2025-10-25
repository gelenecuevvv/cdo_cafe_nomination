import React from 'react';
import styles from './FeaturesSection.module.css';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      number: 1,
      title: 'Nominate',
      description: 'Share your favorite cafés with the community. You can nominate up to 20 cafés.'
    },
    {
      number: 2,
      title: 'Explore',
      description: 'Browse our interactive map to discover new cafés and see what others recommend.'
    },
    {
      number: 3,
      title: 'Connect',
      description: 'Follow cafés on Facebook and connect with the local coffee community.'
    }
  ];

  return (
    <section className={styles.featuresSection}>
      <div className={styles.featuresContainer}>
        <div className={styles.featuresHeader}>
          <h2 className={styles.featuresTitle}>How It Works</h2>
          <p className={styles.featuresSubtitle}>
            Join our community in discovering and celebrating the best cafés in Cagayan de Oro
          </p>
        </div>
        
        <div className={styles.featuresGrid}>
          {features.map((feature) => (
            <div key={feature.number} className={styles.featureItem}>
              <div className={styles.featureNumber}>
                {feature.number}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
