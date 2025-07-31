// Importing express
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/tasks')
dotenv.config();

// Express App
const app = express()
const PORT = process.env.PORT || 4000;

// // Middleware
app.use(express.json())
app.use((req, res, next)=> {
  console.log(req.path, req.method)
  next()
})

// Route for Home Page
app.get('/', (req, res) => {
  res.json({msg: "welcome"})
})

app.use('/api/tasks', taskRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT} & connected to DB`)
})})
.catch((error)=>{console.log(error)})

