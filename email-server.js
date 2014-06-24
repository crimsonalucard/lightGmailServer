/**
 * Created by brian on 6/20/14.
 */

var http			=	require("http");
var nodemailer 		= 	require("nodemailer");
var fs				=	require('fs');
var url				=	require('url');

var createsmtpTransport = function(user, pass){
	var smtpTransport = nodemailer.createTransport("SMTP",{
    	service: "Gmail",
    	auth: {
        	user: user,
        	pass: pass
    	}
	});
	return smtpTransport;
}

var port			=	Number(process.env.PORT || 8000);
var filename 		=	process.argv[2]?process.argv[2]:"emailLogin.json";

if(fs.existsSync(filename)) {
	var fileString	=	fs.readFileSync(filename);
	var fileObject	=	JSON.parse(fileString);
}else{
	var fileObject	=	{
		"user"	:	process.env.user,
		"pass"	:	process.env.pass,
		"to"	:	process.env.to
	}
}
var smtpTransport 	=	createsmtpTransport(fileObject.user, fileObject.pass);

var server = http.createServer(function(httpRequest, httpResponse){
	var data = "";
	if(httpRequest.method === 'POST'){
		httpResponse.writeHead( 200, {'Content-Type':'application/json'});
		httpRequest
			.on('data', function(chunk){
				data+=chunk;
			})
			.on('end', function(){
				var mailOptions = JSON.parse(data);
				mailOptions.to = fileObject.to;


				smtpTransport.sendMail(mailOptions, function(emailError, emailResponse){
					if(emailError){
						httpResponse.end(JSON.stringify(emailError));
					}
					else{
						httpResponse.end(JSON.stringify(emailResponse));
					}
				});
			});
	} else if(httpRequest.method === "HEAD"){//CORS
		httpResponse.writeHead(200, {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Credentials": "false",
			"Access-Control-Max-Age": "86400",
			"Access-Control-Allow-Headers": "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
		});

	} else if(httpRequest.method === "OPTIONS"){//CORS
		httpResponse.writeHead(200, httpRequest.headers);
		httpResponse.end();


	}
	else{
		httpResponse.writeHead( 200, {'Content-Type':'text/plain'});
		httpResponse.end("The email server is running. Please use POST to send a message. ");
	}
});

server.listen(port);
