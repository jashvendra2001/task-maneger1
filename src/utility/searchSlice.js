import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  tasks: [
    {
      id: 1,
      title: 'Complete project report',
      description: 'Finish the final report for the ongoing project.',
      dueDate: '2024-08-30',
      priority: 'High',
      status: 'Pending'
    },
    {
      id: 2,
      title: 'Team meeting',
      description: 'Discuss project milestones and upcoming tasks.',
      dueDate: '2024-08-28',
      priority: 'Medium',
      status: 'In Progress'
    },
    {
      id: 3,
      title: 'Code review',
      description: 'Review code submitted by the development team.',
      dueDate: '2024-08-26',
      priority: 'Low',
      status: 'Completed'
    },
  ],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.unshift(action.payload); // Adds the new task at the start
    },
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        state.tasks[index] = updatedTask; // Update the entire task object
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { setSearchQuery, setTasks, addTask, updateTask, deleteTask } = searchSlice.actions;

export default searchSlice.reducer;
