const appConfig = require('config');

const config = {
    mongodb: {
        url: appConfig.get('db.url'),

        databaseName: 'test',

        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },

    // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
    migrationsDir: 'migrations',

    // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
    changelogCollectionName: 'changelog'
};

module.exports = config;