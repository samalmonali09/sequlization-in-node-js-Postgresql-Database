var fs = require("fs");

fs.readFile("test.xml", "utf-8", function(data, err) {
  if (err) console.log(err);
  console.log(data);
});


const { Client }= require('pg');
const bodyParser = require('body-parser');



const client = new Client({
   
        user: "postgres",
        host: "localhost",
        database: "test",
        password: "postgres",
        port: "5432"
      })

      client.connect();



      console.log('cdsdfdsf');
client.query('select * from test1."USERS"',(err, result)=>{
    console.log("come into");
    if (!err){
        console.log("result come")
        console.log("result",result.rows);
    }
    else{
        console.log("error:",err);
    }
    client.end();
    
})

(async ()=>{
  await client.connect();
  const result=await client.query('insert into "test"."user"(name,phoneno) values($1,$2)',['monali','9999955']);
  console.log(result.rows);
  client.end();
})
();



      




