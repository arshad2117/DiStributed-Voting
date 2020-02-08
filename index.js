const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const Profile = require('./models/Profile');
const aesjs = require('aes-js');
var urlencoderParser = bodyParser.urlencoded({extended: true});
const app = express();
//const bcrypt = require('bcryptjs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var qr = require('qr-image');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: "BTPRP05"}));


const mongoose = require('mongoose');
const redis = require('redis');



const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  retry_strategy: () => 1000
});

var password, rand_num, email, secret, voter_id;

const client = require('twilio')(
  'ACbbcbcf1b0435263547b118b7081596dd',
  '7461031c95b1140dc80bcbd729140891'
);

const { Pool } = require('pg');


  var keyt = [0, 1, 2, 255, 4, 34, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 122, 232, 24, 25, 26, 27, 28,
    29, 30, 31];


var key1 = [0, 1, 2, 255, 4, 34, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 122, 232, 24, 25, 26, 27, 28,
  29, 30, 31];


var key2 = [0, 1, 2, 255, 4, 34, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 122, 232, 24, 25, 26, 27, 28,
  29, 30, 31];

var key3 = [0, 1, 2, 255, 4, 34, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 122, 232, 24, 25, 26, 27, 28,
  29, 30, 31];




const pgClient = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

const pgClient1 = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST1,
  database: process.env.PGDATABASE1,
  password: process.env.PGPASSWORD1,
  port: process.env.PGPORT1
});

const pgClient2 = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST2,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

const pgClient3 = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST3,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});


pgClient.on('error', () => console.log('Lost PG connection'));
pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.log(err));

  /*

const pgClient = new Pool({
  user: 'arshad',
  host: 'localhost',
  database: 'postgres',
  password: 'QETUO@2117',
  port: 5432
});

const pgClient1 = new Pool({
  user: 'arshad',
  host: 'localhost',
  database: 'postgres',
  password: 'QETUO@2117',
  port: 5432
});

const pgClient2 = new Pool({
  user: 'arshad',
  host: 'localhost',
  database: 'postgres',
  password: 'QETUO@2117'
})

const pgClient3 = new Pool({
  user: 'arshad',
  host: 'localhost',
  database: 'postgres',
  password: 'QETUO@2117'
})

*/



insertkeys();
/*
pgClient
  .query('CREATE TABLE VOTER(FIRST_NAME VARCHAR(30), LAST_NAME VARCHAR(30), E_MAIL VARCHAR(30), PAN VARCHAR(30), AADHAAR VARCHAR(30), PHONE_NO VARCHAR(30), VOTER_ID VARCHAR(30), PASSWORD VARCHAR(30)) ');
pgClient1
  .query('CREATE TABLE KEY1(KEY VARCHAR(300)) ');
pgClient2
  .query('CREATE TABLE KEY2(KEY VARCHAR(300)) ');
pgClient3
  .query('CREATE TABLE KEY3(KEY VARCHAR(300)) ');
pgClient1
  .query('CREATE TABLE VOTE1(VOTERID VARCHAR(50), VOTE VARCHAR(50))');
pgClient2
  .query('CREATE TABLE VOTE2(VOTERID VARCHAR(50), VOTE VARCHAR(50))');
pgClient3
  .query('CREATE TABLE VOTE3(VOTERID VARCHAR(50), VOTE VARCHAR(50))');
  */

function getkey(stringkey){
  var rt = stringkey.split(' ');
  for(var i = 0; i < rt.length; i++){
    rt[i] = parseInt(rt[i]);
  }
  rt.pop();
  return rt;
}

function verifytoken(req, res, next){
  const token = req.header('auth-token');
  if(!token)return res.status(401).send('Access Denied');

  try{
      const verified = jwt.verify(token, 'sgsewtegsdfg3534647dfgdfg');
      req.user = verified;
      next();
  } catch (err){
      res.status(400).send("Invalid token");
  }

}

