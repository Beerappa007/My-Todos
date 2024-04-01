// Define action types
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const DELETE_COMPLETED_TODO = 'DELETE_COMPLETED_TODO';

// Action creator to add a new todo
export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo // Payload contains the new todo object
});

// Action creator to delete a todo
export const deleteTodo = (index) => ({
  type: DELETE_TODO,
  payload: index // Payload contains the index of the todo to be deleted
});

// Action creator to update a todo
export const updateTodo = (index, updatedTodo) => ({
  type: UPDATE_TODO,
  payload: { index, updatedTodo } // Payload contains the index of the todo and the updated todo object
});

// Action creator to mark a todo as completed
export const completeTodo = (todo) => ({
  type: COMPLETE_TODO,
  payload: todo // Payload contains the completed todo object
});

// Action creator to delete a completed todo
export const deleteCompletedTodo = (index) => ({
  type: DELETE_COMPLETED_TODO,
  payload: index // Payload contains the index of the completed todo to be deleted
});
