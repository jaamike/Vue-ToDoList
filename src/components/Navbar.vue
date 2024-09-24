<template>
  <nav class="navbar">
    <div class="navbar-content">
      <h2 class="username">Welcome, {{ username }}</h2>
      <!-- Use @click.native for router-link to handle the click event -->
      <router-link class="logout-link" to="/login" @click.native="userLogout">Logout</router-link>
    </div>
  </nav>
</template>

<script>
import { logout } from '@/services/authService';

export default {
  data() {
    return {
      username: '',
    };
  },
  mounted() {
    
    this.username = localStorage.getItem('username') || 'Guest';
    
  },
  methods: {
    async userLogout() {
      
      // Call the logout function
      logout();
      
      // Optionally: Clear the username and tokens
      localStorage.removeItem('username');
      
      // Redirect to the login page

    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: #00ed64; /* Green background */
  padding: 15px;
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed; /* Fix the navbar at the top */
  top: 0; /* Stick to the top */
  width: 100%; /* Full width */
  z-index: 1000; /* Ensure it stays above other content */
}

.navbar-content {
  display: flex;
  align-items: center;
}

.username {
  font-size: 1.2rem;
  margin-right: 20px;
}

.logout-link {
  color: rgb(0, 0, 0);
  text-decoration: none;
  font-weight: bold;
}

.logout-link:hover {
  text-decoration: underline;
  color: #ffffff;
}
</style>
