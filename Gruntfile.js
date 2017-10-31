module.exports = function(grunt){

	grunt.initConfig({
		concat:{
			js: {
				src: ['bower_components/**/dist/*.min.js'],
				dest: 'app/dist/jquery.min.js'
			},
			dist:{
				src: ['app/js/*.js'],
				dest: 'app/js/script.js'
			},
			watch: {
				dist: {
					files: ['app/js/*.js'],
					tasks: ['concat']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', 'concat');
}