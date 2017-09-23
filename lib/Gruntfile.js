module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      files: {
        src: '../javascripts/main.js',
        dest: '../dist/app.js'
      },
      options: {
        browserifyOptions: {
          paths: ["./node_modules"]
        }
      }
    },
    jshint: {
      options: {
        predef: [ "document", "console", "alert" ],
        esnext: true,
        globalstrict: true,
        globals: {},
        browserify: true
      },
      files: ['../javascripts/**/*.js']
    },
    watch: {
      options: {
        reload: true,
      },
      javascripts: {
        files: ['../js/*.js'],
        tasks: ['jshint', 'browserify']
      },
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'browserify', 'watch']);
};
