var req = require("./request");

var arr=["en-US","zh-CN","ja-JP", "en-AU", "en-UK", "de-DE", "en-NZ", "en-CA"];

for(i=0;i<arr.length;i++){
	req.imgReq(arr[i]);
}