module.exports = function () {

    var client = './src/client/';
    var server = './src/server/';

    var config = {

        /**
         * File paths
         */
        client: client,
        alljsFiles: [
            './src/**/*.js',
            './*.js'
        ],
        less: client + 'styles/styles.less',
        server: server,
        temp: './.tmp/',
        source: 'src/',

        defaultPort: 7203,
        nodeServer: server + 'server.js',
    };

    return config;

};
