FROM node:latest
ENV DEBIAN_FRONTEND noninteractive
ARG hapi_src=http://45.79.176.169/downloads/FHIR-server_dstu3.war

#Update package definitions.  
RUN apt-get update -y

#Remove unused packages. 
RUN apt-get upgrade -y

#Added by Makiah May 4: Otherwise you get the error that package configuration is being delayed since apt-utils is not installed.  
RUN apt-get install apt-utils -y

#Added by Makiah May 5: Helps edit in-container files.  
RUN apt-get install vim -y

#Install the JDK.  
RUN apt-get install default-jdk -y

#Install WGET, an internet file retrieval tool.  
RUN apt-get install wget -y

#Install the database manager (MongoDB)
RUN apt-get install -y mongodb

#Install the required python suite.  
RUN apt-get install python-pip python-dev g++ build-essential -y
RUN pip install --upgrade pip

#Added by Makiah May 5: Otherwise you get an error upon python trying to run cryptographic tools.  
RUN pip install --upgrade cffi

#Install the GA4GH backend along with python-based Mongo.  
RUN pip install pymongo ga4gh

#Create required data directories for MongoDB
RUN mkdir /data
RUN mkdir /data/db

#Download Tomcat and enable it
RUN wget http://www-eu.apache.org/dist/tomcat/tomcat-8/v8.5.15/bin/apache-tomcat-8.5.15.tar.gz
RUN mkdir /root/tomcat
RUN tar -xzvf apache-tomcat-8*.tar.gz -C /root/tomcat --strip-components 1
ADD $hapi_src /root/tomcat/webapps/
COPY . /root/s4gserver
WORKDIR /root/s4gserver

#Download GA4GH example data.  
RUN wget https://github.com/ga4gh/server/releases/download/data/ga4gh-example-data_4.6.tar
RUN tar -xvf ga4gh-example-data_4.6.tar

#Install Node.JS components.  
RUN npm install
RUN npm install -g webpack
RUN npm install bower -g
RUN bower install jquery --allow-root
RUN bower install bootstrap --allow-root
RUN bower install semantic --allow-root
RUN npm run build

#Enable connections to this server from localhost on port 3000.  
EXPOSE 3000

#Run the next run script.  
CMD ["./run.sh"]
