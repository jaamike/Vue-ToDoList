import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the access token in headers
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Function to handle login
export async function login(email, password) {
  try {
    const response = await apiClient.post('/api/auth/login', { email, password });
    const { accessToken, refreshToken } = response.data;
    
    // Store tokens in localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    // Set default Authorization header for future requests
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to handle registration
export async function register(username, email, password) {
    console.log('register', username, email, password);
    
    try {
      const response = await apiClient.post('/api/auth/register', { username, email, password });
      // Optionally handle post-registration actions (e.g., redirect to login)
      return response.data;
    } catch (error) {
      throw error;
    }
  }

// Function to handle logout
export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  apiClient.defaults.headers.common['Authorization'] = '';
}

// Function to refresh the access token
export async function refreshToken() {
  try {
    const response = await apiClient.post('/api/auth/refresh', {
      refreshToken: localStorage.getItem('refreshToken'),
    });
    const { accessToken } = response.data;
    
    // Update access token in localStorage
    localStorage.setItem('accessToken', accessToken);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    return accessToken;
  } catch (error) {
    throw error;
  }
}

// Use Axios interceptors to handle token refresh on 401 responses
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
      try {
        await refreshToken();
        error.config.__isRetryRequest = true;
        return apiClient(error.config);
      } catch (refreshError) {
        console.error('Refresh token error:', refreshError);
        // Handle logout or redirect to login page
        logout();
        // Example: this.$router.push('/login');
      }
    }
    return Promise.reject(error);
  }
);
