const crypto = require('crypto');
const user = require('../models/user');

module.exports.hash = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

module.exports.generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

module.exports.auth = (req) => {
    return user.findById(req.session.user_id);
}

module.exports.wrap = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
};