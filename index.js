'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    issues = require('./issues');

var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'debugger',
      password: 'passworddd',
      port: 3306,
      database: 'debugging_tips'
};

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

//setup the handlers
app.get('/', issues.all);
app.get('/issues', issues.all);
app.get('/issues/add' issues.showAdd);
app.get('/issues/:id', issues.get);
app.post('/issues/update/:id', issues.update);
app.post('/issuesss', issues.add);
app.get('/issues/delete/:id', issues.delete);

//this should be a post but this is only an illustration of CRUD - not on good practices
app.delete('/issues/:id', issues.delete);

app.use(errorHandler);

//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 3000;

//start everything up
app.listen(portNumber, function () {
    console.log('Debugging Tips app running at port # :', portNumber);
});
