var StoreObject = function(options) {
    var settings = {
        'namespace': 'storeObject',
        'data': []
    };

    this.data = function(data) {
        if(typeof data != 'undefined') {
            settings.data = data;
        }

        return this;
    };

    this.save = function() {
        if (typeof settings.data == 'string') {
            localStorage[settings.namespace] = settings.data;
        } else if (typeof settings.data == 'object') {
            localStorage[settings.namespace] = JSON.stringify(settings.data);
        }

        return this;
    };

    this.get = function() {
        if(typeof localStorage[settings.namespace] != 'undefined') {
            return localStorage[settings.namespace];
        }

        return null;
    };

    this.remove = function() {
        if(typeof localStorage[settings.namespace] != 'undefined') {
            localStorage.removeItem(settings.namespace);
        }
    };

    function init(options) {
        settings = $.extend(settings, options);

        if (!check()) {
            delete this;
        }
    }

    function check() {
        return typeof (Storage) != 'undefined';
    }

    init(options);
};