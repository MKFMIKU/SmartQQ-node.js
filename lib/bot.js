"use strict";
var config = require('./config');
var HttpClient = require('./http_client');

var QQBot = function () {
	var self = this;
	self.client = new HttpClient();
	self.client_id = 53999199;
    self.ptwebqq = '';
    self.psessionid = '';
    self.appid = 0;
    self.vfwebqq = '';
    self.qrcode_path = config.QR_CODE_PATH;
    self.username = '';
    self.account = 0;

    self._login_by_qrcode = function(){
    	let qr_validation_url = "https://ssl.ptlogin2.qq.com/ptqrlogin?"+
                            "webqq_type=10&remember_uin=1&login2qq=1&aid={0}"+
                            "&u1=http%3A%2F%2Fw.qq.com%2Fproxy.html%3Flogin2qq%3D1%26webqq_type%3D10"+
                            "&ptredirect=0&ptlang=2052&daid=164&from_ui=1&pttype=1&dumy="+
                            "&fp=loginerroralert&action=0-0-{1}&mibao_css={2}"+
                            "&t=undefined&g=1&js_type=0&js_ver={3}&login_sig={4}",
            init_url = "https://ui.ptlogin2.qq.com/cgi-bin/login?"+
                   "daid=164&target=self&style=16&mibao_css=m_webqq"+
                   "&appid=501004106&enable_qlogin=0&no_verifyimg=1"+
                   "&s_url=http%3A%2F%2Fw.qq.com%2Fproxy.html"+
                   "&f_url=loginerroralert&strong_login=1"+
                   "&login_state=10&t=20131024001",
            html = '',
            star_time = '',
        	error_times = 0,
            login_result = 0,
            down_Qr = function(appid){
                error_times += 1;
                console.log("Downloading QRCode file...");
                let url = "https://ssl.ptlogin2.qq.com/ptqrshow?appid="+appid+"&e=0&l=L&s=8&d=72&v=4";
                self.client.download(url,self.qrcode_path);
            },
            check_Login = function(){
                let login_result = self.client.get(
                    qr_validation_url.format(
                    appid,
                    date_to_millis(datetime.datetime.utcnow()) - star_time,
                    mibao_css,
                    js_ver,
                    sign
                ),init_url);
            };

        self.client.get(init_url,function(body){
            html += body;
        	let appid = html.match(/<input type="hidden" name="aid" value="(\d+)" \/>/g)[0].match(/\d+/g)[0],
                sign = "",
                js_ver = html.match(/g_pt_version=encodeURIComponent\("(\d+)"\)/)[0].match(/\d+/g)[0],
                mibao_css = html.match(/g_mibao_css=encodeURIComponent\("(.+?)"\)/)[0].match(/\("(.+?)"\)/)[1];
            down_Qr(appid);
        });
    }
}

var qqBot = new QQBot();
qqBot._login_by_qrcode();

