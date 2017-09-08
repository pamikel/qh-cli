var async = require('async')
var util = require('../util/index')
var fs = util.file
var path = require('path')

//init blogo folders and files
module.exports = function(cwd,args,callback){
	var dest = args._.length > 1?path.join(cwd,args._[1]):cwd
	var dirName='backend'
	if(args.f) dirName='frontend'
	var src = path.join(__dirname,'../../assets/'+dirName)
	fs.copyDir(src,dest,callback)
}