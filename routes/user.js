var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyparser = require('body-parser');
router.get('/user_dashboard',function(req,res)
{
	res.render('user_dashboard');
});
router.get('/user_login',function(req,res)
{
	res.render('user_login');
});
router.post('/user_login',function(req,res)
{
		var userid = req.body.uid;
		var password = req.body.psw;
		var connect = req.app.get('connect');
		var sql = `select administrator_id,password from administrator where name="${userid}" and password="${password}"`;
		connect.query(sql,function(err,result)
		{
			if(err)
				console.log('invalid login');
			else
				res.redirect('/user_dashboard');
		});
});

















module.exports = router;