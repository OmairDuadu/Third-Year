db.getCollection("BestSellers2").aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$set: { 
			    "User. Rating" : 5   
			    
			}
		},
	],

	// Options
	{
		allowDiskUse: true
	}

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
