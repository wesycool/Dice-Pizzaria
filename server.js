const express = require('express')
const exphbs = require('express-handlebars');
const routes = require('./controllers/controller.js')

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'))
app.use(express.json());
app.use(routes);


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    console.log('Server listening on: http://localhost:' + PORT);
});