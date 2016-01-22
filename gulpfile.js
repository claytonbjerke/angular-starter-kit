var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    lazy: true
});

var args = require('yargs').argv;
var browserSync = require('browser-sync');
var del = require('del');
var _ = require('lodash');

var config = require('./gulp.config')();

var port = process.env.PORT || config.defaultPort;

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);
gulp.task('analyze', function () {

    log('Analyzing source with JSHint and JSCS');
    log('**NOTE: View all files analyzed: \'gulp analyze --verbose\'');

    return gulp
        .src(config.alljsFiles)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jscs.reporter())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('serve-dev', ['styles'], function () {

    var isDev = true;

    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': 'development'
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
        .on('start', function () {
            log('*** nodemon started');
            startBrowserSync();
        })
        .on('crash', function () {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            log('*** nodemon exited cleanly');
        });
});

gulp.task('styles', ['styles-clean'], function () {

    log('Compiling Less --> CSS');

    return gulp
        .src(config.less)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', '> 5%']
        }))
        .pipe(gulp.dest(config.temp));
});

gulp.task('styles-less-watcher', function () {
    gulp.watch([config.less], ['styles']);
});

gulp.task('styles-clean', function (done) {
    var files = config.temp + '**/*.css';
    clean(files, done);
});

/////////////
function startBrowserSync() {

    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port: ' + port);

    gulp.watch([config.less], ['styles'])
        .on('change', function (event) {
            changeEvent(event);
        });

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: [
            config.client + '**/*.*',
            '!' + config.less,
            config.temp + '**/*.css'
        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    };

    browserSync(options);

}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File: ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

/**
 * Delete files at a given path
 */
function clean(path, done) {
    log('' + $.util.colors.blue(path));
    del(path).then(function () {
        done();
    });
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
