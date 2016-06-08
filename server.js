var express = require('express'),
		mongoose = require('mongoose'),
    ingredients = require('./routes/ingredients'),
		recipes = require('./routes/recipes'),
		vision = require('./routes/vision'),
		likes = require('./routes/likes'),
		main = require('./routes/main'),
    app = express();

// mongodb connect
mongoose.connect('mongodb://60132263:dutls123@ds061984.mlab.com:61984/surveyna');
mongoose.connection.on('error', console.log);

app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/ingredients', ingredients.findIngredient_main);
app.get('/recipes', recipes.searchRecipe);
app.get('/vision', vision.mappingVision);
app.get('/likes', likes.addLikes);
app.get('/main', main.sortingLikes);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
