//a simple and lite logger system
var options={
	level: 'ALL'
	,output: 'console'
}
exports.log=function(msgLevel, msg)
{
	console.log((new Date().toISOString()) + " " + msgLevel + " " + msg);
}