
var http = require("http");
var fs = require("fs");

function httpReq(opt, proxyOpt) {
    var options = {
        path: opt.path,
        method: "GET"
    };



    if (proxyOpt) {
        options.host = proxyOpt.host;
        options.port = proxyOpt.port;
        options.path = "http://" + opt.hostname + opt.path;

        var headers = {};
        headers.host = opt.hostname;
        headers["Proxy-Authorization"] = "Basic " + new Buffer(proxyOpt.username + ":" + proxyOpt.password).toString("base64");

        options.headers = headers;
    } else {
        options.hostname = opt.hostname;
    }

    //console.log(options);

    var req = http.request(options, function (res) {

        var body = "";
        res.on('data', function (chunk) {
            body += chunk;
            if (opt.datahandler) opt.datahandler(chunk);
        });

        res.on('end', function () {
            if (opt.endhandler) opt.endhandler(body);
        });
    });

    req.on("error", function (err) {
        console.log(err);
    });

    req.end();
};

function imageReq(opt) {
    httpReq({
        hostname: opt.hostname,
        path: opt.path + opt.mkt,
        endhandler: function (jsonData) {
            var jsonObj = JSON.parse(jsonData);
            var url = jsonObj.images[0].url;

            var nameIndex = url.lastIndexOf("/");
            var fileName = url.substr(nameIndex + 1);

            //TODO where should these file save in?
            var file = fs.createWriteStream(fileName);

            httpReq({
                hostname: opt.hostname,
                path: url,
                datahandler: function (data) {
                    file.write(data);
                },
                endhandler: function () {
                    file.end();
                    console.log(url + " Done!");
                }
            }, opt.proxyOpt);
        }
    }, opt.proxyOpt);
};

exports.imgReq = imageReq;