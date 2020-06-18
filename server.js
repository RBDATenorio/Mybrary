if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' })
  }
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');

const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(express.json());
app.use(express.static('public'));

// connection with database
//mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex : true})

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);
app.use('/authors', authorsRouter);

app.listen(process.env.PORT || 8484);