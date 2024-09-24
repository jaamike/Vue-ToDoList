<template>
  <div class="todo-container">
    <Navbar />
    <div class="task-section">
      <h2>To-Do List</h2>
      <div class="add-todo">
        <input
          v-model="newTask"
          @keyup.enter="addTask"
          placeholder="Enter To Add New task"
          class="task-input"
        />
      </div>
      <ul>
        <li
          v-for="(task, index) in tasks"
          :key="index"
          :class="{ completed: task.status === 'Completed' }"
        >
          <label class="checkbox-container">
            <input
              type="checkbox"
              :checked="task.status === 'Completed'"
              @change="toggleStatus(task._id, index, $event)"
              aria-label="Toggle task status"
            />
            <span class="checkmark"></span>
          </label>
          <span>{{ task.title }}</span>
          <button @click="removeTask(task._id, index)" class="remove-btn" aria-label="Remove task">
            <i class="mdi mdi-trash-can"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import apiClient from '@/services/authService.js';

export default {
  components: { Navbar },
  data() {
    return { newTask: '', tasks: [] };
  },
  mounted() {
    this.getTodos();
  },
  methods: {
    async getTodos() {
      try {
        const response = await apiClient.get('/api/todo/getTodos');
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async toggleStatus(taskId, index, event) {
      const newStatus = event.target.checked ? 'Completed' : 'Not Started';
      try {
        const response = await apiClient.patch(`/api/todo/updatetodo/${taskId}`, { status: newStatus });
        this.tasks[index] = response.data;
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    },
    async removeTask(taskId, index) {
      try {
        await apiClient.delete(`/api/todo/deletetodo/${taskId}`);
        this.tasks.splice(index, 1);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
    async addTask() {
      if (this.newTask.trim()) {
        try {
          const response = await apiClient.post('/api/todo/createTodo', { title: this.newTask });
          this.tasks.push(response.data);
          this.newTask = '';
        } catch (error) {
          console.error('Error adding task:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
.todo-container {
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1a;
  min-height: 100vh;
}

.task-section {
  margin-top: 20px;
  width: 100%; /* Full width for minimalism */
  max-width: 600px; /* Set a max width for better readability */
}

.add-todo {
  margin-bottom: 10px; /* Reduced margin */
}

.task-input {
  padding: 8px; /* Reduced padding */
  border: 1px solid #00ed64;
  border-radius: 4px; /* Slightly smaller border radius */
  width: 100%; /* Full width */
  color: white;
  background-color: #333;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-container input {
  display: none; /* Hide the default checkbox */
}

.checkmark {
  width: 16px; /* Smaller checkmark */
  height: 16px;
  background-color: #555;
  border-radius: 3px;
  border: 2px solid #00ed64;
  margin-right: 8px; /* Reduced margin */
}

.checkbox-container input:checked + .checkmark {
  background-color: #00ed64;
}

ul {
  list-style-type: none;
  padding: 0; /* No padding */
}

li {
  background-color: #444;
  padding: 8px; /* Reduced padding */
  margin-bottom: 5px; /* Reduced margin */
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

li:hover {
  background-color: #555;
}

.completed span {
  text-decoration: line-through;
  color: gray;
}

.remove-btn {
  background-color: transparent; /* Transparent background */
  border: none;
  color: rgb(255, 255, 255); /* White color for visibility */
  cursor: pointer;
}

.mdi {
  font-size: 1rem; /* Smaller icon size */
}
</style>
