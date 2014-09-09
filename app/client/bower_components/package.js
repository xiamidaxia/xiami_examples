Package.client({
    imports: "^common",
    files: [
        "^**/*",    //clear defaults
        "bootstrap-stylus/fonts/*",
        "bootstrap.styl",
        "jquery/dist/jquery.js",
        "index.js",
        "angular/angular.js",
        "angular-bootstrap/ui-bootstrap-tpls.js",
        "angular-bootstrap/ui-bootstrap.js",
        "angular-animate/angular-animate.js",
        "angular-sanitize/angular-sanitize.js",
        "angular-route/angular-route.js",
        //"angular-ui-router/release/angular-ui-router.js",
        //"ionic/release/fonts/*",
        //"ionic/release/css/ionic.css",
        //"ionic/release/js/ionic.js",
        //"ionic/release/js/ionic-angular.js",
        "angular-meteor.js"
    ],
    test_imports: "^test/bower_components",
    test_files: "^**/*",
    all_preload: true
})