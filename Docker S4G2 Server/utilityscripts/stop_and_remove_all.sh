#! /bin/bash

#Show the users the currently running processes.  
docker ps -a

#Check to see if any containers are currently running.  
if [[ "$(docker ps -a -q 2> /dev/null)" != "" ]]; then
	#Stop and remove all containers if they exist.  
	echo "Stopping all docker containers..."
	docker stop $(docker ps -a -q)
	echo ""

	echo "Removing all stopped containers..."
	docker rm $(docker ps -a -q)
	echo ""
else
	echo "No running instances of s4gserver to remove!"
fi

#Show the users the currently running processes again.  
echo "Looks good?"
docker ps -a