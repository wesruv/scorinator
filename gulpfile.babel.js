import gulp 		from 	"gulp";
import autoprefixer from 	"gulp-autoprefixer";
import babel 		from 	"gulp-babel";
import concat 		from 	"gulp-concat";
import eslint 		from 	"gulp-eslint";
import flatten 		from 	"gulp-flatten";
import mocha 		from 	"gulp-mocha";
import newer 		from 	"gulp-newer";
import plumber 		from 	"gulp-plumber";
import sourcemaps 	from 	"gulp-sourcemaps";
import stylus 		from 	"gulp-stylus";
import gutil 		from 	"gulp-util";
import browserSync 	from 	"browser-sync";
import del 			from 	"del";
import merge 		from 	"merge2";
import runSeq 		from 	"run-sequence";

/*
	TODO
	* test server
	* 	- bundle app?
	* 	- any images processing
	* 	- sourcemaps
	* prod server
	* 	- bundle app?
	* 	- any image processing
	* 	- no sourcemaps
	* 	- minify everything
 */

/******************************************
 * Constants and "global" helper functions
 ******************************************/

function handleError(error) {
	gutil.log(error.message);
}

const files = {
	src: {
		markup: "./src/**/*.html",
		style: "./src/**/*.styl",
		media: [
			"./src/**/*.png",
			"./src/**/*.gif",
			"./src/**/*.jpg"
		],
		app: [
			"./src/**/*.jsx",
			"./src/**/*.js"
		],
		appEntry: "./src/main/app.jsx",
		nodeLibs:
		[
			[ "react", "/dist" ]
		],
		bowerLib: "./bower_components/*/dist/**/*.js",
		tests: "./tests/**/*.js"
	},
	dev: {
		root: "./build-dev",
		css: "./build-dev/css",
		media: "./build-dev/media",
		app: "./build-dev/app",
		tests: "./build-dev/tests"
	}
};

const plumberOpts = { errorHandler: handleError };

const devServerSettings = {
	server: files.dev.root,
	port: 5000
};

function exportBowerLibs( destRoot ) {
	return gulp.src( files.src.bowerLib )
		.pipe( plumber( plumberOpts) )
		.pipe( gulp.dest( `${ destRoot }/bower` ) );
}

function exportnodeLibs( destRoot ) {
	var nodeLibStreams = files.src.nodeLibs.map( ( val ) => {
		console.log( `trying to move ./node_modules/${ val[0] + val[1] }/**/*.js to ${ destRoot }/node/${ val[0] }` );
		return gulp.src( `./node_modules/${ val[0] + val[1] }/**/*.js` )
			.pipe( gulp.dest( `${ destRoot }/node/${ val[0] }` ) );
	} );

	return merge( nodeLibStreams );
}

/*****************************
 * Setup and Low-level tasks
 *****************************/

browserSync.create();

gulp.task( "dev-clean", (done) => {
	del( [ `${files.dev.root}/**/*` ], done );
});

gulp.task( "dev-export-bower-libs", () => {
	return exportBowerLibs( files.dev.root, { buffer: false } );
} );

gulp.task( "dev-export-node-libs", () => {
	return exportnodeLibs( files.dev.root );
} );

/*****************************
 * TESTING TASKS
 *****************************/

gulp.task( "lint-app", () => {
	return gulp.src( files.src.app )
		.pipe( plumber( plumberOpts ) )
		.pipe( eslint() )
		.pipe( eslint.format() );
} );

gulp.task( "dev-build-tests", () => {
	return gulp.src( files.src.tests )
		.pipe( plumber( plumberOpts ) )
        .pipe( sourcemaps.init() )
        .pipe( babel() )
        .pipe( sourcemaps.write( "." ) )
        .pipe( gulp.dest( files.dev.tests ) );
});

