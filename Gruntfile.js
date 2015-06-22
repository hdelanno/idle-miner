module.exports = configureGrunt;

function configureGrunt(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    base: 'dist/',
                    port: 8000
                }
            }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.html', '!libs/**/*.html'],
                    dest: 'dist/'
                }]
            },
            css: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.css', '!libs/**/*.css'],
                    dest: 'dist/'
                }]
            },
            json: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: [
                        '**/*.json',
                        '!libs/**/*.json',
                        '!bower.json'
                    ],
                    dest: 'dist/'
                }]
            },
            images: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: 'img/*',
                    dest: 'dist/'
                }]
            },
            libs: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/libs/',
                        src: 'angular/angular.min.js',
                        dest: 'dist/libs/'
                    },
                    {
                        expand: true,
                        cwd: 'src/libs/',
                        src: 'angular-local-storage/dist/angular-local-storage.min.js',
                        dest: 'dist/libs/'
                    },
                    {
                        expand: true,
                        cwd: 'src/libs/',
                        src: 'angular-ui-router/release/angular-ui-router.min.js',
                        dest: 'dist/libs/'
                    },
                    {
                        expand: true,
                        cwd: 'src/libs/',
                        src: 'bootstrap/dist/css/bootstrap.min.css',
                        dest: 'dist/libs/'
                    }
                ]
            }
        },
        concat: {
            js: {
                src: 'src/js/**/*.js',
                dest: 'dist/js/app.js'
            }
        },
        uglify: {
            options: {
                compress: true,
                sourceMap: true
            },
            js: {
                src: 'dist/js/app.js',
                dest: 'dist/js/app.min.js'
            }
        },
        watch: {
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['concat:js', 'uglify:js']
            },
            json: {
                files: ['src/**/*.json'],
                tasks: ['copy:json']
            },
            css: {
                files: ['src/css/**/*.css'],
                tasks: ['copy:css']
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['copy:html']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', ['copy', 'concat', 'uglify', 'connect', 'watch']);
    grunt.registerTask('build', ['copy', 'concat', 'uglify']);
}