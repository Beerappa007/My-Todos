import { createStore } from 'redux';
import reducer from './reducers'; // Import the reducer from reducers.js

// Create the Redux store using createStore function
const store = createStore(reducer);

export default store; // Export the created store
