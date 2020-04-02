const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(config.get('db.uri'), config.get('db.options')).then(() => {
    console.log('Mongo connected.')
});

module.exports = mongoose;