<template>
  <div class="login-container">
    <h1 class="title">Login Your Account</h1>
    <form @submit.prevent="handleLogin" class="form">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          v-model="email" 
          type="email" 
          id="email" 
          required 
          placeholder="Enter your email address"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          v-model="password" 
          type="password" 
          id="password" 
          required 
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" class="login-button" :disabled="loading">
        <span v-if="loading" class="loading-spinner"></span>
        <span v-else >Login</span>
      </button>
    </form>
    <p class="login-link">
      Don't have an account? 
      <router-link to="/register">Register here</router-link>
    </p>
  </div>
</template>

<script>
import { login } from '@/services/authService';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async handleLogin() {
      this.loading = true;

      try {
        const result = await login(this.email, this.password);
        this.$router.push('/todolist'); // Redirect after login
      } catch (error) {
        const errorMsg = error.response?.data?.msg || 'Login failed. Please try again.';
        this.toast.error(errorMsg);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 450px;
  margin: 50px auto;
  padding: 40px;
  border-radius: 12px;
  background: var(--color-background); /* Use dark background */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: var(--color-heading); /* Use dark text color */
}

.form {
  width: 100%;
  max-width: 400px;
  text-align: left;
}

.form-group {
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text); /* Use dark text color */
  text-align: left;
}

input {
  width: 100%;
  padding: 14px;
  border: 1px solid var(--color-border); /* Use dark border */
  border-radius: 8px;
  font-size: 1rem;
  background: var(--color-background-soft); /* Slightly lighter for input */
  color: var(--color-text); /* Dark text in input */
}

input:focus {
  border-color: #00ed64;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.2);
}

.login-button {
  width: 100%;
  padding: 14px;
  background-color: #00ed64;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bolder; /* Ensure text is bold */
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hover and disabled states */
.login-button:hover {
  color: #00ed64;
  background-color: #000000; /* Darker green on hover */
}
.login-button:disabled {
  background-color: #b0bec5;
}

.loading-spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #00ed64;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.login-link {
  margin-top: 20px;
  font-size: 0.9rem;
  color: var(--color-text);
}

.login-link a {
  text-decoration: none;
  color: #00ed64;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
