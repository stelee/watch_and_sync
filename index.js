//simple file
(function(){
	'use strict'
	var log=require("./logger").log;
	var path=require("path");
	var chokidar = require('chokidar');

	log("INFO","Start to watch the file system")
	log("INFO","Delete a folder may not working well in windows")


	var options={
		src: './source',
		dest: './target'
	}

	var fs=require('fs-extra');
	var watchHandler=function(evt,pathname){
		var source=pathname;
		var target=pathname.replace(path.join(options.src),path.join(options.dest));
		switch(evt)
		{
			case 'addDir' :
				fs.ensureDirSync(target);
				log("INFO","ensure the directory " + target + " exists");
				break;
			case 'unlinkDir':
			case 'unlink':
				fs.removeSync(target);
				log("INFO","file " + target + " has been removed");
				break;
			case 'add':
			case 'change':
				if(fs.existsSync(source))
				{
					fs.copySync(source,target);
					log("INFO","file " + source + " has been copied to " + target);
				}else
				{
					fs.removeSync(target);
					log("INFO","file " + target + " has been removed");
				}
				
				break;
			default:
				log("WARNING","something is wrong with the event "+evt);
		}
	}
	var attachWatch=function(pathname,fn)
	{
		var realpath=pathname;
		log("DEBUG","will watch "+realpath);
		var watcher=chokidar.watch(realpath,{ignored: /[\/\\]\./, persistent: true});
		watcher.on('all',fn);
	}

	attachWatch(options.src,watchHandler);
})();