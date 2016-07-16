"use strict"

var request = require('request'),
    fs = require('fs');

class HttpClient{
    constructor(object){
        this.cookie = '';
        this.req = {};
        this.req.headers = {
            'Accept' : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/"+"*;q=0.8",
            'User-Agent' : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
            'Referer' : "http:/"+"/web2.qq.com/"
        };
    }
    get_timestamp(){
    	return new Date().getTime();
    }
    get(url,callback){
        this.req.url=url;
        request(this.req, function (err, res, body){
            if (!err && res.statusCode == 200) {
                callback(body);
            }else throw err;
        });
    }
    download(url,src){
        request(url).pipe(fs.createWriteStream(src));
    }
}

module.exports = HttpClient;