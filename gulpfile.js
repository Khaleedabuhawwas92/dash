var gulp = require("gulp"),
   concat = require("gulp-concat"),
   sass = require("gulp-sass"),
   autoprefixer = require("gulp-autoprefixer"),
   pug = require("gulp-pug"),
   minify = require("gulp-minify"),
   livereload = require("gulp-livereload");

// Html task
gulp.task("html", function () {
   return gulp
      .src("stage/html/*.pug")
      .pipe(
         pug({
            pretty: true,
         })
      )
      .pipe(gulp.dest("dist"))
      .pipe(livereload());
});

// css task
gulp.task("css", function () {
   return gulp
      .src(["stage/css/**/*.css", "stage/css/**/*.scss"])

      .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
      .pipe(autoprefixer())
      .pipe(concat("main.css"))

      .pipe(gulp.dest("dist/css"))
      .pipe(livereload());
});

// JS Task
gulp.task("js", function () {
   return gulp
      .src("stage/js/*.js")
      .pipe(concat("main.js"))
      .pipe(minify())
      .pipe(gulp.dest("dist/js"))
      .pipe(livereload());
});

//  Watch Task
gulp.task("watch", function () {
   require("./server.js");
   livereload.listen();
   gulp.watch("stage/html/**/*.pug", gulp.series("html"));
   gulp.watch(
      ["stage/css/**/*.css", "stage/css/**/*.scss"],
      gulp.series("css")
   );
   gulp.watch("stage/js/*.js", gulp.series("js"));
});
