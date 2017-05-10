module.exports = function (app) {
    app.use('/', require('./static/index'));
    app.use('/api/scores', require('./api/scores'));
};