const express = require('express')
const app = express()

const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser();

const request = require('request');
var validator = require('xsd-schema-validator');

const port = 5000
const http = require('http');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

var querystring = require('querystring');




//=> allows us to access the req.body
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

// Read XML file in Postman
app.get('/read', (req, res) => {
  let xml_string = fs.readFileSync("IR.xml", "utf8");
  parser.parseString(xml_string, function (error, result) {
    if (error === null) {
      res.send(result)
    }
    else {
      console.log(error);
    }
  });
})


// Read XSD Validation file   in Postman

app.get('/read-xsd', (req, res) => {
  var xmlStr = fs.readFileSync('IR.xml',"utf8");
  validator.validateXML(xmlStr, 'IR.xsd', function(err, result) {
      if(err === null) {
          res.send(result)
      }
      else {
          throw err;
      }
    console.log(result);
    });
})



/* checking server url  for local url testing in post man  */
app.post('/test', (req, res) => {
  console.log('varidhi', req.body);
  res.send(req.body)
  //  res.status(200).end();

})

app.post('/send-xml', function (req, res) {
 
     var xmlStr = fs.readFileSync('IR.xml', "utf8");
  validator.validateXML(xmlStr, 'IR.xsd', function (err, result) {
    if (err === null) {

      var post_data = querystring.stringify(req.body);
      var post_options = {
 
        // url : 'https://lipf-dev.app.corpintra.net/pltshippingapi/submitShippingInstruction',
      url: 'http://localhost:5000/test',       /*  Using Local Url for testing    */
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
        }
      };
      request(post_options, function (err, resp, body) {
        if (err) {
          console.log('Error :', err)
          res.send(err);
        }
        const data = req.body;
        const sqmsver_shipping_information = JSON.parse(JSON.stringify(data.sqmsver_shipping_information));
        const sqmserver = sqmsver_shipping_information.supplier_adress;
        var supplierdata=sqmsver_shipping_information.shipping_supplier_adress;

        if (sqmsver_shipping_information) {
          var contact_person = sqmsver_shipping_information.contact_person;
          const reportNum = sqmsver_shipping_information.report_number;
          const create_date = sqmsver_shipping_information.creation_date;
          const plant = sqmsver_shipping_information.plant;
          const order_number = sqmsver_shipping_information.order_number;
          const  supplier=sqmsver_shipping_information.supplier;

          const sqmservercontactPerson = sqmserver.contact_person;
          const cancellation_flag=sqmsver_shipping_information.cancellation_flag;
          const receiverAddress=sqmsver_shipping_information.receiverAddress;
          var receiverName=sqmsver_shipping_information.receiverName;
          var causer= sqmsver_shipping_information.causer;
          var shipping_flag=sqmsver_shipping_information.shipping_flag ;

/* triangleTransport  --> true if Divergent address is present else false.*/
         if(shipping_flag==1){ shipping_flag='true';}
          else if (shipping_flag==2) { shipping_flag='false'; }

/* freightChargeName  --> If causer is 1 then 'unfree' . If causer is  2 then free.*/

         if(causer==1){ causer='unfree';}
          else if (causer==2) { causer='free';}

/*  shippingContentModels Partnumber spit ,
    -> Position 1-13 of partNumber (trim it if it only 11) 
    -> es1 Position 15-18 of partNumber
    -> es2 Position 20-23 of partNumber  */

 var shippingpartnum =Array.from(sqmserver.partnumber);
 var partnumberdata=[];
 var es1 =[];
 var es2 =[];
for(var i=0 ;i<shippingpartnum.length;i++)
{
  if(i<=13){partnumberdata.push(shippingpartnum[i]); }
  if(i>=15 && i <=18){es1.push(shippingpartnum[i]); }
  if(i>=20 && i <=23){es2.push(shippingpartnum[i]); }
}
var partnumber1=partnumberdata.join('');
var es1data = es1.join('');
var es2data = es2.join('');

/* recevername  supplier_adress (street, city, zip, country)*/
var jsoner = JSON.stringify(supplierdata);
console.log(jsoner);
var obj1 = JSON.parse(jsoner);
receiverName=obj1.name; // Only receiver name
var street= obj1.street;
var city=obj1.city;
var zip=obj1.zip;
var country= obj1.country;
var strdata=[];
strdata.push(street,city,zip,country);
console.log(strdata);
var strdata1="" ;
// Loop is fetching all the data in single line
for (var i =0;i<strdata.length;i++)
{
  strdata1 += strdata[i]+",";
}
strdata2 = strdata1.replace(/,\s*$/, ""); /* Removing lastline Comma*/

/* Unit Code Vlidation ,Convert unitcode to text (Refer UnitCodeMapping.png) */
var uomdata =sqmserver.unitcode;
var dict = {'0':'Millimeter', '00':'Millimeter','01':'Stuck','02':'Kilogramm','03':'Meter','04':'Kubikmeter',
'05':'Quadratmeter','06':'Liter','07':'Paar','08':'Tonne','09':'Gramm','10':'Kilometer','11':'Kilowattstunde',
'12':'Milliliter','13':'Karat','14':'--','15':'Stunde','16':'Blatt',};
var value1  ;
for(var key in dict) 
{
   if (key== uomdata)
  {
    value1=dict[key];
  }
}

          delete sqmsver_shipping_information.creation_date;
          delete sqmsver_shipping_information.report_number;
          delete sqmsver_shipping_information.plant;
          delete sqmsver_shipping_information.contact_person;
          delete sqmsver_shipping_information.supplier_adress;
          delete sqmsver_shipping_information.order_number;
          delete sqmsver_shipping_information.order_number;
          delete sqmsver_shipping_information.supplier;
          delete sqmsver_shipping_information.shipping_flag;
          delete sqmsver_shipping_information.causer;
          delete sqmsver_shipping_information.cancellation_flag;
          delete sqmsver_shipping_information.shipping_supplier_adress;
          delete data.sqmsver_shipping_information;

    sqmsver_shipping_information['source']="PB";
    sqmsver_shipping_information['createdDate']=create_date;
    sqmsver_shipping_information['shippingNumber']=reportNum;
    sqmsver_shipping_information['plantCode']=plant;
    sqmsver_shipping_information['siCreatedUser']=contact_person[0];
    sqmsver_shipping_information['siModifiedUser']=contact_person[1];
    sqmsver_shipping_information['createdUser']=contact_person[2];
    sqmsver_shipping_information['modifiedUser']=contact_person[3];
    sqmsver_shipping_information['orderNumber']=order_number;
    sqmsver_shipping_information['cancellationFlag']=cancellation_flag;
    sqmsver_shipping_information['freightChargeName']=causer;
    sqmsver_shipping_information['lsNumber']=supplier;
    sqmsver_shipping_information['triangleTransport']=shipping_flag;
    sqmsver_shipping_information['receiverName']=receiverName;
    sqmsver_shipping_information['receiverAddress']=strdata2;

    sqmsver_shipping_information['shippingcontentmodels']=[{"createdUser":sqmservercontactPerson[0],
    "modifieduser":sqmservercontactPerson[1],
    "partdescription":sqmserver.partnumber_text,
    "partNumber":partnumber1,
    'es1':es1data,
    'es2':es2data,
    "pos":sqmserver.shipping_item,
    "quantity":sqmserver.quantity,
    "uom":value1,
    "charge":sqmserver.charge,
  }],

  sqmsver_shipping_information['shippingSupplierModel']={"name":supplierdata.name,
  "street":supplierdata.street,
  "city":supplierdata.city,
  "number":supplierdata.shipping_supplier,
  "zipcode":supplierdata.zip,
  "country":supplierdata.country, 
          };
          data.root = sqmsver_shipping_information;
        }
        var respdata={root:sqmsver_shipping_information}
        console.log(respdata);
        res.send(respdata)
      });

    }
    else {
res.send(err)    }
  });

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
