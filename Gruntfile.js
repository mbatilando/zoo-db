'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'public/css/form.css': 'sass/form.scss',
          'public/css/common.css': 'sass/common.scss',
          'public/css/authentication.css': 'sass/authentication.scss',
          'public/css/main-layout.css': 'sass/main-layout.scss',
          'public/css/header.css': 'sass/header.scss',
          'public/css/sidebar.css': 'sass/sidebar.scss',
          'public/css/animal-search.css': 'sass/animal-search.scss',
          'public/css/animal-search-sub.css': 'sass/animal-search-sub.scss',
          'public/css/animal-profile.css': 'sass/animal-profile.scss',
          'public/css/admin-dashboard.css': 'sass/admin-dashboard.scss'
        }
        // files: [{
        //   expand: true,
        //   src: ['sass/*.scss'],
        //   dest: 'public/css',
        //   ext: '.css'
        // }]
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      views: {
        files: [
          'app/views/*.jade',
          'app/views/**/*.jade'
        ],
        options: { livereload: reloadPort }
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ['develop', 'watch', 'sass']);
};
