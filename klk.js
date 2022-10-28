
const express = require('express')
const app = express()

const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser();

const port = 8800

const bodyParser = require('body-parser');

require('body-parser-xml')(bodyParser);

const convert = require('xml-js');
app.use(
    bodyParser.xml({
      limit: '1MB', // Reject payload bigger than 1 MB
      xmlParseOptions: {
        normalize: true, // Trim whitespace inside text nodes
        normalizeTags: true, // Transform tags to lowercase
        explicitArray: false, // Only put nodes in array if >1
      },
    }),
  );

// this example reads the file synchronously
// you can read it asynchronously also


app.get('/read', (req, res) => {
  let xml_string = fs.readFileSync("plt.xml", "utf8");
  parser.parseString(xml_string, function(error, result) {
    if(error === null) {
       res.send(result)

   }
   else {
     console.log(error);
   }
 });
})

app.post('/send-xml', function (req, res) {
  console.log( JSON.stringify(req.body))
  
          console.log("Record inserted successfully===============");
          res.send(req.body)
      
  
  // res.send('welcome');
  res.status(200).end();

})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
