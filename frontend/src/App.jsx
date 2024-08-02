import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Todo } from './components/Todo'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Edit from './components/Edit'
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [loading , setLoading] = useState(true);
  
  
  
  async function getTodo(){
    try{
      
      const res = await axios.get(`${BACKEND_URL}/todos`);
      
         setTodos(res.data);
         setLoading(false);
     
    }catch(e){
      console.log("error opccur")
    }
    
 }

  useEffect(()=>{
    setTimeout(()=>{
       getTodo();
    },5000)
   
  },[])

  async function deleteTodo(id){
    try {
        await axios.delete(`${BACKEND_URL}/todos/${id}`);
        setTodos(todos.filter(todo => todo.id !== id));
        console.log("called deleted");
    } catch (error) {
        console.error('There was an error deleting the todo!', error);
    }
    }


   function handleChange(newData){
    console.log("loggin in main comp", newData)
    setTodos([...todos, newData])
   }

   function handleUpdate(updatedTodo){
    setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
   }
 
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={ <Todo todos = {todos} loading={loading} onDelete = {deleteTodo} onDataChange = {handleChange}/>}/>
      <Route path='/edit/:id' element={<Edit onUpdate = {handleUpdate}/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
