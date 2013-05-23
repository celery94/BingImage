
var http = require("http");
var fs = require("fs");

function httpReq(opt){
	var options = {
		hostname: opt.hostname,
		path: opt.path,
		method: "GET"
	};

	var req = http.request(options, function (res) {
		
		var body = "";
		res.on('data', function (chunk) {
			body += chunk;
			if(opt.datahandler) opt.datahandler(chunk);
		});
		
		res.on('end', function () {
			if(opt.endhandler) opt.endhandler(body);
		});
	});
	
	req.on("error",function(err){
		console.log(err);
	});
	
	req.end();
};

function imageReq(mkt){ 
	httpReq({
		hostname:"www.bing.com",
		path:"/HPImageArchive.aspx?format=js&idx=0&n=1&mkt="+mkt,
		endhandler:function(jsonData){
			var jsonObj = JSON.parse(jsonData);
			var url = jsonObj.images[0].url;
			
			var nameIndex = url.lastIndexOf("/");
			var fileName = url.substr(nameIndex+1);
			
			//console.log(fileName);;
			
			var file = fs.createWriteStream(fileName);
			
			
			httpReq({
				hostname:"www.bing.com",
				path:url,
				datahandler:function(data){
					file.write(data);
				},
				endhandler:function(){
					file.end();
					console.log(mkt+"Done!");
				}
			});
			
		}
	});
};

exports.imgReq = imageReq;