//http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US
//http://www.bing.com/az/hprichbg/rb/JaenAndalusia_EN-US8746607118_1920x1200.jpg
//en-US, zh-CN, ja-JP, en-AU, en-UK, de-DE, en-NZ, en-CA.

var http = require("http");
var $ = require('jquery').create();
var fs = require('fs');

var options = {
    host: '10.97.4.18',
    port: 8080,
    path: 'http://www.bing.com',
    method: "Get",
    headers: {
        Host: "www.bing.com",
        "Proxy-Authorization": "Basic " + new Buffer("cl1011" + ":" + "654321zZ").toString("base64")
    }
};

//console.log("request start.");

var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);

    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    var body = "";

    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        body += chunk;
    });

    res.on('end', function () {

        //console.log(body);
        //fs.writeFile('log.txt', body, function (err) {
        //    if (err) throw err;
        //    console.log('It\'s saved!');
        //});

        var title = $(body).find("#sh_cp").text();
        console.log(title);

        var reg = /g_img={url:[\s\S]+?,/i;

        var arr = body.match(reg);

        if (arr != null && arr.length == 1) {
            var url = arr[0].substr(13, arr[0].length - 15);
            console.log(url);

            var path = "http://www.bing.com/" + url;

            options["path"] = path;
            var reqImage = http.request(options, function (resImage) {
                console.log('Image STATUS: ' + res.statusCode);

				var file = fs.createWriteStream("file.png");
                resImage.on('data', function (chunk) {
                    file.write(chunk);
                });
				
                resImage.on('end', function () {
					file.end();
                });		

            });

            reqImage.end();
        }
        else {
        }
    });
});

req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});

req.end();
