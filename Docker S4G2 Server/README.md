# Welcome to the S4G2 Server!
This is a HAPI FHIR server built with FHIR DSTU3 compliance and portability in mind.  

## Setting up the repo.  
First things first, make sure that you have docker installed, and a cloned copy of the repository.  
Now, navigate to the utilityscripts/ subdirectory, and then run ```./make_all_runnable.sh```.  This changes all run permissions so that you don't have to.  
You now have a set of scripts with which to automate your workflow.  Run ```./build_s4g.sh``` in order to build a docker image (which you can then run directly from ```docker images``` or you can simply use ```./run_s4g.sh```.  These scripts will automatically remove running processes and images, but will prompt you before removing images (since I recognize that they take a while to build).  

Note that when you run the S4G server image, you have the ability to wait indefinitely before running it.  This is because at times it is more convenient to edit runtime files with ```vim``` before running the actual server (otherwise you have to build everything over again after making a very small change, and ```docker commit``` is garbage).