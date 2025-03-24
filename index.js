 const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const connectDB = require("./db")
const Students = require("./studentModel") 
dotenv.config()

const app = express()
//Middleware
app.use(express.json())
const PORT = process.env.PORT || 8000
//Connect Mongoose
// mongoose.connect(`${process.env.MONGODB_URL}`)
// .then(()=> console.log("mongoDB connected..."))
connectDB()

//Listen
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
//Register API
app.post("/rrr", (request, response)=>{
    const { email, name, state, age, phoneNumber, password, cf_password} = request.body
    if(password!== cf_password){
        return response.status(400).json({message:"Passwords do no match"})
    }

    if(!email){
        return response.status(400).json({message:"Please add your email"})
    }
    if(age < 18){
        return response.status(400).json({message: "Please you're underage"} )
    }
    if(!name){
        return response.status(400).json({message:"Please add your name"})

    } 

    const newUser = {email, name, state, age, phoneNumber}
   //Save to DATABASE
    return response.status(200).json({message:"Registration Successful", newUser})    
     })
      //Edit User API
     app.put("/edit_user", (request, response) =>{
        const{name, email, phoneNumber } = request.body
         
        if(!email){
            return response.status(400).json({message:"Please add your email"})
         }
      
          //(what a put request does)
         // Find user on the  Database with that email

     //update the old information with the new object sent to me

        const userID = Math.random() * 100
         const date = new Date()
          const newUser = {
            name,
            email,
            userID,
            phoneNumber,
            date_of_Registration: date

         }
      return response.status(200).json({
        message: "Reg Successful", user: newUser})
    })
         
        


    //  app.use((request, response) =>{
    //   response.status(404).json({message:"This endpoint does not exist yet!"})

    
    // }) 
 

    // Real CRUD
      app.post("/register", async (request, response)=>{
        const {firstName, lastName, age, email, password } = request.body
        if(!email){
            return response.status(400).json({message: "please add your email"})
        }
        const alreadyExisting = await Students.findOne({email})
        if(alreadyExisting){
            return response.status(400).json({
                message: "This user already exists"
            })
        }
        const newUser =  new Students({firstName, lastName, age, email, password })
        await newUser.save()
        return response.status(200).json({
            message:"User Registration Successful",
            user: newUser
        })
      })   

      app.get("/students", async (request, response)=>{
        const allStudents = await Students.find()
        return response.status(200).json({
            message:"Successful", 
            count: allStudents.length,
            allStudents
        })
      }) 