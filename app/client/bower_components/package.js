Package.client({
    imports: "^common",
    files: [
        "^**/*",    //clear defaults
        "bootstrap-stylus/fonts/*",
        "bootstrap.styl",
        "angular/angular.js",
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
    all_preload: true
})