// TodoList.js

import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from "react-icons/bs";

const TodoList = ({ todos, handleDelete, handleComplete, handleEdit, currentEdit, setCurrentEdit, currentEditedItem, handleUpdatedTitle, handleUpdatedDescription, handleUpdatedToDo }) => {
  return (
    <div>
        {/* Map through the todos and render each one  */}
      {todos.map((temp, index) => (
        <div key={index} className={currentEdit === index ? "edit" : "list"}>
             {/* If the current todo is being edited, display input fields for updating */}
          {currentEdit === index ? (
            <>
              <input placeholder="updated Title" onChange={(e) => handleUpdatedTitle(e.target.value)} value={currentEditedItem.title} />
              <textarea placeholder='update Description' rows={4} onChange={(e) => handleUpdatedDescription(e.target.value)} value={currentEditedItem.description} />
              <div className='todo-input-item'>
                <button type='button' className='btn' onClick={handleUpdatedToDo}>Update</button>
              </div>
            </>
          ) : (
            
            <>
              {/* Otherwise, display the todo information */}
              <div>
                <h3>{temp.title}</h3>
                <p>{temp.description}</p>
              </div>
              <div>
                <AiOutlineDelete className='icon' onClick={() => handleDelete(index)} title='Delete?' />
                <BsCheckLg className='check-icon' onClick={() => handleComplete(index)} />
                <AiOutlineEdit className='check-icon' onClick={() => handleEdit(index, temp)} />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
