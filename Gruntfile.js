module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        options: {
            livereload: true
        },
        copy: {
          main: {
            files: [
              {expand: true, cwd: './assets/files/', src: ['**'], dest: './public/files/'},
              {expand: true, cwd: './assets/html/', src: ['**'], dest: './public/html/'},
              {expand: true, cwd: './assets/img/', src: ['**'], dest: './public/img/'},
              {expand: true, cwd: './assets/fonts/', src: ['**'], dest: './public/fonts/'},
            ],
          },
        },
        cssmin: {
          options: {
            processImport: false
          },
          client: {
            files: [{
              expand: true,
              cwd: './public/css',
              src: ['client.css', 'client.min.css'],
              dest: './public/css',
              ext: '.min.css'
            }]
          }
        },
        sass: {
            sass_client: {
                options: {
                    style: 'expanded'
                },
                files: {
                    './public/css/client.css': './assets/parse/css/client-parse.scss'
                }
            },
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015']
            },
            dist: {
                files: [
                  {
                      "expand": true,
                      "cwd": "assets/js/client/",
                      "src": ["**/*.js"],
                      "dest": "assets/parse/js/",
                      "ext": ".js"
                  },
                  {
                    "expand": true,
                    "cwd": "assets/js/handlers/",
                    "src": ["**/*.js"],
                    "dest": "assets/parse/js/",
                    "ext": ".js"
                }
              ]
            }
        },
        concat: {
            js_client: {
                src: [
                    './assets/js/shared/*.js',
                    './assets/parse/js/*.js',
                ],
                dest: './public/js/client.js',
            },
            scss_client: {
              src: ['./assets/css/import/*.scss', './assets/css/shared/*.scss', './assets/css/client/*.scss'],
              dest: './assets/parse/css/client-parse.scss'
            },
        },
        uglify: {
            js_client: {
                src: './public/js/client.js',
                dest: './public/js/client.min.js'
            },
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './assets/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: './public/img/'
                }]
            }
        },
        clean: ["./public/img/"],
        watch: {
            scripts: {
                files: ['./assets/js/**/*.js'],
                tasks: ['babel', 'concat'/*, 'uglify'*/], // DO NOT WATCH FOR UGLIFY
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['./assets/css/**/*.scss'],
                tasks: ['concat', 'sass'],
                options: {
                    spawn: false,
                }
            },
            images:{
              files: ['./assets/img/**/*.{png,jpg,gif}'],
              tasks: ['imagemin'],
              options: {
                  spawn: false,
              }
            },
            copy:{
              files: ['./assets/html/**/*', './assets/fonts/**/*', './assets/files/**/*'],
              tasks: ['copy'],
              options: {
                  spawn: false,
              }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    require('load-grunt-tasks')(grunt);
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-sass');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-imagemin');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-contrib-clean');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['babel', 'concat', 'copy', 'sass',  'watch']);
    grunt.registerTask('production', ['clean', 'babel', 'concat', 'copy', 'uglify', 'imagemin', 'sass', "cssmin"]);
    grunt.registerTask('images', ['clean', 'imagemin']);

};
