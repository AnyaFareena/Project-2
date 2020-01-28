const controllers = require('../controllers/index');

test('Token should be at least 40 charaters long', () => {
    expect.assertions(1);
    return controllers.getUser(1).then(data => {
        expect(data.token.length).toBeGreaterThanOrEqual(40);
    });
})

test('The 2nd location should be Cinema', () => {
    expect.assertions(1);
    return controllers.getLocations(1).then(data => {
        expect(data[1].name).toEqual('Cinema');
    });
})