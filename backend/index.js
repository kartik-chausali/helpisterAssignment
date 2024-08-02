const bodyParser = require('body-parser');
const express = require('express')
const app = express();
app.use(bodyParser.json())
const PORT = 3000;
const fs = require('fs')
const cors = require('cors')
app.use(cors());

function getTodo(){
    const todos = fs.readFileSync('todos.json');
    return JSON.parse(todos);
}

function writeTodo(todo){
    fs.writeFileSync('todos.json', JSON.stringify(todo, null , 2));
}


app.get('/todos', (req, res)=>{
    try{
         const todos = getTodo();
        res.json(todos);
    }catch(e){
        res.status(401);
        res.json("Something went wrong , try again");
    }
   
})

app.post('/todos', (req, res)=>{
    try{

        const todos = getTodo();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var time = today.toLocaleString('en-US', { hour: 'numeric', hour12: true })
        today = time +" "+ mm + '/' + dd + '/' + yyyy;
        const newTodo = {
            id: todos.length ? todos[todos.length - 1].id+1 : 1,
            title: req.body.title,
            description:req.body.description,
            completed:false,
            lastModified: today
        }
        todos.push(newTodo);
        writeTodo(todos);
        res.status(200).json(newTodo);

    }catch(e){
        res.status(401);
        res.json("Something went wrong , try again");
    }
})

app.put('/todos/:id', (req,res)=>{
    const todos = getTodo();
    const id = parseInt(req.params.id);
    const idx = todos.findIndex(todo => todo.id === id);
    if(idx >=0){
        todos[idx] = {...todos[idx], ...req.body};
        writeTodo(todos);
        res.json(todos[idx]);
    }else{
        res.status(411).json("Todo not found");
    }
})

app.delete('/todos/:id', (req, res)=>{
    console.log("inside deletre")
    const todos = getTodo();
    const id = parseInt(req.params.id);
    console.log(id, typeof(id));
    const newTodos = todos.filter(todo => todo.id !== id);
    console.log(newTodos)
    if(newTodos.length !== todos.length){
        writeTodo(newTodos);
        res.status(200).json("Todo deleted");
    }else{
        res.status(404).json("Todo not found");
    }
})

app.listen(PORT, ()=> console.log(`server started at port ${PORT}`));