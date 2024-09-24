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
    config.headers['Authorization'] = `${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Login function
export async function login(email, password) {
  try {
    const response = await apiClient.post('/api/auth/login', { email, password });
    const { accessToken, refreshToken, username } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('username', username);
    apiClient.defaults.headers.common['Authorization'] = `${accessToken}`;

    return response.data;
  } catch (error) {
    throw error;
  }
}

// Register function
export async function register(username, email, password) {
  try {
    const response = await apiClient.post('/api/auth/register', { username, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Logout function
export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('username');
  apiClient.defaults.headers.common['Authorization'] = '';
}

// Refresh token function
export async function refreshToken() {
  try {
    const response = await apiClient.post('/api/auth/refresh', {
      refreshToken: localStorage.getItem('refreshToken'),
    });
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    throw error;
  }
}

// Axios response interceptor to refresh token on 401
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
        logout();
      }
    }
    return Promise.reject(error);
  }
);



export default apiClient;
