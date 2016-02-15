import gulp                from "gulp";
import autoprefixer        from "gulp-autoprefixer";
import babel               from "gulp-babel";
import concat              from "gulp-concat";
import eslint              from "gulp-eslint";
import friendlyFormatter   from "eslint-friendly-formatter";
import flatten             from "gulp-flatten";
import mocha               from "gulp-mocha"; // eslint-disable-line no-shadow
import newer               from "gulp-newer";
import plumber             from "gulp-plumber";
import sass                from "gulp-sass";
import sourcemaps          from "gulp-sourcemaps";
import gutil               from "gulp-util";
import browserSync         from "browser-sync";
import del                 from "del";
import merge               from "merge2";
import runSeq              from "run-sequence";
// import postcss             from "gulp-postcss";

/* *****************************************
 * Constants and "global" helper functions
 * *****************************************/

function handleError(error) {
  gutil.log(error.message);
  this.emit("end"); // eslint-disable-line no-invalid-this
}

const files = {
  "source": {
    "markup": "./source/**/*.html",
    "styles": {
      "global": "./source/styles/**/*.scss"
    },
    "media": [
      "./source/**/*.png",
      "./source/**/*.gif",
      "./source/**/*.jpg",
      "./source/**/*.svg"
    ],
    "app": [
      "./source/**/*.jsx",
      "./source/**/*.js"
    ],
    "appEntry": "./source/main/app.jsx",
    "nodeLibs": [
      { "src": "systemjs", "folder": "/dist", "files": "**/*.js", "dest": "systemjs" },
      { "src": "react", "folder": "/dist", "files": "**/*.js", "dest": "react" },
      { "src": "react-router", "folder": "/umd", "files": "**/*.js", "dest": "react-router" },
      { "src": "pouchdb", "folder": "/dist", "files": "**/*.js", "dest": "pouchdb" },
      { "src": "pouchdb-find", "folder": "/dist", "files": "**/*.js", "dest": "pouchdb-find" },
      { "src": "rx", "folder": "/dist", "files": "**/*.js", "dest": "rx" }
    ],
    "bowerLib": "./bower_components/*/dist/**/*.js",
    "tests": "./tests/**/*.js*"
  },
  "dev": {
    "root": "./build-dev",
    "css": "./build-dev/css",
    "media": "./build-dev/media",
    "app": "./build-dev/app",
    "testDir": "./build-dev/tests",
    "testFiles": "./build-dev/tests/**/*.js"
  }
};

const plumberOpts = { "errorHandler": handleError };

const devServerSettings = {
  "server": files.dev.root,
  "port": 5000,
  "ghostMode": false,
  "reloadOnRestart": true

  // "tunnel": true,
};

function exportBowerLibs(destRoot) {
  return gulp.src(files.source.bowerLib)
    .pipe(plumber(plumberOpts))
    .pipe(gulp.dest(`${ destRoot }/bower`));
}

function exportnodeLibs(destRoot) {
  var nodeLibStreams = files.source.nodeLibs.map((val) => {
    return gulp.src(`./node_modules/${ val.src + val.folder }/${ val.files }`)
      .pipe(gulp.dest(`${ destRoot }/node/${ val.dest }`));
  });

  return merge(nodeLibStreams);
}

/* ****************************
 * Setup and Low-level tasks
 * ****************************/

browserSync.create();

gulp.task("dev-clean-all", (done) => {
  del([`${ files.dev.root }/**/*`], done);
});

gulp.task("dev-clean-tests", (done) => {
  del([`${ files.dev.testDir }/**/*`], done);
});

gulp.task("dev-clean-app", (done) => {
  del([`${ files.dev.app }/**/*`], done);
});

gulp.task("dev-export-bower-libs", () => {
  return exportBowerLibs(files.dev.root, { "buffer": false });
});

gulp.task("dev-export-node-libs", () => {
  return exportnodeLibs(files.dev.root);
});

/* ****************************
 * TESTING TASKS
 * ****************************/

gulp.task("lint-app-all", () => {
  return gulp.src(files.source.app)
    .pipe(plumber(plumberOpts))
    .pipe(eslint())
    .pipe(eslint.format(friendlyFormatter));
});

gulp.task("lint-app", () => {
  return gulp.src(files.source.app)
    .pipe(plumber(plumberOpts))
    .pipe(newer({
      "dest": files.dev.app,
      "ext": ".js"
    }))
    .pipe(eslint())
    .pipe(eslint.format(friendlyFormatter));
});

gulp.task("dev-build-tests", () => {
  return gulp.src(files.source.tests)
    .pipe(plumber(plumberOpts))
    .pipe(newer({
      "dest": files.dev.testDir,
      "ext": ".js"
    }))
    .pipe(babel({ "plugins": ["object-assign"] }))
    .pipe(flatten())
    .pipe(gulp.dest(files.dev.testDir));
});

