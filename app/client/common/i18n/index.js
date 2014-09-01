angular.module('i18n',[])
.provider('i18n', function() {
    var i18nProvider = {}
    var _notify = {}
    i18nProvider.set = function(lan) {
        try {
            _notify = require('./' + lan)
        } catch(e) {
            throw new Error('[i18n] unkown i18n language: ' + lan)
        }
    }

    i18nProvider.$get = function() {
        return function (name, msgKey) {
            if (_notify[name] === undefined) {
                throw new Error('[i18n] undefined name: ' + name)
            }
            return _notify[name]
        }
    }
    return i18nProvider
})
