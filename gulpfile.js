var gulp = require('gulp');
var args = require('yargs').argv;
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
    log('**NOTE: To view all analyzed files type: \'gulp analyze --verbose\' ');

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
