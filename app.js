var express = require('express');
var app = express();
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', function(request, response) {
  console.log('inside the app')
  response.render(
    'index',
    {title: '253-Hello-Web-Servers'})
})




app.listen(3000, function() {
  console.log('listening on --> port 3000')
})
