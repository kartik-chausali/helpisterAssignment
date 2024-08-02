import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
export function Search({todos}){

    const [searchedTodo, setSearchedTodo] = useState('');
    const [debouncedSearchedTodo, setDebouncedSearchTodo] = useState('');
    const navigate  = useNavigate();
    //debouncing 
    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebouncedSearchTodo(searchedTodo)
        }, 500)

        return ()=>{
            clearTimeout(handler);
        }
    },[searchedTodo])

    function handleChange(event){
        setSearchedTodo(event.target.value);
    }
    
    console.log("logging searchedTod", searchedTodo);
    const filteredTodos= todos.filter((todo) => todo.title.toLowerCase().includes(debouncedSearchedTodo.toLowerCase()));
    console.log("logging filteredTodos", filteredTodos);
    return <div className='max-w-md mx-auto'>
    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <input
        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        id="search"
        placeholder="Search a todo.."
        onChange={handleChange} /> 
    </div>
    <div className="mt-4">
    {debouncedSearchedTodo && filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <div key={todo.id} className="border-b py-2" onClick={()=>{
                navigate(`/edit/${todo.id}`, {state:{title:todo.title, description:todo.description}});
            }}>
              <h3 className="font-bold text-lg">{todo.title}</h3>
              <p className="text-gray-700">{todo.description}</p>
            </div>
          ))
        ) : (
          debouncedSearchedTodo && <p className="text-gray-700">No todos found.</p>
        )}
      </div>
</div>
}