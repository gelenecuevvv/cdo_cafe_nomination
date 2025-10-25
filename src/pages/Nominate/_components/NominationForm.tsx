import React, { useState, useEffect } from 'react';
import { submitNomination } from '../../../utils/api';
import { FormData, ValidationErrors } from '../../../types';
import { validateForm, showToast, getUserId } from '../../../utils/helpers';
import styles from './NominationForm.module.css';

const NominationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    cafe_name: '',
    address: '',
    facebook_link: '',
    reason: '',
    latitude: 0,
    longitude: 0,
    user_id: ''
  });
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      user_id: getUserId()
    }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'reason') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      showToast('Please fix the form errors', 'error');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await submitNomination(formData);
      
      if (response.success) {
        showToast('Nomination submitted successfully! Thank you for contributing to our community.', 'success');
        
        // Reset form
        setFormData({
          cafe_name: '',
          address: '',
          facebook_link: '',
          reason: '',
          latitude: 0,
          longitude: 0,
          user_id: getUserId()
        });
        setCharCount(0);
      } else {
        showToast('Error submitting nomination. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      showToast('Error submitting nomination. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.nominationForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="cafe_name" className={styles.formLabel}>Café Name *</label>
            <input
              type="text"
              id="cafe_name"
              name="cafe_name"
              className={styles.formInput}
              placeholder="e.g., Brew & Beans Coffee"
              value={formData.cafe_name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.formLabel}>Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              className={styles.formInput}
              placeholder="Start typing the address..."
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <p className={styles.formHelpText}>
              Use Google Places autocomplete for accurate location
            </p>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="facebook_link" className={styles.formLabel}>Facebook Page (Optional)</label>
          <input
            type="url"
            id="facebook_link"
            name="facebook_link"
            className={styles.formInput}
            placeholder="https://facebook.com/your-cafe-page"
            value={formData.facebook_link}
            onChange={handleInputChange}
            pattern="https://facebook\.com/.*"
          />
          <p className={styles.formHelpText}>
            Must start with https://facebook.com/
          </p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="reason" className={styles.formLabel}>Why do you love this café? *</label>
          <textarea
            id="reason"
            name="reason"
            className={`${styles.formInput} ${styles.formTextarea}`}
            placeholder="Tell us what makes this café special... (max 250 characters)"
            maxLength={250}
            value={formData.reason}
            onChange={handleInputChange}
            required
          />
          <div className={styles.charCounter}>
            <span>Share what makes this café unique</span>
            <span>{charCount} / 250</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="photo" className={styles.formLabel}>Café Photo (Optional)</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            className={styles.formInput}
          />
          <p className={styles.formHelpText}>
            JPG, PNG, or GIF. Max 5MB.
          </p>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : 'Submit Nomination'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NominationForm;
