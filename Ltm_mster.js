const { Client }= require('pg');
const express = require('express')
// const port = 3000
var fs = require("fs");
const convert = require('xml-js');
const console = require('console');
const format = require('pg-format');
const { response } = require('express');


const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
//const pool = require("./db");
let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}
const app = express()

const port = process.env.PORT || 3000;


const client = new Client({
   
        user: "postgres",   
        host: "localhost",
        database: "ltmdb",
        password: "postgres",
        port: "5432"
      })

 client.connect();



 

 var queryString = fs.readFileSync('queryString.sql').toString();

var lt_master= fs.readFileSync('lt_master.sql').toString();



 
//ROUTES//
//create a Ltm data

app.post("/add",async (req ,res)=>{
    try{
        const newdata=await client.query(queryString)
        res.send(newdata)
        console.log("insert sucessfully");
        
    }catch(err){
        console.log(err.message);
    }
}) ;


 app.post("/master", async(req,res)=>{
   try{
    const newdata=await client.query(lt_master)
    res.send(newdata)
    console.log("insert sucessfully");
    
}catch(err){
    console.log(err.message);
}

 })


 app.post('/testfile', (req, res) => {
  // res.send('Hello World!')

  const data = fs.readFileSync('./master.txt', { encoding: 'utf8', flag: 'r' });
  console.log(data);
   console.log(data.split("\n").length);

  if (data.length) {
 //let mm=0;
    let sqlQuery = 'INSERT INTO public.ltm_master_data1 ( lt_nr, ben, t_gew, bem,abrech_klasse, klasse,rfid_kz) VALUES ';
    data.split("\n").forEach((element, ind) => {
        // if (mm < 10) {
            //mm++;
           // console.log(data.substring(1, 9))
           element= "  "+element;

            const tableData = {
                'lt_nr': element.substring(1, 9),
                'ben': element.substring(18, 12),
                't_gew': element.substring(340, 348),
                'bem': element.substring(660, 820),
                'abrech_klasse': element.substring(831, 832),
                'klasse': element.substring(845, 846),
                'rfid_kz': data.substring(897, 900),
                
            };
            if (ind) sqlQuery += ',';
            let dataStr = `('${tableData.lt_nr}', '${tableData.ben}', '${tableData.t_gew}', '${tableData.bem}', '${tableData.abrech_klasse}', '${tableData.klasse}','${tableData.rfid_kz}')`;
            sqlQuery += dataStr;

            // const databasefile= client.query(sqlQuery);
            // console(databasefile);
            // res.send(databasefile);
            console.log(dataStr);

            
    
        // }
    });

            client.query(sqlQuery, (err, result) => {
                if (result.rowCount > 0) {
                  console.log("# of records inserted:", result.rowCount);
                  res.send(result)
                } else {
                  console.log("No records were inserted.");
                  res.send(err);
                }
            });
     // res.send(dataEl);
  }
})







//get all Ltm file

app.get("/fetch",async (req ,res)=>{
    try{
        const alltodo=await client.query('SELECT * FROM public.ltm_data_decode_rule ORDER BY decode_feld_id ASC');
        res.json(alltodo.rows);
    }catch(err){
        console.log(err.message);
    }
}) ;


//delete a ltm

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await client.query("DELETE FROM ltm_data_decode_rule WHERE decode_feld_id = $1", [
      id,
    ]);
    res.json("LTM was deleted sucessfully");
  } catch (err) {
    console.error(err.message);
  }
});








 module.exports=client;

app.get('/', (req, res ) => {
    res.send('Hello World!')
})
      
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


