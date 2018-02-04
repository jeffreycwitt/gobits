var express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback')

// Create our app

// var app = express();
// const PORT = process.env.PORT || 3000;
//
//
// app.use(function(req, res, next){
// 	if (req.headers['x-forwarded-proto'] === 'https'){
// 		res.redirect('http://' + req.hostname + req.url);
// 	}
// 	else {
// 		next();
// 	}
// });
//
// app.use(express.static('public'));
//
// app.listen(PORT, function(){
// 	console.log("Express server is up on port" + PORT);
// });



const app = express()
const staticFileMiddleware = express.static(path.join(__dirname, 'public'))

app.use(staticFileMiddleware)
app.use(history())
app.use(staticFileMiddleware)
// ^ `app.use(staticFileMiddleware)` is included twice as per https://github.com/bripkens/connect-history-api-fallback/blob/master/examples/static-files-and-index-rewrite/README.md#configuring-the-middleware

// app.get('/', function (req, res) {
//   res.render(path.join(__dirname + 'public/index.html'))
// })

app.listen(3000, function () {
  console.log( 'Express serving on 3000!' )
})
