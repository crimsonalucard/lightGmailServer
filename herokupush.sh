#!/bin/bash
closure-compiler email-server.js > email-server.min.js
git commit -am "compiling..."
git push heroku master
