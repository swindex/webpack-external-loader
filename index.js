var loaderUtils = require('loader-utils');

//var validateOptions = require('schema-utils');

Object.defineProperty(exports, "__esModule", {
	value: true
  });

var http = require('sync-request');
const fs = require('fs');
var path = require('path');
var path2 = _interopRequireDefault(path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
module.exports = function (source) {
  	this.cacheable && this.cacheable();
	//console.log(_path2);	
	source = source.replace(/@import url\("((?:http)|(?:https)\:[^"\)]*)"\)/g,function(a,b, c){
		console.log("Downloading: "+b);
		var res = http('GET',b,{
		headers: {
			"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
			"accept-language": "en",
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
		}});

		var ret = res.getBody('utf8');
		return ret;
	});
	source = source.replace(/url\(((?:http)|(?:https)\:[^\)]*)\)/g,function(a,b, c){
		var name = path.basename(b);
		
		var tmpdir = "tmp";
		if (!fs.existsSync(tmpdir))
		fs.mkdirSync(tmpdir)


		var localPath = tmpdir+"/"+name;

		if (fs.existsSync(localPath)){
			console.log("Using Cashed: "+localPath);
		}else{
			console.log("Downloading: "+b);
			var res = http('GET',b,{
				headers: {
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng;q=0.8",
					"accept-language": "en-CA,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,ru;q=0.6",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
				}});
			var ret = res.getBody();
			fs.writeFileSync(localPath, ret);
		}

		var p =  path.resolve(__dirname,'..',localPath) ;
		p = p.replace(/\\/g,"/");
		return `url('~${ p }')`;
	});
	return source;
}
