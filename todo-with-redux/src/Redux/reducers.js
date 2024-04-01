import { ADD_TODO, DELETE_TODO, UPDATE_TODO, COMPLETE_TODO, DELETE_COMPLETED_TODO } from './actions';

// Initial state of the Redux store
const initialState = {
  todos: [],        // Array to store todos
  completed: []     // Array to store completed todos
};

// Reducer function to handle state updates based on actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Action to add a new todo to the todos array
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]  // Add new todo to todos array
      };
    // Action to delete a todo from the todos array
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.payload) // Remove todo at specified index
      };
    // Action to update a todo in the todos array
    case UPDATE_TODO:
      const { index, updatedTodo } = action.payload;
      const updatedTodos = [...state.todos];
      updatedTodos[index] = updatedTodo; // Update todo at specified index
      return {
        ...state,
        todos: updatedTodos // Update todos array with updated todo
      };
    // Action to move a todo from todos to completed array
    case COMPLETE_TODO:
      return {
        ...state,
        completed: [...state.completed, action.payload] // Add completed todo to completed array
      };
    // Action to delete a completed todo from the completed array
    case DELETE_COMPLETED_TODO:
      return {
        ...state,
        completed: state.completed.filter((_, index) => index !== action.payload) // Remove completed todo at specified index
      };
    // Default case: return current state if action type is not recognized
    default:
      return state;
  }
};

export default reducer;
