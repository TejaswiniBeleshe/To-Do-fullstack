const express = require("express");
const app = express();
const fs = require("fs");
const bodyJson = require("body-parser")
const cors = require("cors");
const json = require("body-parser/lib/types/json");
const port = 8082;
const validateData = require('./validate/userData.validations.js')
app.use(bodyJson.json());
app.use(cors())



// get all todos
app.get('/todos',(req,res)=>{
    fs.readFile('data.json','utf8',(err,data)=>{
        if(err) return res.status(401).send('Unble to read file')
        res.send(JSON.parse(data))
    })
})

// Retrive a specific todo item by ID
app.get('/todos/:itemId',(req,res)=>{
    let ipId = req.params.itemId;
    console.log(ipId)
    fs.readFile('data.json','utf8',(err,data)=>{
        if(err) return res.status(401).send('Unable to read file');
        let resData = JSON.parse(data);
        let foundData = resData.find((ele)=>ele.id === parseInt(ipId))
        if(!foundData){
           return res.status(401).send('Data at give id not found')
        }
        res.send(foundData)
    })

})


// Create a new todo item
app.post('/todos',(req,res)=>{
    fs.readFile('data.json','utf8',(err,data)=>{
        if(err){
            return res.status(500).send('can not read the file')
        }
        let fileData = JSON.parse(data);
       
        let validated= validateData.validate(req.body);
        if(validated.error){
            return res.status(401).send(validated.error.details[0].message)
        }
        // console.log(title,description)
        // if(!title || !description){
        //     return res.status(404).send('Provide required data')
        // }
        // if(title && !isNaN(title)){
        //    return res.status(401).send('Provide valid data')
        // }
        // if(description && !isNaN(description)){
        //     res.status(401).send('Provide valid data')
        // }
     
        fileData.push({"id":Math.floor(Math.random()*10000),...validated.value}) 
        fs.writeFile('data.json',JSON.stringify(fileData),(err)=>{
            if(err) return res.send("failed");
            res.send({message:'Data has stored!',data:fileData})
        })
    })
})


// Update an existing todo item by ID
app.put('/todos/:itemsId',(req,res)=>{
    fs.readFile('data.json','utf8',(err,data)=>{
        if(err) return res.status(401).send('Data not found')
        let fileData = JSON.parse(data);
        let newData = req.body;
        let {itemsId} = req.params;
        console.log(newData,"ip data is")
        let modifyData = fileData.map((ele)=>{
            if(ele.id === parseInt(itemsId)){
                ele.title = newData.title;
                ele.description = newData.description;
                return ele;
            }
            return ele;
        })
        console.log(modifyData)
        fs.writeFile('data.json',JSON.stringify(modifyData),(err)=>{
            if(err) return res.status(401).send('failed to put');
            res.send({message:"Data has edited!","data":modifyData})

        })
    })
})






// Delete a todod item by ID
app.delete('/todos/:itemId',(req,res)=>{
    fs.readFile('data.json','utf8',(err,data)=>{
        if(err) return res.status(401).sned('Not able to read data');
        let fileData = JSON.parse(data);
        let {itemId} = req.params;
        if(!itemId){
            return res.status(404).status('please give item id')  
        }
        let filteredData  = fileData.filter((ele)=>ele.id !== parseInt(itemId));
        fs.writeFile('data.json',JSON.stringify(filteredData),(err)=>{
            if(err) return res.status(401).send(err)
            res.send({message:'Sucessfully item has deleted',data:filteredData})
        })
    })
})

// start long running process

app.listen(port,()=>{
    console.log(`Server has started with port:${port}`)
})
























/* storing the data in memory by using the variable arr when we refresh or rerun the server that time we are not able to 
see the todo storing in previous */

// const express = require("express");
// const cors = require("cors");
// const bodyJson = require("body-parser");
// const app = express();
// const port = 8082;


// app.use(cors());
// app.use(bodyJson.json());

// let arr = [];


// app.get('/todos',(req,res)=>{
//     res.send({"data":arr})
// })
// // add new todo

// app.post('/todos',(req,res)=>{
//     let userTodo = req.body;
//     let {title,description} = userTodo;
//     console.log(userTodo);
//     if(userTodo && title && description){
//         let n = Math.floor(Math.random() * 10000)
//         arr.push({
//             "id":n,
//             "title":title,
//             "description":description
//         })
//         console.log(arr)
//         res.status(200).send({message:"New todo added"})
//     }else{
//         res.status(401).send({message:"todo not found or incorrect todo"})
//     }
// })


// // find todo based on id

// const findTodo = (id,arr)=>{
//     let res = arr.find((todo)=>todo.id === id);
//     return res;
// }
// app.get('/todos/:id',(req,res)=>{
//     let inputId = req.params.id
//     let resTodo = findTodo(inputId,arr);
//     if(resTodo){
//         res.status(200).send(resTodo)
//     }else{
//         res.status(401).send({message:"Todo not found"})
//     }
// })

// // Delete speacific todo
// const findIndex =(id,arr)=>{
//     console.log(arr)
//     for(let i=0;i<arr.length;i++){
//         if(arr[i].id === Number(id)){
//             return i;
//         }
//     }
//     return -1;
// }
// const removeTodo = (idx,arr)=>{
//     let resArr = [];
//     for(let i=0;i<arr.length;i++){
//         if(idx !== i) resArr.push(arr[i])
//     }
//     return resArr;

// }

// app.delete('/todos/:id',(req,res)=>{
//     let inputId = req.params.id;
//     console.log(inputId)
//     let idx = findIndex(inputId,arr);
    
//     if(idx !== -1){
//         let result= removeTodo(idx,arr);
//         arr = result;
//         res.send(arr)
//     }
//     res.status(401).status('Todo not found please')
// })


// app.listen(port,()=>{
//     console.log(`Server has started with port:${port}`)
// })