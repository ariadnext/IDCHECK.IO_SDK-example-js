const { init, start } = require('../middleware');

module.exports = function(app) {

    init();

    app.get('/start', (req, res) => {
        start().then((data) => {
            res.send(data);
        }).catch((error) => {
            res.statusCode = 500;
            res.send(error.code);
            console.error(error);
        });
    });

};
