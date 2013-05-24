//TODO download every day's image in schedule
//TODO set download file to desktop image

var req = require("./request");

var opt = {
    hostname: "www.bing.com",
    path: "/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=",
    proxyOpt: {
        host: "***.***.***.***",
        port: 8080,
        username: "***",
        password: "***"
    }
};

//download all image file
var arr = ["en-US", "zh-CN", "ja-JP", "en-AU", "en-UK", "de-DE", "en-NZ", "en-CA"];

for (i = 0; i < arr.length; i++) {
    opt.mkt = arr[i];
    req.imgReq(opt);
    //break;
}