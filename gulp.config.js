module.exports = function () {

    var client = './src/client/';

    var config = {

        temp: './.tmp/',

        /**
        * File paths
        */
        alljsFiles: [
            './src/**/*.js',
            './*.js'
        ],

        less: client + 'styles/styles.less'
    };

    return config;

};
