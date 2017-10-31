module.exports = function(grunt){

	grunt.initConfig({
		concat:{
			js: {
				src: ['bower_components/jquery/dist/*.min.js'],
				dest: 'views/dist/jquery.min.js'
			},
			dist:{
				src: ['views/js/*.js'],
				dest: 'views/js/script.js'
			},
			watch: {
				dist: {
					files: ['views/js/*.js'],
					tasks: ['concat']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', 'concat');
}