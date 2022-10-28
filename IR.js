const express = require('express')
const app = express()

const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser();

const request= require('request');

const port = 9000

 const http= require('http');
const bodyParser = require('body-parser');

require('body-parser-xml')(bodyParser);


var querystring = require('querystring');


const convert = require('xml-js');
const console = require('console');
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
  let xml_string = fs.readFileSync("test.xml", "utf8");
  parser.parseString(xml_string, function(error, result) {
    if(error === null) {
       res.send(result)

   }
   else {
     console.log(error);
   }
 });
})



app.post('/test', (req, res) => {
  console.log('varidhi',req.body);
      res.send(req.body)
    //  res.status(200).end();

})
app.post('/send-xml', function (req, res) {
  console.log( JSON.stringify(req.body))
    console.log("Record successfully===============");
  var post_data = querystring.stringify(req.body);
var post_options = {
     // url : 'https://lipf-dev.app.corpintra.net/pltshippingapi/submitShippingInstruction',



  url: 'http://localhost:5000/test',
method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(post_data)
    }
};
  request(post_options, function (err, resp, body) {
  if (err) {
    console.log('Error :', err)
    res.send();
  }
   const data=req.body;
   console.log(req.body);



   const sqmsver_shipping_information=JSON.parse(JSON.stringify(data.sqmsver_shipping_information));
  const sqmserver=sqmsver_shipping_information.supplier_adress;
  console.log(sqmserver)
    
    
  if(sqmsver_shipping_information) {
    var  contact_person=sqmsver_shipping_information.contact_person;
    const reportNum=sqmsver_shipping_information.report_number;
    const create_date=sqmsver_shipping_information.creation_date;
    const plant=sqmsver_shipping_information.plant;
    const  order_number=sqmsver_shipping_information.order_number;
    const sqmservercontactPerson=sqmserver.contact_person ;

     delete sqmsver_shipping_information.creation_date;
     delete sqmsver_shipping_information.report_number;
     delete sqmsver_shipping_information.plant;
     delete sqmsver_shipping_information.contact_person;
     delete sqmsver_shipping_information.supplier_adress;
     delete sqmsver_shipping_information.order_number;
   
    delete data.sqmsver_shipping_information;

    sqmsver_shipping_information['source']="PB";
    sqmsver_shipping_information['siCreatedDate']=create_date;
    sqmsver_shipping_information['shippingNumber']=reportNum;
    sqmsver_shipping_information['plantCode']=plant;
    sqmsver_shipping_information['siCreatedUser']=contact_person[0];
    sqmsver_shipping_information['siModifiedUser']=contact_person[1];
    sqmsver_shipping_information['createdUser']=contact_person[2];
    sqmsver_shipping_information['modifiedUser']=contact_person[3];
    sqmsver_shipping_information['orderNumber']=order_number;
    sqmsver_shipping_information['shippingcontentmodels']={"createduser":sqmservercontactPerson[0],
    "modifieduser":sqmservercontactPerson[1],
    "partdescription":sqmserver.partnumber_text,
    "partNumber":sqmserver.partnumber,
    "pos":sqmserver.shipping_item,
    "quantity":sqmserver.quantity,
    "uom":sqmserver.unitcode,
    "charge":sqmserver.charge,

    

  
  };

    //data.sqmsver_shipping_information=sqmsver_shipping_information;
    data.root=sqmsver_shipping_information;

  }


   console.log(data);
     res.send(data)
      
  });

  

})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
