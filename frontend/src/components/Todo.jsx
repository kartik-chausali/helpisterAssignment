import { useContext, useRef } from "react";
import { List } from "./List";
import axios from "axios";
import { Search } from "./SearchBar";
import { BACKEND_URL } from "../App";
import { Skeleton } from "./Skeleton";

export function Todo({todos, loading, onDelete, onDataChange }){
    const titleRef = useRef('');
    const descRef = useRef('');
    

   return ( loading ? <div className="h-screen flex items-center justify-center"><Skeleton/></div> : <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <div className="flex justify-between">
            <h1 className="text-grey-darkest font-extrabold text-2xl">Todo List</h1>
            <Search todos={todos}/>
          </div>
            
            <div className="flex mt-4">
                <input ref={titleRef} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Todo Tittle"/>
                <input ref={descRef} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Todo Description"/>
                <button onClick={async()=>{
                     try{
                            const res = await axios.post(`${BACKEND_URL}/todos`, {
                            title:titleRef.current.value,
                            description:descRef.current.value
                          });
                          console.log("output", res.data);
                          onDataChange(res.data);
                        }catch(error){
                          console.error('There was an error creating the todo!', error);
                        }
                }} className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal" >Add</button>
            </div>
        </div>
        
        {todos.map((todo)=><List title={todo.title} description={todo.description} completed={todo.completed} id={todo.id} deleteTodo = {onDelete} lastModified={todo.lastModified}/>)}
          	
        </div>
    </div>
   )
}