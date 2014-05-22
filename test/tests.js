test('save storage', function() {
    var item = new StoreObject();

    item.save();

    QUnit.assert.ok(typeof localStorage.storeObject != 'undefined');
    QUnit.assert.equal(localStorage.storeObject, JSON.stringify([]));
});

test('namespace', function() {
    var item = new StoreObject({'namespace': 'testing'});

    item.save();

    QUnit.assert.ok(typeof localStorage.testing != 'undefined');
});

test('get string', function() {
    var item = new StoreObject();
    var string = 'This is test data';

    item.data(string).save();

    QUnit.assert.equal(item.get(), string);
});

test('get object', function() {
    var item = new StoreObject();
    var data;
    var json = {
        'data': 'This is test data'
    };

    item.data(json).save();

    data = JSON.parse(item.get());

    QUnit.assert.deepEqual(data, json);
});

test('remove', function() {
    var item = new StoreObject();

    item.save()

    QUnit.assert.ok(typeof localStorage.storeObject != 'undefined');
    item.remove();
    QUnit.assert.ok(typeof localStorage.storeObject == 'undefined');
});