gulp.task("dev-test-app", ["dev-build-tests"], () => {
  return gulp.src(files.dev.testFiles)
    .pipe(plumber(plumberOpts))
    .pipe(mocha({ "reporter": "nyan" }));
});

gulp.task("dev-build-and-test-app", ["dev-lint-and-build-app"], (done) => {
  runSeq("dev-test-app", done);
});

gulp.task("dev-watch-app-test", (done) => {
  // watch app files
  gulp.watch(files.source.app, ["dev-build-and-test-app"]);

  // watch test files
  gulp.watch(files.source.tests, ["dev-test-app"]);

  return done();
});

gulp.task("dev-test-cycle", (done) => {
  runSeq(
    "dev-clean-app",
    "dev-build-app",
    "dev-clean-tests",
    "dev-test-app",
    "dev-watch-app-test",
    done
   );
});

/* ****************************
 * DEV BUILD TASKS
 * ****************************/

gulp.task("dev-build-globalcss", () => {
  return gulp.src(files.source.styles.global)
    .pipe(plumber(plumberOpts))
    .pipe(sourcemaps.init())
      .pipe(sass()
        .on("error", sass.logError))
      .pipe(newer(`${ files.dev.css }/styles.css`))
      .pipe(concat("styles.css"))
      .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(flatten())
    .pipe(gulp.dest(files.dev.css))
    .pipe(browserSync.stream());
});

gulp.task("dev-build-media", () => {
  return gulp.src(files.source.media, { "buffer": false })
    .pipe(plumber(plumberOpts))
    .pipe(newer(files.dev.media))
    .pipe(flatten())
    .pipe(gulp.dest(files.dev.media));
});

/* Lint then build */
gulp.task("dev-lint-and-build-app", ["lint-app"], () => {
  return gulp.src(files.source.app)
    .pipe(plumber(plumberOpts))
    .pipe(newer(files.dev.app))
    .pipe(sourcemaps.init())
    .pipe(babel({ "plugins": ["object-assign"] } /* { modules: "system" } */))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(files.dev.app));
});

/* Build Without Lint */
gulp.task("dev-build-app", () => {
  return gulp.src(files.source.app)
    .pipe(plumber(plumberOpts))
    .pipe(newer(files.dev.app))
    .pipe(sourcemaps.init())
    .pipe(babel({ "plugins": ["object-assign"] } /* { modules: "system" } */))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(files.dev.app));
});

gulp.task("dev-build-markup", () => {
  return gulp.src(files.source.markup, { "buffer": false })
    .pipe(plumber(plumberOpts))
    .pipe(newer(files.dev.root))
    .pipe(flatten())
    .pipe(gulp.dest(files.dev.root));
});

/* ****************************
 * DEV WATCH TASKS
 * ****************************/

gulp.task("dev-build-lint-and-test-app", ["dev-lint-and-build-app"], (done) => {
  runSeq("dev-test-app",
    done
 );
});

gulp.task("dev-watch-app", ["dev-build-lint-and-test-app"], browserSync.reload);

gulp.task("dev-watch-media", ["dev-build-media"], browserSync.reload);

gulp.task("dev-watch-markup", ["dev-build-markup"], browserSync.reload);


/* ****************************
 * DEV BUILD & SERVE
 * ****************************/

gulp.task("dev-build-all", (done) => {
  runSeq(
    ["dev-export-node-libs", "dev-export-bower-libs", "dev-build-media", "lint-app", "dev-build-app", "dev-build-markup"],
    "dev-build-globalcss",
    done);
});

gulp.task("dev-clean-build-test-all", (done) => {
  runSeq(
    "dev-clean-all",
    "dev-build-all",
    "dev-test-app",
    done);
});

gulp.task("dev-watch", () => {
  // watch app files
  gulp.watch(files.source.app, ["dev-watch-app"]);

  // watch markup files
  gulp.watch(files.source.markup, ["dev-watch-markup"]);

  // watch media files
  gulp.watch(files.source.media, ["dev-watch-media"]);

  // styles and tests are the only ones that don't have any extra steps

  // watch style files
  //     (injected styles = no browser reload)
  gulp.watch(files.source.styles.global, ["dev-build-globalcss"]);

  // watch test files
  gulp.watch(files.source.tests, ["dev-test-app"]);
});

gulp.task("dev-serve", ["dev-clean-build-test-all", "dev-watch"], () => {
  browserSync.init(devServerSettings);

  browserSync.reload();
});

gulp.task("dev-serve-only", ["dev-watch"], () => {
  browserSync.init(devServerSettings);

  browserSync.reload();
});

gulp.task("dev", ["dev-serve"]);

/* ****************************
 * DEFAULT RUN TASK
 * ****************************/

gulp.task("default", ["dev"]);
