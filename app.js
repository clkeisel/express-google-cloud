const createError = require('http-errors');
const express = require('express');
const path = require('path');
const Datastore = require('@google-cloud/datastore');
const app = express();

// Start server
const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Example app listening at http://${host}:${port}`);
});

// Setup db connection
const projectId = 'true-solutions-207814';
const datastore = new Datastore({
    projectId: projectId,
});

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup Routes
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

// Catch 404 and pass to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = datastore;