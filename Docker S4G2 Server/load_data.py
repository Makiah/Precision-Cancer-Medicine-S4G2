from pymongo import MongoClient
import json

# Obtain the client and the database information.
print "Setting MongoClient information.  "
client = MongoClient("mongodb://localhost")
s4gDB = client.s4gserver

# Check to see whether db.scopes already exists, and if it has content, then don't try to add anything new to it.  
scopes_already_loaded = False
try: 
	# db.scopes might not exist: I think this is where the file was messing up to begin with.  
	scopes_already_loaded = s4gDB.scopes.count() > 0
except: 
	pass

#If no scopes have already been added, 
if not (scopes_already_loaded): 
	# Open the data file which contains the scope specifications.
	print "Opening data file and reading scopes"
	data_file = open('./init_data.json', 'r')
	origin_data = json.loads(data_file.read())
	scope_data = origin_data['scopes']

	#Attempt to add all scopes, and if an error occurs, mention that it couldn't load a scope to the user.  
	for scope in scope_data:
		print "Attempting to load a scope..."
		try:
			#Try to insert a scope into the db.scopes collection.  
			s4gDB.scopes.insert_one(scope)
			print "Successfully loaded a scope!!"
			print ""
		except: 
			print "Oh no!  An error occurred upon attempting to insert the scope!"
			print ""
else: 
	#This is unlikely but still a possibility.  
	print "db.scopes already exists and has loaded scopes: no need to add scopes!"