var gulp = require("gulp");
var del = require('del');
var copy = require("gulp-copy");
var watch = require("gulp-watch");
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");
var browserify = require("gulp-browserify"); 

var paths = {
	jsx: {
		dst: "dist",
		src: "src/app.jsx"	,
		watch: "src/**/*.jsx"	
	},
	assets: {
		dst: "dist",
		src: "static/**/*.*"
	}
};
 

gulp.task("jsx", ["clean-jsx"], function(){
	
	return gulp.src(paths.jsx.src)
	    .pipe(plumber())
	    .pipe(browserify({
	    	transform: ["babelify"],
	    	extensions: [".jsx"]
	    }))
	    .pipe(rename("app.js"))
	    .pipe(gulp.dest(paths.jsx.dst));

});

gulp.task("assets", function(){

	return gulp.src(paths.assets.src)
		.pipe(plumber())
		.pipe(copy(paths.assets.dst, { prefix: 1}));

});

gulp.task("clean-jsx", function(){

	del(["dist/**/*.js"]);

});

gulp.task("clean-assets", function(){

	del(["dist/**/*.*", "!dist/**/*.jsx"]);

});

gulp.task("watch", function(){

	watch(paths.jsx.watch, function(){
		gulp.run(["jsx"]);
	});

	watch(paths.assets.src, function(){
		gulp.run(["assets"]);
	});

});

gulp.task("default", ["jsx", "assets", "watch"]);