function insertkeys(){
  var k1 = "", k2 = "", k3 = "";
  for(var i = 0; i < key1.length; i++){
    k1 += key1[i] + " ";
  }
  for(var i = 0; i < key2.length; i++){
    k2 += key2[i] + " ";
  }
  for(var i = 0; i < key3.length; i++){
    k3 += key3[i] + " ";
  }
  var query1 = `INSERT INTO KEY1 VALUES('${k1}')`;
  var query2 = `INSERT INTO KEY2 VALUES('${k2}')`;
  var query3 = `INSERT INTO KEY3 VALUES('${k3}')`;

  console.log(query1);
  console.log(query2);
  console.log(query3);
  pgClient1.query(query1);
  pgClient2.query(query2);
  pgClient3.query(query3);

}
    

app.use('/static', express.static('static'));
app.set('view engine', 'ejs');
app.get('/', function(req, res){
  //password = "arshad9991";
  //email = "arshad2117@gmail.com";
  //voter_id = "B";

  res.render('head', {'error': 0});
});

function gethash(key, message) {

  var text = message;
  var textBytes = aesjs.utils.utf8.toBytes(text);

  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var encryptedBytes = aesCtr.encrypt(textBytes);

  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
}

function decode(key, encryptedHex){
  var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
 
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var decryptedBytes = aesCtr.decrypt(encryptedBytes);
 
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText;

}


var emaildetails = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'evotingiiits@gmail.com',
    pass: 'evoting2016'
  },
   tls: { rejectUnauthorized: false }
});

app.get('/qr', function(req,res){
  var getkey =  ":voterid";
  redisClient.get(getkey, function(err, reply){
    
  var code = qr.image('http://192.168.99.102/getvote/' + reply, { type: 'png', ec_level: 'H', size: 5, margin: 0 });
  res.setHeader('Content-type', 'image/png');
  code.pipe(res);

  });
});


app.get('/test', function(req, res){
  res.render('display', {'result': "BJP"});
});

app.get('/final', function(req, res){
  res.render('final');
});

app.post('/sendCred', urlencoderParser, function(req, res){
  var secrkey = ":secret";
  redisClient.get(secrkey, function(err, reply){
    var secretredis = reply;
    if(req.body.credentials == secretredis){
      console.log("Done");
      res.render('vote');
    }
    else{
      res.render('cred', {'error': 1});
    }
  })
  
});
app.post('/gettr', urlencoderParser,async function(req, res){
  var vote = req.body.group1;
  var hashedvote = gethash(keyt, vote);
  var x = Math.floor(hashedvote.length / 3);
  console.log(hashedvote);
  var part1 = "";
  var part2 = "";
  var part3 = "";
  for(var i = 0; i < x; i++){
    part1 = part1 + hashedvote[i];
  }
  for(var i = x; i < Math.floor((2* hashedvote.length) / 3); i++){
    part2 = part2 + hashedvote[i];
  }
  for(var i = Math.floor((2 * hashedvote.length)/ 3); i < hashedvote.length; i++){
    part3 = part3 + hashedvote[i];
  }
  console.log(part1);
  console.log(part2);
  console.log(part3);
  var qr1 = `SELECT * FROM KEY1`;
  var qr2 = `SELECT * FROM KEY2`;
  var qr3 = `SELECT * FROM KEY3`;
  var k1 = "", k2 = "", k3 = "";
  console.log(qr1);

  var vid = "";
  await redisClient.get(":voterid", (err, reply) => {
    vid = reply;
  });
  
  pgClient1.query(qr1, (err, res) => {
    console.log(res.rows);
    if(res && res.rows.length > 0){
      k1 = res.rows[0].key;
    }
    else{
      k1 = "";
    }
    var hashedvote = gethash(getkey(k1), part1);
    console.log(hashedvote);
    var qkey = `INSERT INTO VOTE1 VALUES('${vid}','${hashedvote}')`;
    pgClient1.query(qkey, (err, res) => {

    })
  });

  pgClient2.query(qr2, (err, res) => {
    console.log(res.rows);
    if(res && res.rows.length > 0){
      k2 = res.rows[0].key;
    }
    else{
      k2 = "";
    }
    var hashedvote = gethash(getkey(k2), part2);
    var qkey = `INSERT INTO VOTE2 VALUES('${vid}','${hashedvote}')`;
    pgClient2.query(qkey, (err, res) => {
      
    })
  });
  pgClient3.query(qr3, (err, res) => {
    console.log(res.rows);
    if(res && res.rows.length > 0){
      k3 = res.rows[0].key;
    }
    else{
      k3 = "";
    }
    //console.log(getkey(k3));
    var hashedvote = gethash(getkey(k3), part3);
    var qkey = `INSERT INTO VOTE3 VALUES('${vid}','${hashedvote}')`;
    pgClient3.query(qkey, (err, res) => {
    });



  });
  res.render('display');
});

