const express = require('express')
const { sequelize,Ltmdata} = require('./models')
const fs = require("fs");
const app = express() 
app.use(express.json())


app.post('/file', async (req, res) => {
        const { Feldname,start_pos,end_pos,total_length,typ,beschreibung,beispiel } = req.body

  try {
    const user1 = await Ltmdata.create({ Feldname,start_pos,end_pos,total_length,typ,beschreibung,beispiel })
     res.json(user1)
  } catch (err) {
    console.log(err)
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





app.listen({ port: 5000 }, async () => {
  console.log('Server up on http://localhost:5000')
  await sequelize.authenticate()
  console.log('Database Connected!')
})

