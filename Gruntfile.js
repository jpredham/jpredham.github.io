/**
* Joe's Gruntfile
*/

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
        options: {
            sourceMap: true,
            includePaths: ['scss'],
            precision: 6,
            sourceComments: false,
            sourceMap: true,
            outputStyle: 'expanded'
        },
        core: {
          files: {
            'dist/css/app.css': 'scss/app.scss'
          }
        }
    },

    cssmin: {
      options: {
        compatibility: 'ie9',
        keepSpecialComments: '*',
        sourceMap: true,
        advanced: false
      },
      core: {
        files: [
          {
            expand: true,
            cwd: 'dist/css',
            src: ['*.css', '!*.min.css'],
            dest: 'dist/css',
            ext: '.min.css'
          }
        ]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    watch: {
      src: {
        files: ["scss/**/*.scss"],
        tasks: ['dist-css']
      }
    },
  });

  // Load packages
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Tasks
  grunt.registerTask('dist-css', ['sass', 'cssmin']);
  grunt.registerTask('default', ['dist-css']);

};
