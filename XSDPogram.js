console.log('monali here');
var validator = require('xsd-schema-validator');
const fs = require('fs');
const express = require('express')
const app = express()
const port = 9000



app.get('/read-xsd', (req, res) => {
    var xmlStr = fs.readFileSync('file.xml',"utf8");
    validator.validateXML(xmlStr, 'data.xsd', function(err, result) {
        if(err === null) {
            res.send(result)
        }
        else {
            throw err;
        }
      console.log(result);
      });
  })
  
  


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
