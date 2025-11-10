//const { response } = require('express');
const express = require('express');
//const http = require('http');
const path = require('path');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
const post = require('./responsefromairpay/routes/routes');

const port = 8080;

app.use(express.static(path.join(__dirname + '/')));
//app.use(express.static(path.join(__dirname , 'response')));
app.use('/airpay_js_v3/airpay_js_kit3/airpay_js_kit/responsefromairpay',post);


    
//const server = http.createServer(app);

//server.listen(port,() => console.log('Running...'));
app.listen(port,(req,res) => console.log('Running...'));