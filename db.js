const Pool=require("pg").Pool;
require("dotenv").config();


const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;



const dotconfig = {


    user:process.env.PG_USER,
    host:process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
};

const pool=new Pool(dotconfig);




module.exports =pool;