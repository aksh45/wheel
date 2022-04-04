const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const isVerified = require('../middleware/isVerified');
const Event = require('../models/Event');

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
router.post('/create_wheel',async(req,res)=>{
	const nums = req.body.numbers;
	var event = {
		nums: nums,	
	}
	var created_event =  await Event.create(event);
	return res.json({message: 'created'});
})
router.get('/wheel',async(req,res)=>{
	var event = await Event.findOne({}).sort({_id: -1});
	return res.json({nums:event.nums,id:event._id,winner: event.winner});
})
router.post('/wheel/winner',async(req,res)=>{

	var event = await Event.updateOne({_id:req.body.id},{winner: req.body.winner});
	return res.json({message: 'ok'});
})
router.get('/list',async(req,res)=>{
	var events = await Event.find({});
	return res.json({events: events});
})

module.exports = router;