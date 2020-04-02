const helpers = require('../support/helpers');

module.exports.index = (req, res) => {
    helpers.auth(req).then((model) => {
        console.log(model);
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        res.render('index', { title: 'Express' });
    });
}