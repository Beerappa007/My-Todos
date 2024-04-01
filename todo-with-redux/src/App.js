
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, updateTodo, completeTodo, deleteCompletedTodo } from './Redux/actions';
import CompletedTodos from './Component/CompletedTodos/CompletedTodos'; // Import the CompletedTodos component
import TodoList from './Component/TodoList/TodoList'; // Import the TodoList component
import './App.css';

function App() {
  // Redux setup
  const dispatch = useDispatch();
  const allTodos = useSelector(state => state.todos);
  const completed = useSelector(state => state.completed);

  // State variables
  const [isfull, setIsfull] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [NewDescription, setNewDescritpion] = useState("");
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  // Function to handle adding a new todo
  const handleAddTodo = () => {
    if (newTitle.trim() !== '') {
      let newTodoItem = {
        title: newTitle,
        description: NewDescription
      };
      dispatch(addTodo(newTodoItem));
      setNewTitle('');
      setNewDescritpion('');
    }
  };

  // Function to handle deleting a todo
  const handleDeletetodo = (index) => {
    dispatch(deleteTodo(index));
  };

  // Function to handle completing a todo
  const handleCompleteTodo = (index) => {
    let now = new Date();
    let completedon = now.toLocaleString();
    let filteredItem = {
      ...allTodos[index],
      completedon: completedon
    };
    dispatch(deleteTodo(index));
    dispatch(completeTodo(filteredItem));
  };

  // Function to handle deleting a completed todo
  const handleDeletCompletedtodo = (index) => {
    dispatch(deleteCompletedTodo(index));
  };

  // useEffect hook to fetch initial todos from localStorage if needed
  useEffect(() => {
    // You can fetch initial todos from localStorage if needed
  }, []);

  // Function to handle editing a todo
  const handleEdit = (index, temp) => {
    setCurrentEdit(index);
    setCurrentEditedItem(temp);
  };

  // Function to handle updating the title of a todo
  const handleUpdatedTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };

  // Function to handle updating the description of a todo
  const handleUpdatedDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value };
    });
  };

  // Function to handle updating a todo after editing
  const handleUpdatedToDo = () => {
    dispatch(updateTodo(currentEdit, currentEditedItem));
    setCurrentEdit("");
  };

  return (
    <div className="App">
      {/* Header */}
      <h1>My Todos</h1>

      {/* Todo list container */}
      <div className='todo-list'>
        {/* Input section for adding new todos */}
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' className='user-input' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='Whats the task title' required autoFocus/>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text'className='user-input' value={NewDescription} onChange={(e) => setNewDescritpion(e.target.value)} placeholder='Whats the task Descripton?' required />
          </div>
          <div className='todo-input-item'>
            <button type='button' className='btn' onClick={handleAddTodo}>Add</button>
          </div>
        </div>
        
        {/* Button area to toggle between Todo and Completed */}
        <div className='btn-area'>
          <button className={`secondaryBtn ${isfull === false && 'active'}`} onClick={() => setIsfull(false)}>Todo</button>
          <button className={`secondaryBtn ${isfull === true && 'active'}`} onClick={() => setIsfull(true)}>Completed</button>
        </div>
        
        {/* List of todos */}
        <div className='tolist'>
          {/* Render TodoList component if isfull is false */}
          {isfull === false && <TodoList 
            todos={allTodos} 
            handleDelete={handleDeletetodo} 
            handleComplete={handleCompleteTodo} 
            handleEdit={handleEdit} 
            currentEdit={currentEdit} 
            setCurrentEdit={setCurrentEdit} 
            currentEditedItem={currentEditedItem} 
            handleUpdatedTitle={handleUpdatedTitle} 
            handleUpdatedDescription={handleUpdatedDescription} 
            handleUpdatedToDo={handleUpdatedToDo} 
          />}
          {/* Render CompletedTodos component if isfull is true */}
          {isfull === true && <CompletedTodos completedTodos={completed} handleDelete={handleDeletCompletedtodo} />}
        </div>
      </div>
    </div>
  );
}

export default App;
