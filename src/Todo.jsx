import React, { useEffect, useState } from "react";

const Todo = ({ele,setList})=>{
    const [ipBehave,setIpBehave] = useState(true);
    const [todoT,setTodoT] = useState(ele.title);
    const [todoD,setTodoD] = useState(ele.description);
    const [btnText,setBtnText] = useState('');
    const [state,setState] = useState('')
    const handleBtn = (id)=>{
        setIpBehave(prev=>!prev);
        setState(id)
        if(!ipBehave){
            setBtnText('Save')
        }else{
            setBtnText('Edit')
        }
    }
    const putData = async(d)=>{
        console.log(d);
        console.log(btnText)
        try{
        let respo = await fetch(`http://localhost:8082/todos/${state}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(d)
        });
        let data = await respo.json();
        setList(data.data)
        console.log(data.message)
    }
       catch(err){
        console.log(err)
       }
    }
    
    const handleDelete = async(itemId)=>{
        try{
            let respo = await fetch(`http://localhost:8082/todos/${itemId}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                }
            });
            let data = await respo.json();
            console.log(data.data)
            setList(data.data);

        }catch(err){
            console.log(err);

        }
    }

    useEffect(()=>{
        if(btnText === 'Save'){
            putData({title:todoT,description:todoD});  
            // setNum(Math.floor(Math.random()*1000))
        }
    },[btnText])
    return(
        <div style={{margin:".5rem"}}>
            <input type="text" value={todoT} onChange={(e)=>setTodoT(e.target.value)}  readOnly={ipBehave}/>
            <button onClick={()=>handleDelete(ele.id)}>Delete</button>
            <button onClick={()=>handleBtn(ele.id)} >{!ipBehave?"Save":"Edit"}</button><br/>
            <input type="text" value={todoD} onChange={(e)=>setTodoD(e.target.value)}  readOnly={ipBehave}/>
        </div>
    )
}
export default Todo;