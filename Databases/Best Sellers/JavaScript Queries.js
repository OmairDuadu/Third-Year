//Design 1
//Selection of all documents in a collection, in JSON format.

    use BestSellers;
    db.getCollection("BestSellers1").find({});
  
    
//Selection of embedded array data, based on selection criteria.
//-querying the Genre embedded array data
use BestSellers;
db.getCollection("BestSellers1").find(
    { 
        "User. Rating" : "4.5"
    }
);
    
    
//Selection showing Projection.
//-Ratings greater than 4.5, projecting the name & author
use BestSellers;
db.getCollection("BestSellers1").find(
    { 
        "User. Rating" : { 
            "$gt" : "4.5"
        }
    }, 
    { 
        "Name" : 1.0, 
        "Author" : 1.0
    }
);


//Selection with sorted output
//-sorted based on price.
use BestSellers;
db.getCollection("BestSellers1").find(
    { 
        "User. Rating" : { 
            "$gt" : "4.5"
        }
    }, 
    { 
        "Name" : 1.0, 
        "Author" : 1.0, 
        "Price" : 1.0
    }
).sort(
    { 
        "Price" : 1.0
    }
);



//Aggregation
//-Getting the avg rating of authors and sorting based on id
use BestSellers;
db.getCollection("BestSellers1").aggregate(
    [
        { 
            "$group" : { 
                "_id" : "$Author", 
                "average_rating" : { 
                    "$avg" : "$User. Rating"
                }
            }
        }, 
        { 
            "$sort" : { 
                "_id" : 1.0
            }
        }
    ], 
    { 
        "allowDiskUse" : true
    }
);



//Update
//-updating the value of all ratings to be 5.0
use BestSellers;
db.getCollection("BestSellers1").aggregate(
    [
        { 
            "$set" : { 
                "User. Rating" : 5.0
            }
        }
    ], 
    { 
        "allowDiskUse" : true
    }
);


//Design 2
//
//Selection of all documents in a collection, in JSON format.
use BestSellers;
db.getCollection("BestSellers2").find({});


//Selection of embedded array data, based on selection criteria.
//-querying the Genre embedded array data
use BestSellers;
db.getCollection("BestSellers2").find(
    { 
        "Info. Genre" : "Non Fiction"
    }
);



//Selection showing Projection.
//-Ratings greater than 4.5, projecting the name & author
use BestSellers;
db.getCollection("BestSellers2").find(
    { 
        "User. Rating" : { 
            "$gt" : "4.5"
        }
    }, 
    { 
        "Name" : 1.0, 
        "Author" : 1.0
    }
);



//Selection with sorted output
//-sorted based on price.
use BestSellers;
db.getCollection("BestSellers2").find(
    { 
        "User. Rating" : { 
            "$gt" : "4.5"
        }
    }, 
    { 
        "Name" : 1.0, 
        "Author" : 1.0, 
        "Price" : 1.0
    }
).sort(
    { 
        "Price" : 1.0
    }
);


//Aggregation
//-Getting the avg rating of authors and sorting based on id
use BestSellers;
db.getCollection("BestSellers2").aggregate(
    [
        { 
            "$group" : { 
                "_id" : "$Author", 
                "average_rating" : { 
                    "$avg" : "$User. Rating"
                }
            }
        }, 
        { 
            "$sort" : { 
                "_id" : 1.0
            }
        }
    ], 
    { 
        "allowDiskUse" : true
    }
);


//Update
//-updating the value of all ratings to be 5.0
use BestSellers;
db.getCollection("BestSellers2").aggregate(
    [
        { 
            "$set" : { 
                "User. Rating" : 5.0
            }
        }
    ], 
    { 
        "allowDiskUse" : true
    }
);

