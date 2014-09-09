Package.client({
    imports: ["meteor/standard-app-packages","all/collections","common","bower_components"],
    files: ["index.js", "**/*.*","^**/*.md"],
    test_imports: "test/bower_components",
    test_files: [
        "test/**/*.+(js|coffee)",
        "**/*+(t|T)est*.+(js|coffee)"
    ],
    all_preload: true
})