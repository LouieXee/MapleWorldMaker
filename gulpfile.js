'use strict';

const path = require('path');
const exec = require('child_process').exec;

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');
const ansiHtml = require('ansi-html');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

gulp.task('frontend', done => {
    const bs = browserSync.create();
    const compiler = webpack(require('./frontend/webpack.conf.dev.js'));

    compiler.plugin('done', stats => {
        if (stats.hasErrors() || stats.hasWarnings()) {
            return bs.sockets.emit('fullscreen:message', {
                title: 'Webpack Error:',
                body: ansiHtml(stats.toString()),
                timeout: 100000
            });
        }

        bs.reload();
    })

    bs.init({
        online: false,
        notify: false,
        proxy: 'localhost:8080',
        middleware: [
            webpackDevMiddleware(compiler, {
                noInfo: false,
                stats: {
                    colors: true
                }
            })
        ],
        plugins: [ require('bs-fullscreen-message') ]
    })

    return done();
})

gulp.task('backend', () => {
    return exec(`node ${path.resolve(__dirname, 'backend/index.js')}`);
})

gulp.task('serve', ['backend', 'frontend']);
