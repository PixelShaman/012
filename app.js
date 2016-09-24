/*var phantom = require('phantom');
phantom.create(function(ph) {
  return ph.createPage(function(page) {
    return page.open("http://www.google.com", function(status) {
      console.log("opened google? ", status);
      return page.evaluate((function() {
        return document.title;
      }), function(result) {
        console.log('Page title is ' + result);
        return ph.exit();
      });
    });
  });
});*/

var http = require('http');
const PORT=8080; 
var phantom = require('phantom');

var sitepage = null;
var phInstance = null;
var stuff;

phantom.create()
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
    .then(page => {
        sitepage = page;
        return page.open('http://www.york.ac.uk/teaching/cws/wws/webpage1.html');
    })
    .then(status => {
        console.log(status);
        return sitepage.property('content');
    })
    .then(content => {
        //console.log(content);
        //var stuff = sitepage.evaluate(function() {return document.getElementById('nic2')});
        //console.log(stuff);
        //console.log(content);
        stuff = content;
        sitepage.close();
        phInstance.exit();
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });


function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url + '<br/><br/><br/>'+stuff);
}

var server = http.createServer(handleRequest);
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);

});


