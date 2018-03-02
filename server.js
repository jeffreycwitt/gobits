// const path = require('path');
// const express = require('express');
// const app = express();
// const publicPath = path.join(__dirname, 'public');
//
// app.use(express.static(publicPath));
//
// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(publicPath, 'index.html'));
// // });
//
// app.listen(3000, () => {
//   console.log('Server is up!');
// });

var express = require('express')
const path = require('path')


// Create our app

var app = express();
const PORT = process.env.PORT || 3000;

// HEROKU Doesn't seem to work without this https redirect
app.use(function(req, res, next){
	if (req.headers['x-forwarded-proto'] === 'https'){
		res.redirect('http://' + req.hostname + req.url);
	}
	else {
		next();
	}
});

app.use(express.static('docs'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.listen(PORT, function(){
	console.log("Express server is up on port" + PORT);
});


//
// const app = express()
// const staticFileMiddleware = express.static(path.join(__dirname, 'public'))
//
// app.use(staticFileMiddleware)
// app.use(history())
// app.use(staticFileMiddleware)
// // ^ `app.use(staticFileMiddleware)` is included twice as per https://github.com/bripkens/connect-history-api-fallback/blob/master/examples/static-files-and-index-rewrite/README.md#configuring-the-middleware
//
// app.get('/', function (req, res) {
//   res.render(path.join(__dirname + '/index.html'))
// })
//
// app.listen(3000, function () {
//   console.log( 'Express serving on 3000!' )
// })
