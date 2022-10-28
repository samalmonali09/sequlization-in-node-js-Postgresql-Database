const express = require('express')
const app = express()

const bodyParser = require('body-parser');

require('body-parser-xml')(bodyParser);

var fs = require("fs");
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


const port = 8000

const new_db = "mongodb://localhost:27017/admin"
var MongoClient = require('mongodb').MongoClient;

const collectionName = "Monali"
const dbName = "admin";
let dbo = "";

MongoClient.connect(new_db, function (err, db) {
    if (err) throw err;
    dbo = db.db(dbName);
    dbo.createCollection(collectionName, function (err, res) {
        if (err) throw err;
        dbo.collection(collectionName).findOne({}, (err, collection) => {
            if (err) throw err;
            else console.log("Record Read successfully");
        });
    });
});

app.get('/add', (req, res) => {
    var data = { name: "rishabhio", age: "28", mobile: "1234567890" }
    dbo.collection(collectionName).insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        } else {
            console.log("Record inserted successfully===============");
            console.log(collection);
            res.send(collection);
        }
    });
})

app.get('/read-xml2', (req, res) => {
    const data = fs.readFileSync('plt.xml', { encoding: 'utf8', flag: 'r' });
    const jsonData = JSON.parse(convert.xml2json(data, { compact: true, spaces: 2 }));
    dbo.collection(collectionName).findOne(jsonData, (err, collection) => {
        if (err) {
            throw err;
        } else {
            console.log("Record inserted successfully===============", collection);
            res.send(jsonData)
        }
    });
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/insert-xml', function (req, res) {
    console.log( JSON.stringify(req.body))
    dbo.collection(collectionName).insert(req.body, (err, collection) => {
        if (err) {
            throw err;
        } else {
            console.log("Record inserted successfully===============", collection);
            res.send(req.body)
        }
    });
    // res.send('welcome');
    res.status(200).end();

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
