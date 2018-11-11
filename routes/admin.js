var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyparser = require('body-parser');
var allowed_branches;

router.get('/admin_login',function(req,res)
{
	res.render('admin_login');
});
router.post('/admin_login',function(req,res)
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
				res.redirect('/dashboard');
		});
});
router.get('/dashboard',function(req,res)
{
	res.render('admin_dashboard');
});
router.get('/companies',function(req,res)
{
	var data = "";
	res.render('companies',{data});
});
router.get('/view_companies',function(req,res)
{
	res.render('view_companies');
});
router.get('/add_companies',function(req,res)
{
	res.render('add_companies');
});
router.post('/add_companies', function(req,res)
{
	var company_name = req.body.company_name;
	var company_logo = req.body.logo;
	var company_email = req.body.email;
	var company_contact_number = req.body.contact;
	var company_address = req.body.address;
	var placement_internship = req.body.placement_internship;
	allowed_branches = req.body.branches;
	var details = req.body.details;
	var schedule = req.body.schedule;
	var cgpa = req.body.cgpa;
	var active_backlog = req.body.backlog;
	var dead_backlog = req.body.d_backlog;
	var closed = req.body.closed;
	if(closed==='NO')
		closed = 1;
	else
		closed = 0;
	var connect = req.app.get('connect');
	var sql_1 = `insert into company(company_name,company_logo,company_email,company_contact_number,company_address,
	           placement_or_internship,position_details,company_schedule,Minimum_req_cgpa,active_backlog,dead_backlog,
	           registration_closed) values("${company_name}","${company_logo}","${company_email}","${company_contact_number}"
	           ,"${company_address}","${placement_internship}","${details}","${schedule}","${cgpa}",
	           "${active_backlog}","${dead_backlog}","${closed}");`;

     connect.query(sql_1,function(err,result)
    {
    	if(err) throw err;
         var sql_2 = `select max(company_id) as company_id from company`;
         connect.query(sql_2,function(err,row){
               
		        allowed_branches.forEach(function(value)
		        {
							var sql = `insert into company_branch(company_id,branch_name) values("${row[0].company_id}","${value}");`;
							connect.query(sql,function(err,result)
							{
								if(err)
									throw err;
							});
		        });
		    });
			var data="Company_added_successfully";
			res.render('companies',{data});    
		  	
	});            
});


module.exports = router;