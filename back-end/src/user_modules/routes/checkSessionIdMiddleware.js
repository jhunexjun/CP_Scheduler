const utils = require('../utils/util');

module.exports = function(req, res, next){
	if (!utils.isSet(req.body, 'sessionId') && !utils.isSet(req.query, 'sessionId')) {
		res.json({ status: "Error" , message: "session id param is missing. MW" });
		return;
	}

	next();
}