//TODO download every day's image in schedule
//process timer & winser
//TODO set download file to desktop image

var req = require("./request");

var opt = {
    savefolder: "D:\\NodeJS\\App\\Image\\",
    isHD: false,
    proxyOpt: {
        host: "888.888.888.888",
        port: 8080,
        username: "username",
        password: "******"
    }
};

req.imgReq(opt);
