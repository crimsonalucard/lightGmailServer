/**
 * Created by brian on 6/20/14.
 */

var http			=	require("http");
var nodemailer 		= 	require("nodemailer");
var fs				=	require('fs');
var url				=	require('url')

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

var filename 		=	process.argv[2]?process.argv[2]:"emailLogin.json";
var fileString 		=	fs.readFileSync(filename);
var fileObject		=	JSON.parse(fileString);
var smtpTransport 	=	createsmtpTransport(fileObject.user, fileObject.pass);

var server = http.createServer(function(request, response){
	var data = ""
	if(request.method === 'POST'){
		response.writeHead( 200, {'Content-Type':'application/json'});
		request
			.on('data', function(chunk){
				data+=chunk;
			})
			.on('end', function(){
				console.log('data received, sending email...');
				var mailOptions = JSON.parse(data);
				mailOptions.to = fileObject.to;


				smtpTransport.sendMail(mailOptions, function(error){
					if(error){
						console.log(error);
						response.end(JSON.stringify([false]));
					}
					else{
						response.end(JSON.stringify([true]));
					}
				});
			});
	}
});

server.listen(8000);
