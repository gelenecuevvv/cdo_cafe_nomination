declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
    googleMapsLoaded: boolean;
    googleMapsError: boolean;
  }
}

export {};
