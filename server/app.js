var createError = require('http-errors');
var express = require('express');
require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require('./config/db');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productRoutes = require('./routes/product'); 
const cartRoutes = require('./routes/cart'); 
const wishlistRoutes = require('./routes/wishlist'); 
connectDB();
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const cors = require('cors');
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
