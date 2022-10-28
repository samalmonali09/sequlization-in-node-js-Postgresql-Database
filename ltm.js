const { Client }= require('pg');
const express = require('express')
var fs = require("fs");

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





 app.post('/testfile', (req, res) => {
  // res.send('Hello World!')

  const data = fs.readFileSync('./master.txt', { encoding: 'utf8', flag: 'r' });
  console.log(data);
   console.log(data.split("\n").length);

  if (data.length) {
 //let mm=0;
    let sqlQuery = 'INSERT INTO public.ltm_master_data3 ( lt_nr, ben, t_gew, bem,abrech_klasse, klasse,rfid_kz,created_timestamp,modified_timestamp) VALUES ';
    data.split("\n").forEach((element, ind) => {
        // if (mm < 10) {
            //mm++;
           // console.log(data.substring(1, 9))
           element= "  "+element;
           var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
            const tableData = {
                'lt_nr': element.substring(1, 9),
                'ben': element.substring(18, 12),
                't_gew': element.substring(340, 348),
                'bem': element.substring(660, 820),
                'abrech_klasse': element.substring(831, 832),
                'klasse': element.substring(845, 846),
                'rfid_kz': element.substring(897, 900),
                'created_timestamp':dateTime,
                'modified_timestamp':dateTime

                
            };
            if (ind) sqlQuery += ',';
            let dataStr = `('${tableData.lt_nr}', '${tableData.ben}', '${tableData.t_gew}', '${tableData.bem}', '${tableData.abrech_klasse}', '${tableData.klasse}','${tableData.rfid_kz}','${tableData.created_timestamp}','${tableData.modified_timestamp}')`;
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


