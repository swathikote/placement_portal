var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyparser = require('body-parser');

//check database connectivity
var connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sa1234@njay",
  database:"placement"
});
connect.connect(function(err,result)
{
  if (err) throw err;
  console.log("Database Connected!");
 
});
app.set('connect',connect);
app.set('view engine','ejs');
app.set('views','./views');
app.set('port',process.env.PORT || 3000);

app.use(express.static('./public'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(require('./routes/util_common.js'));
app.use(require('./routes/admin.js'));
app.use(require('./routes/user.js'));






app.listen(app.get('port'));
console.log("listening to port 3000")


module.exports = app;