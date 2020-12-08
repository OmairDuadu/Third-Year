db.getCollection("BestSellers2").aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$group: { 
			    "_id" : "$Author",
			    "average_rating": {
			        "$avg" : "$User. Rating"    
			    }
			}
		},

		// Stage 2
		{
			$sort: { 
			    "_id" : 1.0
			}
		},
	],

	// Options
	{
		allowDiskUse: true
	}

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