app.get('/getvote/:id', async function(req, resp){
  var vid = req.params.id;
  var query1 = `SELECT * FROM VOTE1 WHERE VOTERID='${vid}'`;
  var query2 = `SELECT * FROM VOTE2 WHERE VOTERID='${vid}'`;
  var query3 = `SELECT * FROM VOTE3 WHERE VOTERID='${vid}'`;
  var qr1 = `SELECT * FROM KEY1`;
  var qr2 = `SELECT * FROM KEY2`;
  var qr3 = `SELECT * FROM KEY3`;
  var k1 = "", k2 = "", k3 = "";
  var pr1 = "", ptr2 = "", prt3 = "";
  console.log(qr1);
  var res11 = await pgClient1.query(qr1);
  console.log(res11.rows[0].key);
  if(res11 && res11.rows.length > 0){
    k1 = res11.rows[0].key;
  }
  else{
    k1 = "";
  }
  //console.log(res.rows[0].vote);
  var decrvote1 = "", decrvote2 = "", decrvote3 = "";
  var res12 = await pgClient1.query(query1)
  decrvote1 = await decode(getkey(k1), res12.rows[0].vote);
  console.log(res12.rows[0].vote + " " + decrvote1);


  
  var res21 = await pgClient2.query(qr2);
  console.log(res21.rows[0].key);
  if(res21 && res21.rows.length > 0){
    k2 = res21.rows[0].key;
  }
  else{
    k2 = "";
  }
  //console.log(res.rows[0].vote);
  var res22 = await pgClient2.query(query2)
  decrvote2 = await decode(getkey(k2), res22.rows[0].vote);
  console.log(decrvote2);

  
 
  var res31 = await pgClient3.query(qr3);
  console.log(res31.rows[0].key);
  if(res31 && res31.rows.length > 0){
    k3 = res31.rows[0].key;
  }
  else{
    k3 = "";
  }
  //console.log(res.rows[0].vote);
  var res32 = await pgClient3.query(query3)
  decrvote3 = await decode(getkey(k3), res32.rows[0].vote);
  console.log(decrvote3);


  resp.render('show', {'candidate': decode(keyt, decrvote1 + decrvote2 + decrvote3)});

/*
  pgClient1.query(query1, (err, res) => {
    if(res && res.rowCount > 0){
      console.log(res);
    }
  });
  */
});


