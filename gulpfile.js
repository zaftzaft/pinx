var gulp = require("gulp");
var rename = require("gulp-rename");
var less = require("gulp-less");

gulp.task("less", function(){
  gulp.src("./less/styles.less")
  .pipe(less({
    compress: true,
    cleancss: true
  }))
  .pipe(rename("style.css"))
  .pipe(gulp.dest("./css"));
});

gulp.watch("./less/*.less", function(){
  gulp.run("less");
});

gulp.task("default", function(){
  gulp.run("less");
});
