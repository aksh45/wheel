const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const event_schema =  mongoose.Schema({
	nums:{
		type: [{type: Number}]
	},
	winner:{
		type: Number
	}

})

module.exports = mongoose.model('event',event_schema );