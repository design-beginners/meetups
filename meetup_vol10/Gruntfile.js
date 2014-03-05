module.exports = function(grunt) {

  grunt.initConfig({
    // ------------------------------
    // ウオッチ対象設定
    // ------------------------------
    watch: {
      html: {
        files: ['src/*.html'],
        tasks:['htmlmin'],
        options: {
          livereload: true
        }
      },
      // JS保存
      // JSHINTとミニファイ
      script : {
        files:['src/js/*.js'],
        tasks:['jshint','uglify']
      },
      // cssミニファイ
      css : {
        files:['src/css/*.css'],
        tasks:['cssmin'],
        options: {
          livereload: true
        }
      },
      // ファイルを変更した時に自動アップロード
      //upload: {
      //  files: ['src/*'],
      //  tasks:['ftp-deploy']
      //},
      // ライブリロード
      // 使用する場合はChromeにアドオンをいれる　https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
      // 他ブラウザの情報は　http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-　から
      reload: {
        files: ['src/*'],
        options: {
          livereload: true
        }
      }
    },
    // ------------------------------
    // タスク設定
    // ------------------------------
    // JSミニファイ
    uglify: {
      all: {
        files: {
          'js/public.min.js': ['src/js/*.js']
        }
      }
    },
    // HTML圧縮（コメントとスペース除去だけ）
    htmlmin: {
      dist : {
        options : {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'index.html' : 'src/index.html'
        }
      }
    },
    // CSS圧縮（コメントとスペース除去だけ）
    cssmin: {
      // ミニファイしたファイルを結合
      combine: {
        expand: true,
        options: {
          // 行頭につけるコメント
          banner: '/* minified css file */'
        },
        files: {
          // プロパティ名は吐き出すファイル、配列の値が結合対象
          //'css/all.min.css': ['src/css/*.css']
          'css/all.min.css': ['src/css/normalize.css','src/css/main.css']
        }
      }
    },
    // Javasctiptをチェック
    jshint: {
      beforeconcat: ['src/js/common.js']
    },
    connect: {
      livereload: {
        options: {
          port: 5567
        }
      }
    }
  });

  // ********************
  // 使用したいタスク
  // ********************

  // JS圧縮 https://github.com/gruntjs/grunt-contrib-uglify
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // JSHINT https://github.com/gruntjs/grunt-contrib-jshint
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // JSテスト https://github.com/gruntjs/grunt-contrib-jasmine
  //grunt.loadNpmTasks('grunt-contrib-jasmine');
  // 変更監視 https://github.com/gruntjs/grunt-contrib-watch
  grunt.loadNpmTasks('grunt-contrib-watch');
  // HTML圧縮 https://github.com/gruntjs/grunt-contrib-htmlmin
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  // sass https://github.com/gruntjs/grunt-contrib-sass
  //grunt.loadNpmTasks('grunt-contrib-sass');
  // compass https://github.com/gruntjs/grunt-contrib-compass
  //grunt.loadNpmTasks('grunt-contrib-compass');
  // https://github.com/zonak/grunt-ftp-deploy
  grunt.loadNpmTasks('grunt-ftp-deploy');
  // https://github.com/gruntjs/grunt-contrib-cssmin
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // https://github.com/gruntjs/grunt-contrib-connect
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  grunt.registerTask('default', ['connect','watch']);
};