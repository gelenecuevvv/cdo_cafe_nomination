import { ValidationErrors, FormData } from '../types';

// Generate a unique user ID (use numeric ID for database compatibility)
export const getUserId = (): number => {
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    // Use the demo user ID (1) that exists in the database
    userId = '1';
    localStorage.setItem('user_id', userId);
  }
  return parseInt(userId);
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Validate form data
export const validateForm = (data: Partial<FormData>): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.cafe_name || data.cafe_name.trim().length === 0) {
    errors.cafe_name = 'Café name is required';
  }

  if (!data.address || data.address.trim().length === 0) {
    errors.address = 'Address is required';
  }

  if (!data.reason || data.reason.trim().length === 0) {
    errors.reason = 'Reason for nomination is required';
  } else if (data.reason.length > 250) {
    errors.reason = 'Reason must be 250 characters or less';
  }

  if (data.facebook_link && data.facebook_link.trim() !== '') {
    const trimmedLink = data.facebook_link.trim();
    if (!trimmedLink.startsWith('https://facebook.com/') && !trimmedLink.startsWith('http://facebook.com/')) {
      errors.facebook_link = 'Facebook link must start with https://facebook.com/';
    }
  }

  return errors;
};

// Show toast notification
export const showToast = (message: string, type: 'success' | 'error' = 'success'): void => {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll('.toast');
  existingToasts.forEach(toast => toast.remove());

  // Create new toast
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
};

// Set loading state for buttons
export const setLoading = (button: HTMLButtonElement, loading: boolean): void => {
  if (loading) {
    button.disabled = true;
    button.innerHTML = '<div class="spinner"></div>';
  } else {
    button.disabled = false;
    button.innerHTML = button.getAttribute('data-original-text') || 'Submit';
  }
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Check if user is admin
export const isAdmin = (): boolean => {
  return localStorage.getItem('admin_status') === 'true';
};

// Set admin status
export const setAdminStatus = (status: boolean): void => {
  localStorage.setItem('admin_status', status.toString());
};

// Logout admin
export const logoutAdmin = (): void => {
  localStorage.removeItem('admin_status');
  window.location.reload();
};
