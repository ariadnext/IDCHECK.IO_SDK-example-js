const {init, start, getResults, getImage} = require('../middleware');

function handleError(res, error) {
    res.statusCode = 500;
    if (error.response && error.response.data) {
        res.send(error.response.data);
    } else if (typeof error === 'string') {
        res.send({errorCode: error, errorMessage: error});
    } else {
        res.send(error);
    }
}

module.exports = function (app) {

    init();

    app.get('/api/start', (req, res) => {
        start().then((data) => {
            res.send(data);
        }).catch((error) => {
            handleError(res, error);
        });
    });

    app.get('/api/results/:fileUid', (req, res) => {
        getResults(req.params.fileUid).then((data) => {
            res.send(data);
        }).catch((error) => {
            handleError(res, error);
        });
    });

    app.get('/api/document/:documentUid/image/:imageUid', (req, res) => {
        getImage(req.params.documentUid, req.params.imageUid).then((data) => {
            res.write(data);
            res.end();
        }).catch((error) => {
            handleError(res, error);
        });
    });

};
