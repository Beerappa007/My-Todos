// CompletedTodos.js

import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

const CompletedTodos = ({ completedTodos, handleDelete }) => {
  return (
    <div>
      {/* Map through the completed todos and render each one */}
      {completedTodos.map((todo, index) => (
        <div className='list' key={index}>
          <div>
            {/* Display the title, description, and completion date of the todo */}
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Completed on: {todo.completedon}</p>
          </div>
          <div>
            {/* Allow the user to delete the completed todo */}
            <AiOutlineDelete className='icon' onClick={() => handleDelete(index)} title='Delete?' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedTodos;
