(function ( $ ) {
    $.fn.tree = function() {
        var local = new StoreObject({'namespace': this.selector});
        var container = this;

        init();

        function init() {
            renderInitial();
            var data = local.get();

            if(data) {
                data = JSON.parse(data);

                renderList(container.children('ul').first(), data);
            }
        }

        function save() {
            var data;

            data = getElements(container.children('ul').first());
            getTree();

            local.data(data).save();
        }

        function getTree() {
            var result = [];
            var elements = container.find('li');

            console.log(elements);
        }

        function renderList(list, data) {
            $.each(data, function(i, el) {
                var li = getListItem(el.element);

                if(typeof el.children != 'undefined' && el.children.length > 0) {
                    var childList = $('<ul>', {'class': 'list-group list-child'});

                    renderList(childList, el.children);
                    li.append(childList);
                }

                list.append(li);
            });
        }

        function getElements(listElement) {
            var elements = [];

            $(listElement).children('li').each(function(i, el) {
                var element = $(el);
                var add = { 'element': $(el).children('span').text() };

                if(element.children('ul').length > 0) {
                    add.children = getElements(element.children('ul').first());
                }

                elements.push(add);
            });

            return elements;
        }

        function getTree() {
            var elements = container.find('li');

            console.log(elements);
        }

        function getSaveButton() {
            var button = $('<button>', {'class': 'btn btn-xs btn-success space'});
            button.html('<span class="glyphicon glyphicon-save"></span>');
            button.click(function() {
                save();
            });

            return button;
        }

        function getAddButton() {
            var button = $('<button>', {'class': 'btn btn-xs btn-primary space'});
            button.html('<span class="glyphicon glyphicon-plus"></span>');
            button.click(function(e) {
                e.preventDefault();

                var list = $(this).siblings('ul').first();
                var item = getListItem();

                if(list.length == 0) {
                    list = $('<ul>', {'class': 'list-group list-child'});
                    $(this).parent().append(list);
                }

                list.append(item);
                save();
            });

            return button;
        }

        function getRemoveButton() {
            var button = $('<button>', {'class': 'btn btn-xs btn-danger space'});
            button.html('<span class="glyphicon glyphicon-remove"></span>');
            button.click(function() {
                $(this).parent().remove();
                save();
            });

            return button;
        }

        function getListItem(text) {
            var item = $('<li>', {'class': 'list-group-item'});
            var span = $('<span>', {'contenteditable': true, 'class': 'space'});
            var add = getAddButton();
            var remove = getRemoveButton();

            if(typeof text == 'undefined') {
                span.text('Enter your text...');
            } else {
                span.text(text);
            }

            span.keyup(function() {
                save();
            });

            item.html(span);
            add.insertBefore(span);
            remove.insertBefore(span);

            return item;
        }

        function renderInitial() {
            var list = $('<ul>', {'class': 'list-group'});
            var button = getAddButton();
            var saveButton = getSaveButton();
            var remove = $('<button>', {'class': 'btn btn-xs btn-danger'});
            remove.html('<span class="glyphicon glyphicon-remove"></span>');
            remove.click(function() {
                $(this).siblings('ul').remove();
                save();
            });

            container.html(list);
            button.insertBefore(list);
            remove.insertBefore(list);
            saveButton.insertBefore(list);
        }
    };
}( jQuery ));