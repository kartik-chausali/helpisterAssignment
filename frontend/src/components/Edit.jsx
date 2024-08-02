import { useLocation, useNavigate, useParams } from "react-router-dom"
import {useEffect, useRef} from 'react'
import axios from "axios";
import { BACKEND_URL } from "../App";
export default function Edit({onUpdate}){
    const {id} = useParams();
    const {state} = useLocation();
    const navigate = useNavigate();
    const titleRef = useRef('');
    const descRef = useRef('');

    useEffect(()=>{
        if(!state){
           navigate(-1) 
        }
        
    }, [state, navigate])

    return <div className="flex justify-center items-center min-h-screen">
    <div className=" max-w-sm rounded overflow-hidden shadow-lg w-1/2 ">
    <div className="px-6 py-4">
      <input className="font-bold text-xl mb-2 border rounded-lg" ref={titleRef} defaultValue={state.title}/>
      <input className="text-gray-700 text-base border rounded-lg w-full" ref={descRef} defaultValue={state.description}/>
    </div>
    <div className="px-6 pt-4 pb-2">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Last Modified: {state.lastModified}</span>
    </div>
    <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={async()=>{
       try{ 
        const res = await axios.put(`${BACKEND_URL}/todos/${id}`, {
            title:titleRef.current.value,
            description:descRef.current.value,
        });
        console.log("logging updated ", res.data);
        onUpdate(res.data);
        navigate('/');
    }catch(error){
        console.log("Error while updating todo", error);
    }
    }}>Done</button>
  </div>
  </div>
}