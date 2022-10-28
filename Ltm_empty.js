const port = process.env.PORT || 9000;
const sequelize = require('./connection.js')
const express = require('express');
const fs = require("fs");
const app = express();
sequelize.connect();


/// Ltm Empty data functionality 
app.post('/emptyfile',async (req, res) => {
  try{
  const emptyfile = fs.readFileSync('./empty.txt', { encoding: 'utf8', flag: 'r' });
  if (emptyfile.length) {
    
 let sqlQuery = 'INSERT INTO public.ltm_empty_data2 (AV_DISPO_BEREICH,AV_JAHR,AV_ZAEHLER,LKW_NUMMER,BELADE_PLATZ,RF_LIEF,RF_POS,RF_LT_KOMP,VKZ,SPED_NR,SPED_NRI,KFZ,TRANSPORT,GEBIET,DISPONENT,LM,ABHOL_DAT,LKW_HOEHE,BORDERO_VORSATZ,TRAILER_YARD,CROSS_DOCK,Anz_Frachtbriefe,EMPF_NR,EMPF_NRI,KONTO_NR,KONTO_NRI,LT_NR,POS_TYP,POS_TEXT,MENGE_LT,MENGE_GB,LM_POS,EILT_KZ,BEM,MENGE_SOLL,created_timestamp,modified_timestamp) VALUES ';
    emptyfile.split("\n").forEach((element, ind) => {
           element= "  "+element;
           // Date Funtionality 
           var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
            const tableFile = {
                'AV_DISPO_BEREICH': element.substring(4,8),
                'AV_JAHR':element.substring(8,12),
                'AV_ZAEHLER': element.substring(12,19),
                'LKW_NUMMER':element.substring(19,21),
                'BELADE_PLATZ': element.substring(21,26),
                'RF_LIEF':element.substring(26,29),
                'RF-POS': element.substring(29,32),
                'RF_LT_KOMP':element.substring(32,35),
                'VKZ': element.substring(35, 36),
                'SPED-NR': element.substring(36,45),
                'SPED-NRI': element.substring(45,46),
                'KFZ': element.substring(46, 66),
                'TRANSPORT': element.substring(66, 68),
                'GEBIET': element.substring(68,74),
                'DISPONENT':element.substring(78,86),
                'LM': element.substring(86,92),
                'ABHOL_DAT': element.substring(92,99),
                'LKW-HOEHE': element.substring(106,109),
                'BORDERO_VORSATZ': element.substring(109, 112),
                'TRAILER_YARD': element.substring(113, 114),
                'CROSS_DOCK': element.substring(114, 115),
                'Anz_Frachtbriefe': element.substring(143, 145),
                'EMPF_NR': element.substring(35, 44),
                'EMPF-NRI': element.substring(44, 45),
                'KONTO-NR': element.substring(45, 54),
                'KONTO-NRI': element.substring(54, 55),
                'POS_TYP': element.substring(63, 65),
                'POS_TEXT': element.substring(65, 145),
                'MENGE_LT': element.substring(115, 120),
                'MENGE-GB': element.substring(120, 127),
                'LM-POS': element.substring(127, 133),
                'EILT-KZ': element.substring(144 ,145),
                'BEM': element.substring(145, 245),
                'MENGE_SOLL': element.substring(68, 74),
                'created_timestamp':dateTime,
                'modified_timestamp':dateTime
            };
            if (ind) sqlQuery += ',';
             

            let dataStrfile = `('${tableFile.AV_DISPO_BEREICH}','${tableFile.AV_JAHR}','${tableFile.AV_ZAEHLER}','${tableFile.LKW_NUMMER}','${tableFile.BELADE_PLATZ}','${tableFile.RF_LIEF}','${tableFile.RF_POS}','${tableFile.RF_LT_KOMP}','${tableFile.VKZ}','${tableFile.SPED_NR}','${tableFile.SPED_NRI}','${tableFile.KFZ}','${tableFile.TRANSPORT}','${tableFile.GEBIET}','${tableFile.DISPONENT}','${tableFile.LM}','${tableFile.ABHOL_DAT}','${tableFile.LKW_HOEHE}','${tableFile.BORDERO_VORSATZ}', '${tableFile.TRAILER_YARD}', '${tableFile.CROSS_DOCK}','${tableFile.Anz_Frachtbriefe}','${tableFile.EMPF_NR}','${tableFile.EMPF_NRI}','${tableFile.KONTO_NR}','${tableFile.KONTO_NRI}','${tableFile.LT_NR}','${tableFile.POS_TYP}','${tableFile.POS_TEXT}','${tableFile.MENGE_LT}','${tableFile.MENGE_GB}','${tableFile.LM_POS}','${tableFile.EILT_KZ}','${tableFile.BEM}','${tableFile.MENGE_SOLL}','${tableFile.created_timestamp}','${tableFile.modified_timestamp}')`;
            sqlQuery += dataStrfile;  
    });

    sequelize.query(sqlQuery, (err, result) => {
             //res.send(result)

      if (result.rowCount > 0) {
        console.log("# of records inserted:", result.rowCount);
        res.send(result)
      } else {
        console.log("No records were inserted.");
        res.send(err);
      }
  });             
  }
}catch(err){
  console.log(err.message);
}
})






app.get("/fetch",async (req ,res)=>{
  try{
      const alltodo=await sequelize.query('Select * from ltm_empty_data');
      res.json(alltodo.rows);
  }catch(err){
      console.log(err.message);
  }
 }) ;
 
 



module.exports=sequelize;



     
app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})


