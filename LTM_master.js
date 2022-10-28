const port = process.env.PORT || 7000;
const sequelize = require('./connection.js')
const express = require('express');
const fs = require("fs");
const app = express();
sequelize.connect();


const bodyParser = require('body-parser');




//ROUTES//
//create a Ltm master data
app.post('/ltm_master', (req, res) => {
 try{
 const data = fs.readFileSync('./master.txt', { encoding: 'utf8', flag: 'r' });

 if (data.length) {

   let sqlQuery = 'INSERT INTO public.masterdataltm( lt_nr, ben, t_gew, bem,abrech_klasse, klasse,rfid_kz,created_timestamp,modified_timestamp) VALUES ';
   data.split("\n").forEach((element, ind) => {
   
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
   });

   sequelize.query(sqlQuery, (err, result) => {
               if (result.rowCount > 0) {
                 console.log("# of records inserted:", result.rowCount);
                 res.send(result)
               } else {
                 console.log("No records were inserted.");
                 res.send(err);
               }
           });
             }
}catch(err){
 console.log(err.message);
}
})


app.get("/master",async (req ,res)=>{
 try{
     const alltodo=await sequelize.query('Select * from masterdataltm');
     res.json(alltodo.rows);
 }catch(err){
     console.log(err.message);
 }
});


app.get("/master-tera",async (req ,res)=>{
  try{
console.log(req.headers);
    let lt_nr=req.headers.lt_nr;
    console.log(lt_nr.length);
    if (lt_nr){
      lt_nr=' '+lt_nr;
      const alltodo=await sequelize.query(`Select lt_nr, t_gew  FROM masterdataltm  WHERE lt_nr = '${lt_nr}'`);
      res.json(alltodo.rows);
    }
  }catch(err){
      console.log(err.message);
  }
 });


 app.get("/master-Snr",async (req ,res)=>{
  try{
console.log(req.headers);
    let lt_nr=req.headers.lt_nr;
    if (lt_nr){
      lt_nr=' '+lt_nr;

      const alltodo=await sequelize.query(`Select lt_nr,ben, t_gew,bem ,abrech_klasse,klasse,rfid_kz FROM masterdataltm  WHERE lt_nr = '${lt_nr}'`);
      res.json(alltodo.rows);
    }
  }catch(err){
      console.log(err.message);
  }
 });

module.exports=sequelize;

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})


