var defer = require('config/defer').deferConfig;

const config = {
    host: 'localhost',
    port: 3000,
    db: {
        name: 'testauth',
        url: 'mongodb+srv://app:BABi4sWuUfZHRuMI@cluster0-h7wkg.mongodb.net',
        uri: defer(function () {
            return `${this.db.url}/${this.db.name}?retryWrites=true&w=majority`;
        }),
        options: {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }
    }
}

module.exports = config;