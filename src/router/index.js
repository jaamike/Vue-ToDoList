import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../components/Register.vue';
import TodoList from '@/components/TodoList.vue';
import { logout } from '../services/authService'; 

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/todolist', component: TodoList },
  { path: '/', redirect: '/login' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); 
  const isPublicRoute = to.path === '/login' || to.path === '/register';

  if (!isAuthenticated && !isPublicRoute) {
    // If not authenticated and trying to access a protected route, redirect to login
    next({ path: '/login' });
  } else {
    // Proceed to the requested route
    next();
  }
});

// Handle token expiration
router.afterEach((to, from) => {
  if (!localStorage.getItem('accessToken') && to.path !== '/login') {
    logout(); // Log the user out if the access token is missing
  }
});

export default router;
