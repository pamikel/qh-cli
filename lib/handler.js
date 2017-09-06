var Commander = require('./commander/index');
var commands = require('./commander/commands');

module.exports = function(cwd,args){

	var commander = new Commander();

	commander.registerAll(commands);

	//start handle console events
	commander.handle(cwd,args,function(err){
		if(err){
			console.log(err);
		}
	});

}