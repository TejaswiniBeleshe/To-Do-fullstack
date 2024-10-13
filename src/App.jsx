import React, { useEffect, useState } from 'react'
import Todo from './Todo';
import './App.css'

function App() {
  const[titleS,setTitle] = useState('');
  const[descripS,setDescrip] = useState('');
  const [list,setList] = useState([]);
  const [num,setNum] = useState('')

  const addToDo = async(e)=>{
    e.preventDefault();
    try{
      const respo = await fetch("http://localhost:8082/todos",{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({title:titleS,description:descripS})
      })
      const result = await respo.json();
      console.log(result.message,result.data)
      setList(result.data)
    }catch(err){
      console.log(err)
    }
    finally{
      setDescrip(''),setTitle('')
    }
  }

  const getData = async()=>{
    try{
      let respo = await fetch('http://localhost:8082/todos');
      let data = await respo.json();
      setList(data)
    }catch(err){
       console.log(err)
    }
  }


  useEffect(()=>{
    getData();   
  },[])



  return(
    <>
      <h1>TO-DO USING Node.js</h1>
      <form onSubmit={addToDo}>
        <input placeholder='title' value={titleS} onChange={(e)=>setTitle(e.target.value)}/>
        <input placeholder='description' value={descripS} onChange={(e)=>setDescrip(e.target.value)}/>
        <br/>
        <button type='submit'>Add</button>
      </form>
      <div style={{margin:"4rem",padding:".5rem"}}>
        {
          list && list.map((ele)=>{
            return <Todo ele={ele} key={ele.id} setList={setList}/>
          })
          
        }
      </div>
    </>
  )
  

}

export default App








// const fetchData = async()=>{
//   try{
//     // let data = await fetch('http://localhost:8082/todos/',{
//     //   method:"POST",
//     //   headers:{'Content-type':"application/json"},
//     //   body:JSON.stringify({name:"Tejaswini",age:18})
//     // })
//     // let res = await data.text();
//     let data = await axios.post("http://localhost:8082/todos",{name:"Tejaswini"})
//     console.log('data has sent',data)
//   }
//   catch(err){
//     console.log('error found')
//   }
// }