/**
 * grunt-pagespeed-ngrok
 * http://www.jamescryer.com/grunt-pagespeed-ngrok
 *
 * Copyright (c) 2014 James Cryer
 * http://www.jamescryer.com
 */
'use strict'

var ngrok = require('ngrok');

module.exports = function(grunt) {

  // Load grunt tasks
  require('load-grunt-tasks')(grunt);

  // Grunt configuration
  grunt.initConfig({
    pagespeed: {
      options: {
        nokey: true,
        locale: "en_GB",
        threshold: 40
      },
      local: {
        options: {
          strategy: "desktop"
        }
      },
      mobile: {
        options: {
          strategy: "mobile"
        }
      }
    },
    image: {
      static: {
        options: {
          pngquant: true,
          optipng: false,
          zopflipng: true,
          jpegRecompress: false,
          jpegoptim: true,
          mozjpeg: true,
          gifsicle: true,
          svgo: true
        },
      },
      dynamic: {
        files: [{
          expand: true,
          // cwd: 'img/',
          cwd: 'views/images/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/'
        }]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },
    critical: {
      test: {
        options: {
          inline: true,
          base: 'dist/',
          css: [
              'css/style.css'
          ],
          minify: true
        },
        src: 'index.html',
        dest: 'test/index-critical.html'
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'dist/index.html': 'test/index-critical.html'     // 'destination': 'source'
        }
      }
    },
  });

  // Register customer task for ngrok
  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
    var done = this.async();
    var port = 8000;

    ngrok.connect(port, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      grunt.config.set('pagespeed.options.url', url);
      grunt.task.run('pagespeed');
      done();
    });
  });

  // Register default tasks
  grunt.loadNpmTasks('grunt-image');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-critical');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.registerTask('default', ['psi-ngrok']);
}
