// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { BsCheckLg } from "react-icons/bs";
import './App.css';

function App() {
  const [isfull, setIsfull] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [NewDescription, setNewDescritpion] = useState("");
  const [completed, setCompletedTodos] = useState([])
  const [currentEdit,setCurrentEdit]=useState("")
  const [currentEditedItem,setCurrentEditedItem]=useState("");
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: NewDescription
    }
    let updatedTodoarr = [...allTodos];
    updatedTodoarr.push(newTodoItem);
    setTodos(updatedTodoarr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoarr))
  }
  const handleDeletetodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo)
  }
  const handleCompleteTodo = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedon = dd + '-' + mm + '-' + yyy  +  'at'  + h + ':' + m + ':' + s;
    let filteredItem = {
      ...allTodos[index],
      completedon: completedon
    }
    let updatedCompletedArr = [...completed];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeletetodo(index);
    localStorage.setItem('CompletedTodos', JSON.stringify(updatedCompletedArr))
  }
  const handleDeletCompletedtodo=(index)=>{
    let reducedTodo = [...completed];
    reducedTodo.splice(index,1);
    localStorage.setItem('CompletedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo)
  }
  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem('todolist'))
    let savedCompleted = JSON.parse(localStorage.getItem('CompletedTodos'))
    if (saved) {
      setTodos(saved);
    }
    if(savedCompleted){
      setCompletedTodos(savedCompleted)
    }
  }, [])
  const handleEdit=(index,temp)=>{
    setCurrentEdit(index)
    setCurrentEditedItem(temp)
  }
const handleUpdatedTitle=(value)=>{
setCurrentEditedItem((prev)=>{
  return{...prev,title: value}
})
}
const handleUpdatedDescription=(value)=>{
  setCurrentEditedItem((prev)=>{
    return{...prev,description: value}
  })

}
const handleUpdatedToDo=()=>{
let newTodo=[...allTodos];
newTodo[currentEdit]=currentEditedItem;
setTodos(newTodo);
setCurrentEdit("");
}
  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className='todo-list'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='Whats the task title' />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={NewDescription} onChange={(e) => setNewDescritpion(e.target.value)} placeholder='Whats the task Descripton?' />
          </div>
          <div className='todo-input-item'>
            <button type='button' className='btn' onClick={handleAddTodo}>Add</button>
          </div>
        </div>
        <div className='btn-area'>
          <button className={`secondaryBtn ${isfull === false && 'active'}`} onClick={() => setIsfull(false)}>Todo</button>
          <button className={`secondaryBtn ${isfull === true && 'active'}`} onClick={() => setIsfull(true)}>Completed</button>
        </div>
        <div className='tolist'>
          {isfull === false && allTodos.map((temp, index) => {
            if(currentEdit===index){
               return(
                 <div className="edit" key={index}>
                  <input placeholder="updated Title" onChange={(e)=>handleUpdatedTitle(e.target.value)} value={currentEditedItem.title}/>
                  <textarea placeholder='update Description'rows={4} onChange={(e)=>handleUpdatedDescription(e.target.value)} value={currentEditedItem.description}/>
                  <div className='todo-input-item'>
            <button type='button' className='btn' onClick={handleUpdatedToDo}>Update</button>
          </div>
                  </div>
               )

            }else{
              return (
                <div className='list' key={index}>
                  <div>
                    <h3>{temp.title}</h3>
                    <p>{temp.description}</p>
                  </div>
  
                  <div>
                    <AiOutlineDelete className='icon' onClick={() => handleDeletetodo(index)} title='Delete?' />
                    <BsCheckLg className='check-icon' onClick={() => handleCompleteTodo(index)} />
                    <AiOutlineEdit className='check-icon' onClick={() => handleEdit(index,temp)}  />
  
                  </div>
  
                </div>
              );
            }
          })}

          {isfull === true && completed.map((temp, index) => {
            return (
              <div className='list' key={index}>
                <div>
                  <h3>{temp.title}</h3>
                  <p>{temp.description}</p>
                  {/* <p><samll>Completed on:{temp.completedon}</samll></p> */}
                  <p>Completed on:{temp.completedon}</p>
                </div>

                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleDeletCompletedtodo(index)} title='Delete?' />
                  {/* <BsCheckLg className='check-icon' onClick={() => handleCompleteTodo(index)} /> */}

                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
