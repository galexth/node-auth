const crypto = require('crypto');
const user = require('../models/user');

module.exports.hash = (password) => crypto.createHash('sha256').update(password).digest('base64')

module.exports.generateAuthToken = () => crypto.randomBytes(30).toString('hex')

module.exports.auth = (req) => user.findById(req.session.user_id)

module.exports.wrap = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
};