/**
 * Created with JetBrains WebStorm.
 * User: seanbrookes
 * Date: 2013-09-21
 * Time: 4:20 PM
 * To change this template use File | Settings | File Templates.
 */
module.exports = function(grunt) {

  // Configuration goes here
  grunt.initConfig({
    watch: {
      scripts: {
        files: ['stylesrc/*.less'],
        tasks: ['less']
      }
    },
    less: {
      development: {
//        options: {
//          paths: ["assets/css"]
//        },
        files: {
          "public/style/style.css": "stylesrc/style.less"
        }
      },
      production: {
//        options: {
//          paths: ["assets/css"],
//          yuicompress: true
//        },
        files: {
          "public/style/style.css": "stylesrc/style.less"
        }
      }
    }

  });

  // Load plugins here
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Define your tasks here
  grunt.registerTask("default", "watch");

};