const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const isVerified = require('../middleware/isVerified');

router.get('/',isVerified,async(req,res)=>{
	res.render('../views/index')
});

router.get('/login',async(req,res)=>{
	res.render('../views/login');
});
router.post('/login',async(req,res)=>{
	console.log(req.body);
	const token = jwt.sign({_id:'admin'},'gsadgfagfdhgfadhgfahfda',{ expiresIn:'120min' });
	if(req.body.login == 'admin' && req.body.password == 'test123'){
		return res.cookie('authtoken',token,{secure:false,httpOnly:true}).redirect('/admin/');
	}
	return res.status(401).json({message:'Invalid Creds'});
	
});

module.exports = router;