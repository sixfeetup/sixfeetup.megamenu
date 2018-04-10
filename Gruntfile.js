module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            target: {
                files: {
                    'src/sixfeetup/megamenu/browser/static/megamenu.min.css': 'src/sixfeetup/megamenu/browser/static/megamenu.css'
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'src/sixfeetup/megamenu/browser/static/megamenu.min.js': 'src/sixfeetup/megamenu/browser/static/megamenu.js'
                }
            }
        },
        watch: {
            cssmin: {
                files: 'src/sixfeetup/megamenu/browser/static/megamenu.css',
                tasks: ['css']
            },
            uglify: {
                files: 'src/sixfeetup/megamenu/browser/static/megamenu.js',
                tasks: ['js']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('css', ['cssmin']);
    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('build', ['css', 'js']);
};