module.exports = function(grunt) {
  "use strict";

  var sourceFiles = [
    "src/**/*.purs",
    "bower_components/**/src/**/*.purs",
    "vendor/purescript-*/src/**/*.purs"
  ];

  grunt.initConfig({
    dotPsci: {
      src: sourceFiles
    },

    pscMake: {
      all: {
        src: sourceFiles
      }
    },

    copy: [
      {
        expand: true,
        cwd: "output",
        src: ["**"],
        dest: "dist/node_modules/"
      },
      {
        src: ["js/client.js"],
        dest: "dist/client.js"
      },
      {
        src: ["js/server.js"],
        dest: "dist/server.js"
      },
      {
        src: ["node_modules/hammerjs"],
        dest: "dist/node_modules/hammerjs"
      }
    ],

    browserify: [
      {
        src: ["dist/client.js"],
        dest: "dist/game.js"
      }
    ]
  });

  grunt.loadNpmTasks("grunt-purescript");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask("make", ["pscMake", "copy", "dotPsci", "browserify"]);
  grunt.registerTask("run", ["make", "execute:server"]);
  grunt.registerTask("default", ["make"]);
};
