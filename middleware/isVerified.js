const jwt = require('jsonwebtoken');
module.exports = function (req,res,next){
	const token =  req.cookies.authtoken;
	if (!token){
		return res.redirect('/admin/login');
	}
	try{
 		const verified =  jwt.verify(token,'gsadgfagfdhgfadhgfahfda');
		if(verified){
			req.valid__user = verified;
			next();
		}
		else{
			res.clearCookie("authtoken");
			res.status(401).redirect('/admin/login');
		}
		
	}
	catch(err){
		res.clearCookie("authtoken");
		res.status(401).redirect('/admin/login');
	}
};