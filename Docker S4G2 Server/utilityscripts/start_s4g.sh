#! /bin/bash

#Ask the user if they have already restarted docker and stuff.  

#Run the server if it exists.  
if [[ "$(docker images -q s4gserver 2> /dev/null)" != "" ]]; then
	./stop_and_remove_all.sh

	while true; do
	    read -p "Have you restarted docker (y/n)?" yn
	    case $yn in
	        [Yy]* ) echo; break;;
	        [Nn]* ) echo "Well then whaddaya waiting for?!  I can't do it for you (not supported on mac)";;
	        * ) echo "Please answer yes or no.";
	    esac
	done

	echo "Running the S4G server!"
	docker run -i -t -p 3000:3000 s4gserver
else
	echo "Uh oh!  You don't have a server instance!  I suggest running ./build_s4g.sh"
fi