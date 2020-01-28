let UserDAO = require('../main/daos/UserDAO');

jest.mock('../main/models/users', () => () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  return dbMock.define('user',  {
    id: 1,
    name: 'Test',
    token: 'Test token',
  
  })
});


describe("Get User Mock test", () => {  
  it("It should get Test as name in mock database", async () => {
    const user = await UserDAO.getOneUser();
    expect(user.name).toEqual('Test');
  })
})
  