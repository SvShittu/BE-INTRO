const express = require("express")
const app = express()

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
   
app.post("register",(request, response)=>{
const{name, phoneNumber, email, address, zipCode, nationality} = request.body
})