// Google Maps API Key
const GOOGLE_MAPS_API_KEY = 'AIzaSyBaX1OnnBTQmVC7X9ykWljIas3MzxCvK2o';

// Load Google Maps script
export const loadGoogleMapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      // Add timeout for existing script
      const timeoutId = setTimeout(() => {
        reject(new Error('Google Maps script loading timeout'));
      }, 15000);

      existingScript.addEventListener('load', () => {
        clearTimeout(timeoutId);
        resolve();
      });
      existingScript.addEventListener('error', () => {
        clearTimeout(timeoutId);
        reject(new Error('Failed to load Google Maps'));
      });
      return;
    }

    // Create and load the script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    // Add timeout
    const timeoutId = setTimeout(() => {
      reject(new Error('Google Maps script loading timeout'));
    }, 15000);
    
    script.onload = () => {
      clearTimeout(timeoutId);
      resolve();
    };
    script.onerror = () => {
      clearTimeout(timeoutId);
      reject(new Error('Failed to load Google Maps'));
    };
    
    document.head.appendChild(script);
  });
};

// Initialize Google Places Autocomplete
export const initAutocomplete = (
  input: HTMLInputElement,
  onPlaceChanged: (place: google.maps.places.PlaceResult) => void
): google.maps.places.Autocomplete => {
  const autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['establishment'],
    componentRestrictions: { country: 'ph' }
  });

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    onPlaceChanged(place);
  });

  return autocomplete;
};
