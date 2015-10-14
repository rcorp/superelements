var vm = require('vm');
var fs = require('fs');

module.exports = function(grunt) {
	var elementUrls = {
		'super-grid': './src/super-grid/'
	};

	// Reads from a built Dojo file (out.js) to inline all define's as required by
	// RequireJS and outputs dgrid-out.js
	// TODO: Filenames should be passed as arguments!
	grunt.registerTask('dojo2requirejs', function () {
		var file = fs.readFileSync(elementUrls['super-grid'] + '/dist/dojoout/dojo/out.js.uncompressed.js', 'utf-8');

		var sandbox = {
			// Replaces the cache
		    require: function (obj){
		        var cache = obj.cache;
		        for (var path in cache){
		            var func = cache[path]
		                .toString()
		                .replace('define([', 'define("' + path + '", [');
		                fs.appendFileSync('../super-grid/dgrid-raw.js', func.substring(func.indexOf('{') + 1, func.lastIndexOf('}') ));
		        }
		    },
			// Empty just so the vm won't throw an error
		    define: function () {}
		};

		vm.createContext(sandbox);
		vm.runInContext(file, sandbox);

	});

	grunt.initConfig({
		shell: {
			options: {
				stdout: true
			},
			dgridBuild: {
				command: 'node ' +
					elementUrls['super-grid'] + 'bower_components/dojo/dojo.js' +
					' load=build ' +
					' --profile ' + elementUrls['super-grid'] + 'lib/supergrid.profile.js' +
					' --dojoConfig ' + elementUrls['super-grid'] + 'lib/dojo.config.js' +
					' --releaseDir ' + '../dist/dojoout'
			}
		},

		copy: {
			copydGrid: {
				files: [{
					src: elementUrls['super-grid'] + 'super-grid.js',
					dest: '../super-grid/super-grid.js'

				}]
			}
		},
		clean: {

			//The Dojo build system makes a copy of all the src folders
			//including dijit, dijitx, dojox etc. We don't need these so
			//delete (clean) them.
			cleanBuild: {
				src: [
					elementUrls['super-grid'] + 'dist/dojoout'
				]
			},
			cleanRequireJsBuild : {
				src: [
					'../super-grid/dgrid-raw.js'
				]
			}
		},

		dom_munger: {
			changeHTML: {
				options: {
					remove: 'script[src="lib/dojo.config.js"]',
					update: {
						selector : 'script[src="./bower_components/dojo/dojo.js"]',
						attribute: 'src',
						value: './dgrid.js'
					},
					callback: function ($){
						console.log ('Inside Callback');
						// If there is a `bower_components` somewehre in the path
						// of `<link>`s or `<scripts>` then convert all relative
						// paths of bower_components to `../` as per Polymer's
						// guidelines.

						$('[href]').each(function (i, e){
							var oldPath = $(e).attr('href');
							console.log ('oldPath', e);
							/bower_components/.test ($(e).attr('href')) ?
								$(e).attr('href', '../' + oldPath.match (/bower_components\/\s*([^\n\r]*)/) [1]) : null;
						});

						// _.each($('[src]'), function ($e){
						// 	var oldPath = $e.attr('src');
						// 	/bower_components/.test ($e.attr('src')) ?
						// 		$e.attr('src', oldPath.match(/bower_components\/\s*([^\n\r]*)/)[1]) : null;
						// })


					}
				},
				files: [{
					src: 'src/super-grid/super-grid.html',
					dest: '../super-grid/super-grid.html'
				}, {
					src: 'src/super-grid/index.html',
					dest: '../super-grid/index.html'
				}]
				//src: ['src/super-grid/super-grid.html', 'src/super-grid/index.html'],
				//dest: ['../super-grid/super-grid.html', '../super-grid/index.html']
			}
		},
		requirejs: {
			build: {
				options: {
					name: '../super-grid/dgrid-raw',
					out: '../super-grid/dgrid.js',
					optimize: 'none'
				}

			}
		}


	});

	grunt.registerTask('default', [
		'shell:dgridBuild',
		'copy:copydGrid',
		'dom_munger:changeHTML',
		'clean:cleanRequireJsBuild',
		'dojo2requirejs',
		'requirejs:build',
		'clean:cleanRequireJsBuild',
		'clean:cleanBuild'
	]);

	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-dom-munger');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
};
