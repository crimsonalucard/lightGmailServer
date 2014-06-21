#!/bin/bash
#make sure that you have httpie installed
http POST localhost:8000 from='nodemailer@tylerred.com' subject='test subject' text='test text'