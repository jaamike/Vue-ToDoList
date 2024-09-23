<template>
HelloWorld
</template>

<script>
import { login } from '@/services/authService';

export default {
  components: {

  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      loading: false,
      showMessage: false,
      message: '',
      messageType: 'error', // Default to 'error'
    };
  },
  methods: {
    async handlelogin() {
      this.loading = true;
      this.showMessage = false;

      try {
        const result = await login(this.name, this.email, this.password);
        this.message = result.msg;
        this.messageType = 'success';
        this.showMessage = true;

        // Redirect to login after 3 seconds
        setTimeout(() => {
          this.showMessage = false;
          this.$router.push('/login');
        }, 3000);
      } catch (error) {
        this.message = error.response?.data?.msg || 'Registration failed. Please try again.';
        this.messageType = 'error';
        this.showMessage = true;

        // Hide the error message after 3 seconds
        setTimeout(() => {
          this.showMessage = false;
        }, 3000);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Center the login container */
.login-container {
max-width: 450px;
margin: 50px auto;
padding: 40px;
border-radius: 12px;
background: #ffffff;
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
text-align: center; /* Center text inside the container */
display: flex;
flex-direction: column;
align-items: center; /* Center items horizontally */
justify-content: center; /* Center items vertically */
}

/* Center the title */
.title {
font-size: 2rem;
font-weight: bold;
margin-bottom: 30px;
color: #333;
}

/* Center the form elements */
.form {
width: 100%; /* Make form take full width of the container */
max-width: 400px; /* Optional: limit the maximum width of the form */
text-align: left; /* Align text inside the form */
}

/* Style for form groups */
.form-group {
margin-bottom: 25px;
display: flex;
flex-direction: column;
}

/* Style for labels */
label {
margin-bottom: 8px;
font-size: 0.9rem;
font-weight: 600;
color: #333;
text-align: left; /* Align label text to the left */
}

/* Style for inputs */
input {
width: 100%;
padding: 14px;
border: 1px solid #ddd;
border-radius: 8px;
font-size: 1rem;
transition: border 0.3s ease;
}

/* Input focus style */
input:focus {
border-color: #4caf50;
outline: none;
box-shadow: 0 0 5px rgba(76, 175, 80, 0.2);
}

/* Style for login button */
.login-button {
width: 100%;
padding: 14px;
background-color: #4caf50;
color: white;
border: none;
border-radius: 8px;
font-size: 1rem;
cursor: pointer;
transition: background-color 0.3s, box-shadow 0.3s;
display: flex;
align-items: center;
justify-content: center;
font-weight: bold;
}

/* Hover and disabled states for login button */
.login-button:hover {
background-color: #45a049;
box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.login-button:disabled {
background-color: #b0bec5;
}

/* Style for loading spinner */
.loading-spinner {
border: 3px solid #f3f3f3;
border-top: 3px solid #4caf50;
border-radius: 50%;
width: 18px;
height: 18px;
animation: spin 1s linear infinite;
margin-right: 8px;
}

/* Keyframes for spinner animation */
@keyframes spin {
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
}

/* Style for login link */
.login-link {
margin-top: 20px;
font-size: 0.9rem;
color: #555;
}

.login-link a {
text-decoration: none;
color: #4caf50;
font-weight: bold;
}

.login-link a:hover {
text-decoration: underline;
}

</style>
