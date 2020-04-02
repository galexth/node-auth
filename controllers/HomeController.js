const helpers = require('../support/helpers');
const user = require('../models/user');

module.exports.index = (req, res) => {
    helpers.auth(req).then(model => {
        console.log(model);
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        res.render('index', { title: 'Express' });
    });
}