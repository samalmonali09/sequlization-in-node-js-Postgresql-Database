
var https=require('https')

var apiBase="/ibmmq/rest/v1/"
const express = require('express')
const app = express()
const fs = require('fs');
// Who am I
var username="app"
var password="_APP_PASSWORD_"

var queue="DEV.QUEUE.1"
var qMgr ="QM1"
const port = 2000

var options = {
  hostname:"localhost",
  port:1415,
  method:'GET',
  headers: {
    'Authorization': 'Basic ' + new  Buffer.from(username + ':' + password).toString('base64'),
    'Content-Type' : 'text/plain',
    'ibm-mq-rest-csrf-token' : ''
   }
}

app.get("/url", (req, res) => {
  
        options.path = apiBase + "messaging/qmgr/" + qMgr + "/queue/" + queue + "/message"
       //  const data = fs.readFileSync('test.xml', { encoding: 'utf8', flag: 'r' });
       putMessage()
     res.send(options.path);
     res.status(200).end();
   
    });
   

//options.rejectUnauthorized = false;

//options.path = apiBase + "messaging/qmgr/" + qMgr + "/queue/" + queue + "/message"

putMessage()

function putMessage() {
  // And call the operation
  options.method = 'POST'
  var request = https.request(options,(response) => {
    console.log('POST   statusCode : ', response.statusCode);
    response.setEncoding('utf8');

    response.on('data',function(cbresponse) {
       console.log('POST response: ',cbresponse);
    });

    // Once the message has been successfully put, try to get it again
    response.on('end', function() {
        getMessage();
    });
  });

  request.on('error', function (e) {
    console.log('problem with request: ' + e);
  });

  var msg = "Hello world at " + new Date()

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