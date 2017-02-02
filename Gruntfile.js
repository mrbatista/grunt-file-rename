/*
 * grunt-file-rename
 * https://github.com/mrbatista/grunt-file-rename
 *
 * Copyright (c) 2017 Matteo Padovano
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    create: {
      default_options: {
        files: {
          'test': ['tmp/default_options', 'tmp/default_options.json']
        }
      },
      custom_options: {
        files: {
          'test': ['tmp/custom_options', 'tmp/custom_options.json']
        }
      }
    },

    // Configuration to be run (and then tested).
    file_rename: {
      default_options: {
        src: ['tmp/default_options', 'tmp/default_options.json']
      },
      custom_options: {
        options: {
          delimiter: '-',
          append: 'test'
        },
        src: ['tmp/custom_options', 'tmp/custom_options.json']
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-create');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'create', 'file_rename', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
