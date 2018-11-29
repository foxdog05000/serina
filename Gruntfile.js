// Generated on 2017-03-16 using generator-angular 0.16.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  var serveStatic = require('serve-static');

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn'
  });

  // Configurable paths for the application
  var appConfig = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all', 'newer:jscs:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/views/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'postcss:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,**/}*.html',
          '.tmp/views/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              serveStatic('.tmp'),
              connect().use(
                '/node_modules',
                serveStatic('./node_modules')
              ),
              connect().use(
                '/app/views',
                serveStatic('./app/views')
              ),
              serveStatic(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              serveStatic('.tmp'),
              serveStatic('test'),
              connect().use(
                '/node_modules',
                serveStatic('./node_modules')
              ),
              serveStatic(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Make sure code styles are up to par
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp',
      package: {
        dot: true,
        src: 'packages/*'
      }
    },

    // Add vendor prefixed styles
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: ['last 1 version']})
        ]
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/views/',
          src: '{,*/}*.css',
          dest: '.tmp/views/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/views/',
          src: '{,*/}*.css',
          dest: '.tmp/views/'
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/views',
        cssDir: '.tmp/views',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/views/fonts',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/views/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/views/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '!<%= yeoman.dist %>/images/flags/*',
          '<%= yeoman.dist %>/views/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,**/}*.html'],
      css: ['<%= yeoman.dist %>/views/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/scripts/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/views'
        ],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/views/main.css': [
    //         '.tmp/views/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    concat: {
      dist: {
        files: {
          'dist/main.js': ['api/api.js', '<%= yeoman.app %>/main.js']
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif,ico}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    ngtemplates: {
      dist: {
        options: {
          module: 'serinaApp',
          htmlmin: '<%= htmlmin.dist.options %>',
          usemin: 'scripts/scripts.js'
        },
        cwd: '<%= yeoman.app %>',
        src: 'views/{,**/}*.html',
        dest: '.tmp/templateCache.js'
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '*.html',
            'images/{,*/}*.{webp}',
            'icons/icon-x64.ico',
            'views/fonts/{,*/}*.*',
            'package.json'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: 'app/app/',
          dest: '<%= yeoman.dist %>',
          src: '**'
        }, {
          expand: true,
          cwd: 'api/',
          dest: '<%= yeoman.dist %>',
          src: ['modules/*']
        }, {
          expand: true,
          cwd: 'node_modules/',
          dest: '<%= yeoman.dist %>/node_modules',
          src: [
            'accepts/**',
            'array-flatten/**',
            'body-parser/**',
            'bytes/**',
            'content-disposition/**',
            'content-type/**',
            'cookie-signature/**',
            'debug/**',
            'depd/**',
            'destroy/**',
            'ee-first/**',
            'encodeurl/**',
            'escape-html/**',
            'express/**',
            'finalhandler/**',
            'forwarded/**',
            'iconv-lite/**',
            'inherits/**',
            'ipaddr.js/**',
            'jsonfile/**',
            'http-errors/**',
            'etag/**',
            'fresh/**',
            'cookie/**',
            'media-typer/**',
            'merge-descriptors/**',
            'methods/**',
            'mime/**',
            'mime-db/**',
            'mime-types/**',
            'ms/**',
            'negotiator/**',
            'on-finished/**',
            'parseurl/**',
            'path-to-regexp/**',
            'proxy-addr/**',
            'qs/**',
            'range-parser/**',
            'raw-body/**',
            'send/**',
            'safe-buffer/**',
            'safer-buffer/**',
            'serve-static/**',
            'setprototypeof/**',
            'statuses/**',
            'type-is/**',
            'unpipe/**',
            'utils-merge/**',
            'vary/**'
          ]
        }, {
          expand: true,
          cwd: 'node_modules/material-design-icons/iconfont',
          dest: '<%= yeoman.dist %>/styles',
          src: [
            'MaterialIcons-Regular.ttf',
            'MaterialIcons-Regular.woff',
            'MaterialIcons-Regular.woff2'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/views',
        dest: '.tmp/views/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Build app electron
    electron: {
      buildWin32: {
        options: {
          name: 'serina',
          dir: 'dist',
          out: 'packages',
          platform: 'win32',
          arch: 'x64',
          overwrite: true,
          prune: false
        }
      },
      buildLinux: {
        options: {
          name: 'serina',
          dir: 'dist',
          out: 'packages',
          platform: 'linux',
          arch: 'x64',
          overwrite: true,
          prune: false
        }
      },
      buildMacos: {
        options: {
          name: 'serina',
          dir: 'dist',
          out: 'packages',
          platform: 'darwin',
          arch: 'x64',
          overwrite: true,
          prune: false
        }
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      },
      loop: {
        configFile: 'test/karma.conf.js',
        singleRun: false
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'test',
      'clean:server',
      'concurrent:server',
      'postcss:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', 'Execute TU', function (target) {
    target = (target === 'loop') ? ':' + target : ':unit';

    grunt.task.run([
      'clean:server',
      'concurrent:test',
      'postcss',
      'connect:test',
      'karma' + target
    ]);
  });

  grunt.registerTask('build', [
    'test',
    'clean:dist',
    'clean:package',
    'useminPrepare',
    'concurrent:dist',
    'postcss',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('package', 'Package electron app', function (target) {
    switch (target) {
      case 'linux':
        grunt.task.run([
          'build',
          'electron:buildLinux'
        ]);
        break;
      case 'win32':
        grunt.task.run([
          'build',
          'electron:buildWin32'
        ]);
        break;
      case 'macos':
        grunt.task.run([
          'build',
          'electron:buildMacos'
        ]);
        break;
      default:
        grunt.task.run([
          'build',
          'electron:buildLinux',
          'electron:buildWin32',
          'electron:buildMacos'
        ]);
    }
  });

  grunt.registerTask('default', [
    'newer:jshint',
    'newer:jscs',
    'test',
    'build'
  ]);
};
