const express =require("express");
const app=express();
// const pool= require("./db");


app.use(express.json());

// Routes 

app.get("/todos", async (req, res)=> {


  try{
    const allTodos=await pool.query("SELECT * FROM  pltfile");


    res.json(allTodos.rows);
  } catch(err) {
    console.log(err.message);


  }
});





const {Pool,Client} =require('pg');



app.listen(3000,()=>{
const pool= new Pool({

  user: "postgres",   
        host: "localhost",
        database: "merceedes",
        password: "postgres",
        port: "5432"

})

pool.query('SELECT * from "PLT" ' ,(err,res)=>{
  console.log(err,res)
  pool.end()
})
  console.log('Server is listening  on port 3000')


})