app.post('/sendPassword', urlencoderParser, function(req, res){
  console.log(req.body.password);
  console.log(password);
  var skey = ":password";
  
  console.log(skey);
  var tempPass = "";
  redisClient.get(skey, function(err, reply){
    tempPass = reply;
   const validPass = await bcrypt.compare(req.body.password, tempPass);
    
    if(validPass){
      console.log("password was correct");
      var semail = ":email";
      redisClient.get(semail, function(err, reply){
        tempemail = reply;
        rand_num = Math.random().toString(36).substring(7);
        var secrkey = ":secret";
        redisClient.set(secrkey, rand_num);
          var mailcontent = {
            from: 'evotingiiits@gmail.com',
            to: tempemail,
            subject: 'Authentication mail for e-voting',
            text: rand_num
          }
          const token = jwt.sign({_id: voter_id}, 'sgsewtegsdfg3534647dfgdfg');
          res.header('auth-token', token);      
          emaildetails.sendMail(mailcontent, function(error, info){
            if(error){
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          res.render('cred', {'error': 0});
          //res.render('vote');
          
        });
      }
      else{
        res.render('pass', {'error': 1});
      }
     
  });
  
});

app.post('/insertPerson', function(req, res){
	
  var FIRST_NAME = req.body.FIRST_NAME;
  var LAST_NAME = req.body.LAST_NAME;
  var E_MAIL = req.body.E_MAIL;
  var PAN = req.body.PAN;
  var AADHAAR = req.body.AADHAAR;
  var PHONE_NO = req.body.PHONE_NO;
  var VOTER_ID = req.body.VOTER_ID;
  var PASSWORD = req.body.PASSWORD
 pgClient
  .query('CREATE TABLE VOTER(FIRST_NAME VARCHAR(30), LAST_NAME VARCHAR(30), E_MAIL VARCHAR(30), PAN VARCHAR(30), AADHAAR VARCHAR(30), PHONE_NO VARCHAR(30), VOTER_ID VARCHAR(30), PASSWORD VARCHAR(30)) ')
  .catch(err => console.log(err))
  .then(function() {
    
  var query = `INSERT INTO VOTER VALUES('${FIRST_NAME}', '${LAST_NAME}', '${E_MAIL}', '${PAN}', '${AADHAAR}', '${PHONE_NO}', '${VOTER_ID}', '${PASSWORD}')`;

  console.log(query);
  pgClient
  .query(query)
  .catch(err => console.log(err));

  })

});

let errr = 0, vid = "", pwd = "";

app.post('/getpassword', function(req, res){
  res.render('pass', {'error': 0})
});

app.get('/getpassword', function(req, res){
  console.log(errr);
  if(errr == 1){
    console.log("HERE");
    res.render('head', {'error': 1});
  }
  else{
    res.render('pass', {'error': 0, 'voter_id': vid, 'password': pwd});
  }
});

app.post('/checkCredentials', urlencoderParser, function(req, resp){
  console.log(req.body.first_name);
  var query = `SELECT * FROM VOTER WHERE FIRST_NAME = '${req.body.first_name}';`
  console.log(query);
  pgClient.query(query, (err, res) => {
    if(res && res.rowCount > 0){
      console.log(res);
      console.log(res.rows[0].first_name);
      console.log(res.rows[0].last_name);
      console.log(res.rows[0].e_mail);
      console.log(res.rows[0].pan);
      console.log(res.rows[0].aadhaar);
      console.log(res.rows[0].voter_id);
      var FIRST_NAME = res.rows[0].first_name;
      var LAST_NAME = res.rows[0].last_name;
      var AADHAAR = res.rows[0].aadhaar;
      var EMAIL = res.rows[0].e_mail;
      var PAN = res.rows[0].pan;
      var VOTER_ID = res.rows[0].voter_id;
      var PHONE_NO = res.rows[0].phone_no;
      console.log(req.body.email);
      console.log(req.body.PAN);
      console.log(req.body.aadhaar);
      console.log(req.body.phone_no);
      console.log(req.body.voter_id);
    }
    if(res.rowCount > 0 && req.body.email == EMAIL && req.body.PAN == PAN && req.body.aadhaar == AADHAAR && req.body.phone_no == PHONE_NO && req.body.voter_id ==  VOTER_ID){
      password = res.rows[0].password;
      voter_id = res.rows[0].voter_id;
      console.log("PASS");
      email = req.body.email;
      var redispassword = ":password"; 
      var redisvoterid = ":voterid";
      var redisemail = ":email";
      console.log(redispassword);
      redisClient.set(redispassword, res.rows[0].password);
      redisClient.set(redisvoterid, res.rows[0].voter_id);
      redisClient.set(redisemail, res.rows[0].e_mail);
      errr = 0;
      vid = VOTER_ID;
      pwd = password;
      resp.status(200).send('pass');
      //res.render('pass')
      //resp.render('pass', {'error': 0, 'voterid': VOTER_ID, 'password': password});
    }
    else{
      console.log("HERE");
      errr = 1;
      resp.status(200).send('pass');
    }
  });
  //Profile.findOne({'First_Name': req.body.first_name}).then(function(pers){
    //console.log(pers);

  //  if(pers && req.body.email == pers.E_mail && req.body.PAN == pers.PAN && req.body.aadhaar == pers.Aadhaar_Num && req.body.phone_no == pers.Contact_Num && req.body.voter_id == pers.Voter_ID){
     //   password = "HELLO";
      //  email = "arshad2117@gmail.com";
       // res.render('pass', {'error': 0});

        /*

      */
      //res.render('head', {'error': 1});
});

app.listen(5000, function(){
  console.log("SERVING ON PORT 5s000!!!!");
});

insertkeys();
