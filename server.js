const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const request = require('request');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req1, res1){
    var first = req1.body.fName;
    var middle = req1.body.mName;
    var last = req1.body.lName;

    var data={
        email_address: first,
        status: "subscribed",
        merge_fields:{
          FNAME: middle,
          LNAME: last
        }
    }
    
  // Converting string data to JSON data
  const jsonData= JSON.stringify(data);
  const url="https://us21.api.mailchimp.com/3.0/lists/5c51e7dce9/members";
  const options={
    method:"POST",
    auth:"key:7130c8ec20b2a046d075e17e72b45996-us21",
    Headers:{
      'content-type': 'application/json'
    }
  }
    
  // On success send users to success, otherwise on failure template 
  const request=https.request(url,options,function(response){
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
    request.write(jsonData);
    request.end();
  });


app.listen(3000,function(){
    console.log("Server1 started on port 3000");
})


//7130c8ec20b2a046d075e17e72b45996-us21  5c51e7dce9