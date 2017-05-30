#! /bin/bash

#NOTE: Run as such: 'docker run -i -t -p 3000:3000 s4gserver' !!!!!!!!!  Otherwise the code can't read console input.  
#ALSO: Before running the server, you MUST go to the top of your screen and RESTART DOCKER.  Otherwise the MongoClient won't connect.

read  -n 1 -p "Press any key to run the server initialization steps!"

echo ""

echo "Starting Apache Tomcat and HAPI FHIR..."
/root/tomcat/bin/startup.sh

echo ""

echo "Starting GA4GH backend..."
ga4gh_server & 

echo ""

echo "Starting MongoDB ..."
cd /root/s4gserver
mongod --quiet &
sleep 1;

echo ""

echo "Running scope loading script..."
python load_data.py

echo ""

echo "Starting S4G2 server..."
npm start