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

var server = http.createServer(function(request, response){
	var data = "";
	if(request.method === 'POST'){
		response.writeHead( 200, {'Content-Type':'application/json'});
		request
			.on('data', function(chunk){
				data+=chunk;
			})
			.on('end', function(){
				var mailOptions = JSON.parse(data);
				mailOptions.to = fileObject.to;


				smtpTransport.sendMail(mailOptions, function(error){
					if(error){
						//won't do logging for now....
						console.log(error);
//						response.end(JSON.stringify([false]));
						response.end(JSON.stringify(error));
					}
					else{
						response.end(JSON.stringify([true]));
					}
				});
			});
	}
	else{
		console.log("test!");
		response.writeHead( 200, {'Content-Type':'text/plain'});
		response.end("The email server is running. Please use POST to send a message. ");
	}
});

server.listen(port);
