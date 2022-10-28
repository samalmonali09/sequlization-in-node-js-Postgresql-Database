const { Client }= require('pg');
const bodyParser = require('body-parser');
const { text } = require('body-parser');
const express = require('express')
const port = 7000
var fs = require("fs");
const convert = require('xml-js');
const console = require('console');

const app = express()

const client=require('./database');



const client = new Client({
   
        user: "postgres",   
        host: "localhost",
        database: "LTM",
        password: "postgres",
        port: "5432"
      })

 client.connect();



app.post("/add",async (req ,res)=>{
    try{
        const newdata=await client.query('INSERT INTO  public."Ltm_data_decode_rule" (Feldnamed,start_pos,end_pos,total_length) VALUES (DATEI,1,5 ,5)');  
        res.send(req.body)
        console.log("insert sucessfully");
    }catch(err){
        console.log(err.message);
    }
}) ;



app.get("/todos",async (req ,res)=>{
    try{
        const alltodo=await client.query('select * from "Ltm_data_decode_rule" ');
        res.json(alltodo.rows);
    }catch(err){
        console.log(err.message);
    }
}) ;







app.get('/read-xml2', (req, res) => {
    
        const data = fs.readFileSync('test.xml', { encoding: 'utf8', flag: 'r' });

        console.log(data);
      
 
})




 module.exports=client;

app.get('/', (req, res ) => {
    res.send('Hello World!')
})
      
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


