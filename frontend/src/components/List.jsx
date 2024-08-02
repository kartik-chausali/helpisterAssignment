import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export function List({title, description, completed, id, deleteTodo,lastModified }){
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(false);
    const [butnText, setBtnText] = useState('Show More >')
    const[done, setDone] = useState(false);
    const[doneTxt, setDoneTxt] = useState('Done');
    return  <div>
    <div className="flex mb-4 items-center border-b justify-between">
       <div>
       
        <p className={done ? "line-through" : "w-full text-grey-darkest font-bold text-xl"}>{title}</p>
       

        <div className={showMore ? "font-semibold" :"hidden"}>
            {description}
            <div className=" text-red-300">
                Last Modified: {lastModified}
            </div>
        </div>
       
        <button className="border border-r-indigo-600 mb-2" onClick={()=>{
           setShowMore(!showMore)
           {butnText == 'Show More >' ? setBtnText("Show Less ") : setBtnText("Show More >")}
        }}>{butnText}</button>
       </div>
        
       <button onClick={()=>{
        navigate(`/edit/${id}`, {state:{title, description, completed, id, lastModified}})
       }}>Edit</button>
        <div className="">
        <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green" onClick={()=>{
            setDone(!done);
            {doneTxt == 'Done' ? setDoneTxt('Not Done') : setDoneTxt('Done')};
        }}>{doneTxt}</button>
        <button onClick={()=> deleteTodo(id)} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
        </div>
       
        
    </div>
    </div>
}