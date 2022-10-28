console.log('mq file')
var https=require('https')
const express = require('express')
const app = express()
const fs = require('fs');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

var apiBase="/ibmmq/rest/v1/"

var username="app"
var password="_APP_PASSWORD_"

var queue="DEV.QUEUE.1"
var qMgr ="QM1"
const port = 6000



var querystring = require('querystring');

// options.rejectUnauthorized = false;

app.get("/url", (req, res) => {
 var options = {
    hostname:"localhost",
    port:1415,
    method:'GET',
    headers: {
      'Authorization': 'Basic ' + new  Buffer.from(username + ':' + password).toString('base64'),
      'C ontent-Type' : 'text/plain',
  // Need this header for POST operations even if it has no content
      'ibm-mq-rest-csrf-token' : ''
     }
  }
     options.path = apiBase + "messaging/qmgr/" + qMgr + "/queue/" + queue + "/message"
    //  const data = fs.readFileSync('test.xml', { encoding: 'utf8', flag: 'r' });
    //putMessage()
  res.send(options.path);
  res.status(200).end();

 });











function putMessage() {
  // And call the operation
  options.method = 'POST'
  var request = https.request(options,(response) => {
    console.log('POST   statusCode : ', response.statusCode);
    response.setEncoding('utf8');

    response.on('data',function(cbresponse) {
       console.log('POST response: ',cbresponse);
    });

    response.on('end', function() {
        getMessage();
    });
  });

  request.on('error', function (e) {
    console.log('problem with request: ' + e);
  });

  var msg = "Mq Server Running" + new Date()

  request.write(msg)
  request.end();
}


function getMessage() {
  // Call the operation
  options.method = 'DELETE'
  var request = https.request(options,(response) => {
    console.log('DELETE statusCode : ', response.statusCode);
    response.setEncoding('utf8');
    response.on('data',function(cbresponse) {
       console.log('Message is <%s>',cbresponse);
    });
  });

  request.on('error', function (e) {
    console.log('problem with request: ' + e);
  });

  request.end();
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})