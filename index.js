const express = require("express")
const app = express()
//Middleware
app.use(express.json())
const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log(`server started running on ${PORT}`)
})  

//CRUD /Authentication
//create data on the database(post request)
// read data from the database(get request)
// update(put/patch request)
// delete(delete request)
app.get("/",(request, response)=>{
   response.json("Welcome to Access bank server") 
})

const users = [
{
    firstName:"Sarah",
    lastName:"Shittu"
},
{
    firstName:"Sarah",
    lastName:"Shittu"
},
{
    firstName:"Sarah",
    lastName:"Shittu"
},
]
app.get("/users", (request, response)=>{
   response.json(users) 
})
   
app.post("/students", (request, response) =>{
    const {email, password} = request.body 

    response.json(email)
}) 

app.put("/eze", (request, response) => {
    const {name,  state, age} =request.body
    if(!name){
     return response.json({message:"please add your name"})
    } 
     return response.json({message:"Successful", name})
})

app.post("/register", (request, response)=>{
    const { email, name, state, age, phoneNumber} = request.body
    if(!email){
        return response.json({message:"Please add your email"})
    }
    if(age < 18){
        return response.json({message: "Please you're underage"} )
    }
    if(!name){
        return response.json({message:"Please add your name"})

    } 

    const newUser = {email, name, state, age, phoneNumber}
   //Save to DATABASE
    return response.json({message:"Registration Successful", newUser})    
     })
    


 

 