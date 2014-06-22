#!/bin/bash
heroku config:set user=$(jq '.user' emailLogin.json)
heroku config:set pass=$(jq '.pass' emailLogin.json)
heroku config:set to=$(jq '.to' emailLogin.json)
closure-compiler email-server.js > email-server.min.js
git commit -am "compiling..."
git push heroku master
