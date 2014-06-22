#!/bin/bash
heroku config:set user  =   $(jq '.user' emailLogin.json | sed -e 's/\"//g')
heroku config:set pass  =   $(jq '.pass' emailLogin.json | sed -e 's/\"//g')
heroku config:set to    =   $(jq '.to' emailLogin.json | sed -e 's/\"//g')
closure-compiler email-server.js > email-server.min.js
git commit -am "compiling..."
git push heroku master
