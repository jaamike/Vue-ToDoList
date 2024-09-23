<template>
    <transition name="fade">
      <div v-if="visible" class="message-popup" :class="messageType">
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      message: {
        type: String,
        default: '',
      },
      messageType: {
        type: String,
        default: 'error', // Can be 'error' or 'success'
      },
    },
  };
  </script>
  
  <style scoped>
  .message-popup {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 4px;
    font-size: 1rem;
    z-index: 1000;
    color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.3s ease-out forwards;
  }
  
  .message-popup.error {
    background-color: #f44336; /* Red for error */
  }
  
  .message-popup.success {
    background-color: #4caf50; /* Green for success */
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
  