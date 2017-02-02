'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.file_rename = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(2);

    test.equal(grunt.file.exists('tmp/default_options'), true);
    test.equal(grunt.file.exists('tmp/default_options.json'), true);

    test.done();
  },
  custom_options: function(test) {
    test.expect(2);

    test.equal(grunt.file.exists('tmp/custom_options-test'), true);
    test.equal(grunt.file.exists('tmp/custom_options-test.json'), true);

    test.done();
  },
};
