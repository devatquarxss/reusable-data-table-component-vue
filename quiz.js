var http = require('http');
// Assuming you have already done "npm install fernet"
let fernet = require('fernet')

//create a server object:
http.createServer(function (req, res) {
	let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
	// Oh no! The code is going over the edge! What are you going to do?
	let message = 'gAAAAABcp9sPQanPlwfrEwBzxrvWapcz7UYaCWH9iAFS-SpAsLACzHTH8mVHk_YV1AIz0QsGlX7Hj7VQYJl7oZtzPVMpVWkGSTZhNQAbNeL1MGzolE4wvodXDb_1JCZppQNTmDzQH8hAoDOmSeM3PdOogWCV0i3pkUGDfN_GoLur6rWI1jBNHvSglIAsv_AJSm99LBzjbhA2'
	let token = new fernet.Token({secret, token: message, ttl:0})

  	res.end(token.decode()); // https://engineering-application.britecore.com/e/t5e119s3t/testMidLevelFrontendDeveloper
}).listen(8080);
