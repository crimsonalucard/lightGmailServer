lightGmailServer
================

a light gmail server for heroku. Can be used without heroku.

Requires heroku toolset and jq the json command line parser to use the scripts properly.

Place your gmail username, password and email recipient into
    {
        "user":"user@gmail.com",
        "pass":"yourpass",
        "to":"recipient@gmail.com, anotherrecipient@yahoo.com"
    }
    
then run ./herokupush.sh

if you don't have jq then you will need to manually place your user variables using heroku, using the commands below. 

    heroku config:set user="yourusername@gmail.com"
    heroku config:set pass="yourpassword"
    heroku config:set to="recipient@yahoo.com, recipient2@url.com"
