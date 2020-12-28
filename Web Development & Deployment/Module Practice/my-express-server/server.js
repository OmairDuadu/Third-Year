const express = require("express");

const app = express();

app.get("/", function(request, response){
    response.send("<h1>Hello, World</h1>")
});

app.get("/about", function(req, res){
    res.send("<h1>Hello I'm Omair Duadu</h1>")
});

app.get("/Contact", function(req, res){
    res.send("<h1>My Email is omairduadu@gmail.com</h1>")
});

app.listen(3000, function(){
    console.log("Server started on port 3000")
});