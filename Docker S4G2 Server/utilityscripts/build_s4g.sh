#! /bin/bash

#Show the user the current list of images.
docker images

#Check to see if a s4gserver image already exists.  
if [[ "$(docker images -q s4gserver 2> /dev/null)" != "" ]]; then
	#Tell the user that we are about to remove the existent image.  
	read -t 10 -p "Found an existent s4gserver docker image, removing it in 10 seconds unless you Ctrl+C"
	
	#Remove all running containers.  
	./stop_and_remove_all.sh

	#Remove the s4gserver image.  
	echo "Removing image..."
	docker rmi s4gserver
fi

#Now build the image.  
echo
echo "This is gonna take SUPER long (round 5 mins), so brace yourself!"
echo
docker build -t "s4gserver" ~/Desktop/Precision\ Cancer\ Medicine/S4G2\ Server/

#Now show the images to the user again.  
docker images