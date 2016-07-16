var HttpClient = require('../lib/http_client');

var httpClient = new HttpClient();

httpClient.get('http://www.baidu.com',function (b) {
	console.log(b);
});

