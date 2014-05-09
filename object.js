function StoreObject() {
    var data = [];
    var container;

    this.checkStorage = function () {
        if(typeof (Storage) != 'undefined') {
            return true;
        } else {
            return false
        }
    }

    this.init = function (jQueryObject) {
        if (!this.checkStorage()) {
            console.error('Local storage is not available');
            return false;
        }

        container = jQueryObject;
        renderInitial();
        loadStorage();
        renderList(container.children('ul').first(), data);

        return null;
    };

    function renderList(listElement, dataList) {
        $.each(dataList, function(i, el) {
            var li = getTemplate(el.element);

            if(typeof el.children != 'undefined' && el.children != null) {
                var list = $('<ul>');

                renderList(list, el.children);

                li.append(list);
            }

            li.append(getAddTemplate());
            listElement.append(li);
        });
    }

    function loadStorage() {
        if(typeof localStorage.storeObject != 'undefined') {
            data = JSON.parse(localStorage.storeObject);
        }
    }

    function getElements(listElement) {
        var elements = [];

        $(listElement).children('li').each(function(i, el) {
            var element = $(el);
            var add = { 'element': $(el).children('div').text() };

            if(element.find('ul').length > 0) {
                add.children = getElements(element.children('ul').first());
            }

            elements.push(add);
        });

        return elements;
    }

    function update(e) {
        var data = getElements(container.children('ul').first());
        localStorage.storeObject = JSON.stringify(data);
        console.log(data);
    }

    function getTemplate(message) {
        var li = $('<li>');
        var div = $('<div>', {'contenteditable': true})
        div.keyup(update);

        if(typeof message == 'undefined') {
            message = 'Child node';
        }

        div.text(message);
        li.html(div);

        return li;
    }

    function getAddTemplate() {
        var button = $('<button>', { 'class': 'add-button' });
        button.text('Add child');
        button.click(addChild);

        return button;
    }

    function addChild(e) {
        var ul = $(this).siblings('ul');
        var li = getTemplate();

        li.append(getAddTemplate());

        if(ul.length == 0) {
            ul = $('<ul>');

            ul.insertBefore($(this));
        }

        ul.append(li);
        update(e);
    }

    function renderInitial() {
        var ul = $('<ul>');
        var button = getAddTemplate();

        container.html(ul);
        button.insertAfter(ul);
    }
}