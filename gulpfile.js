var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');
var config = require('./gulp.config')();

var $ = require('gulp-load-plugins')({
    lazy: true
});

var _ = require('lodash');

/*
TODO:
- dev task
- file watcher
*/

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

gulp.task('styles', ['styles-clean'], function () {

    log('Compiling Less --> CSS');

    return gulp
        .src(config.less)
        .pipe($.plumber())
        .pipe($.less())
        //.on('error', errorLogger)
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', '> 5%']
        }))
        .pipe(gulp.dest(config.temp));
});

gulp.task('styles-less-watcher', function () {
    gulp.watch([config.less], ['styles']);
});

gulp.task('styles-clean', function () {
    var files = config.temp + '**/*.css';
    clean(files);
});

/////////////
function errorLogger(error) {
    log('*** Start of Error ***');
    log(error);
    log('*** End of Error ***');
    this.emit('end');
}

function clean(path, done) {
    log('' + $.util.colors.blue(path));
    del(path);
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
