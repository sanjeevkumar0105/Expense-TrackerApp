const express=require('express')
const app =express()
const path=8000
const mongoose=require('mongoose')
const cors=require('cors')
const todorouter=require("./router/Expensiverouter")

mongoose.connect('mongodb://localhost:27017/Expense')
.then(()=>console.log('mongo db is connected'))
.catch(()=>console.log("mongo db is not connected"))

//middleware

app.use(express.json())
app.use(cors())

app.use('/db',todorouter)

app.listen(path,()=>console.log('the server is running'))