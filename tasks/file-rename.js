/*
 * grunt-file-rename
 * https://github.com/mrbatista/grunt-file-rename
 *
 * Copyright (c) 2017 Matteo Padovano
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var async = require('async');
  var path = require('path');
  var fs = require('fs');

  String.prototype.toCapitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('fileRename', 'Grunt plugin to rename files', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var done = this.async();
    
    var options = this.options({
      cwd: '.',
      delimiter: ''
    });
    
    var data = this.data;
    
    if (!data.src) {
      grunt.fail.fatal('src is required');
    }

    var files = grunt.file.expand({
      filter: 'isFile',
      cwd: options.cwd
    }, data.src);
    
    if (files.length === 0) {
      grunt.fail.fatal('Error no file found');
    }

    async.each(files, function(file, cb) {
      var dirname = path.dirname(file);
      var extname = path.extname(file);
      var filename = path.basename(file, extname);

      switch (options.lettercase) {
        case 'uppercase':
          filename = filename.toUpperCase();
          break;
        case 'lowercase':
          filename = filename.toLowerCase();
          break;
        case 'capitalize':
          filename = filename.toCapitalize();
          break;
        case 'titlecase':
          filename = filename.toTitleCase();
          break;
      }

      //prepend
      if (typeof options.prepend === 'string') {
        filename = options.prepend + options.delimiter + filename;
      }
      
      //append
      if (typeof options.append === 'string') {
        filename = filename + options.delimiter + options.append ;
      }
      
      var newFilename = dirname + '/' + filename + extname;
      
      // update file name
      fs.rename(file, newFilename, function(err) {
        if (err) {
          grunt.log.error('File "' + file + '" failed to rename.');
          return cb(err);
        }

        grunt.log.ok('File "' + file + '" renamed correctly to "' + newFilename + '".');
        cb();
      });
    }, function(err) {
      if (err) {
        return done(err);
      }
      grunt.log.ok(files.length + ' files renamed correctly.');
      done();
    });
  });
};
