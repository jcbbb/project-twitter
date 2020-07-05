const { server, app } = require('./app');

server.listen(app.get('port'), () => {
    console.log('App is running on port :%d', app.get('port'));
    console.log('Press CTRL - C to stop the server');
});

module.exports = server;