gulp.task( "dev-test-app", [ "dev-build-tests" ], () => {
	return gulp.src( files.dev.tests, { read: false } )
		.pipe( plumber( plumberOpts ) )
		.pipe( mocha() );
} );

/*****************************
 * DEV BUILD TASKS
 *****************************/

/* always lint on build, unless stylint is being an asshole */
gulp.task( "dev-build-css", () => {
	return gulp.src( files.src.style )
		.pipe( plumber( plumberOpts ) )
		.pipe( newer( `${files.dev.css}/all.css`) )
		.pipe( sourcemaps.init() )
		.pipe( stylus() )
		.pipe( concat( "all.css" ) )
		.pipe( autoprefixer() )
		.pipe( sourcemaps.write() )
		.pipe( flatten() )
		.pipe( gulp.dest( files.dev.css ) )
		.pipe( browserSync.stream() );
} );

gulp.task( "dev-build-media", () => {
	return gulp.src( files.src.media, { buffer: false } )
		.pipe( plumber( plumberOpts ) )
		.pipe( newer( files.dev.media ) )
		.pipe( flatten() )
		.pipe( gulp.dest( files.dev.media ) );
} );

/* Always lint & typecheck on build */
gulp.task( "dev-build-app", [ "lint-app" ], () => {
	return gulp.src( files.src.app )
		.pipe( plumber( plumberOpts ) )
		.pipe( newer( files.dev.app ) )
        .pipe( sourcemaps.init() )
        .pipe( babel( /*{ modules: "system" }*/ ) )
        .pipe( sourcemaps.write( "." ) )
        .pipe( gulp.dest( files.dev.app ) );
} );

gulp.task( "dev-build-markup", () => {
	return gulp.src( files.src.markup, { buffer: false } )
		.pipe( plumber( plumberOpts ) )
		.pipe( newer( files.dev.root) )
		.pipe( flatten() )
		.pipe( gulp.dest( files.dev.root ) );
} );

/*****************************
 * DEV WATCH TASKS
 *****************************/

gulp.task( "dev-rebuild-app", ( done ) => {
	runSeq(
		"dev-build-app",
		"dev-test-app",
		done
	);
} );

gulp.task( "dev-watch-app", [ "dev-rebuild-app" ], browserSync.reload );

gulp.task( "dev-rebuild-lib", ( done ) => {
	runSeq(
		"dev-export-node-libs",
		"dev-test-app",
		done
	);
} );

gulp.task( "dev-watch-lib", [ "dev-rebuild-lib" ], browserSync.reload );

gulp.task( "dev-watch-media", [ "dev-build-media" ], browserSync.reload );

gulp.task( "dev-watch-markup", [ "dev-build-markup" ], browserSync.reload );


/*****************************
 * DEV BUILD & SERVE
 *****************************/

gulp.task( "dev-build-all", ( done ) => {
	runSeq(
		[ "dev-export-node-libs", "dev-export-bower-libs", "dev-build-media", "dev-build-app", "dev-build-markup" ],
		"dev-build-css",
		done );
} );

gulp.task( "dev-clean-build-test-all", ( done ) => {
	runSeq(
		"dev-clean",
		"dev-build-all",
		"dev-test-app",
		done );
} );

gulp.task( "dev-serve", [ "dev-clean-build-test-all" ], () => {
	browserSync.init( devServerSettings );

	browserSync.reload();

	// watch app files
	gulp.watch( files.src.app, [ "dev-watch-app" ] );

	// watch markup files
	gulp.watch( files.src.markup, [ "dev-watch-markup" ] );

	// watch media files
	gulp.watch( files.src.media, [ "dev-watch-media" ] );

	// watch style files
	// styles are the only ones that don't have any extra steps (no reload)
	gulp.watch( files.src.style, [ "dev-build-css" ] );
} );

gulp.task( "dev", [ "dev-serve" ], () => {
} );

/*****************************
 * DEFAULT RUN TASK
 *****************************/

gulp.task( "default", [ "dev" ] );
