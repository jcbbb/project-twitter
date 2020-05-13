const app = require('./app');

app.listen(app.get('port'), () => {
    console.log('App is running on port :%d', app.get('port'));
    console.log('Press CTRL - C to stop the server');
});
