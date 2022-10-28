const express = require('express')

var fs = require("fs");

const { sequelize, User, Post,Ltmdata ,Ltmempty} = require('./models')

const app = express()
app.use(express.json())



app.post('/file', async (req, res) => {
        const { Feldname,start_pos,end_pos,total_length,typ,beschreibung,beispiel } = req.body

  try {
    const user1 = await Ltmdata.create({ Feldname,start_pos,end_pos,total_length,typ,beschreibung,beispiel })

    return res.json(user1)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})





app.post('/emptydata',async (req, res) => {
 const { SA,AV_DISPO_BEREICH,sender,EMPF,FILE_BEZ,date,TIME,created_timestamp,modified_timestamp } = req.body
  try{
  const datafile = fs.readFileSync('./empty.txt', { encoding: 'utf8', flag: 'r' });
  //console.log(datafile);
  // console.log(datafile.split("\n").length);
  

  if (datafile.length) {
 //let mm=0;
   // let sqlQuery = 'INSERT INTO public.ltm_empty_data ( SA,AV_DISPO_BEREICH,sender,EMPF,FILE_BEZ,date,TIME,created_timestamp,modified_timestamp) VALUES ';
  
    const sqlQuery = await Ltmempty.create({ SA,AV_DISPO_BEREICH,sender,EMPF,FILE_BEZ,date,TIME,created_timestamp,modified_timestamp }) 

    datafile.split("\n").forEach((element, ind) => {
        // if (mm < 10) {
            //mm++;
           // console.log(data.substring(1, 9))
           element= "  "+element;
           var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
            const tableData = {
                'SA': element.substring(1, 5),
                'AV_DISPO_BEREICH': element.substring(4, 8),
                'sender': element.substring(35, 45),
                'EMPF': element.substring(45, 55),
                'FILE_BEZ': element.substring(55, 65),
                'date': element.substring(75, 84),
                'TIME': element.substring(83, 89),
                'created_timestamp':dateTime,
                'modified_timestamp':dateTime

                
            };
            if (ind) sqlQuery += ',';
            let dataStr = `('${tableData.SA}', '${tableData.AV_DISPO_BEREICH}', '${tableData.sender}', '${tableData.EMPF}', '${tableData.FILE_BEZ}', '${tableData.date}','${tableData.TIME}','${tableData.created_timestamp}','${tableData.modified_timestamp}')`;
            sqlQuery += dataStr;

          
    });

    Ltmempty.query(sqlQuery, (err, result) => {
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
}catch(err){
  console.log(err.message);
}
})



app.get('/users', async (req, res) => {
  try {
    const users = await Ltmdata.findAll()

    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.get('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const user = await User.findOne({
      where: { uuid },
      include: 'posts',
    })

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.delete('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const user = await User.findOne({ where: { uuid } })

    await user.destroy()

    return res.json({ message: 'User deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.put('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  const { name, email, role } = req.body
  try {
    const user = await User.findOne({ where: { uuid } })

    user.name = name
    user.email = email
    user.role = role

    await user.save()

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.post('/posts', async (req, res) => {
  const { userUuid, body } = req.body

  try {
    const user = await User.findOne({ where: { uuid: userUuid } })

    const post = await Post.create({ body, userId: user.id })

    return res.json(post)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({ include: 'user' })

    return res.json(posts)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})


app.get('/', (req, res ) => {
  res.send('Hello World!me here sommuusuusu')
})
app.listen({ port: 5000 }, async () => {
  console.log('Server up on http://localhost:5000')
  await sequelize.authenticate()
  console.log('Database Connected!')
})

//app.listen(5000, function() { console.log('Example app listening on port 3010!'); });
