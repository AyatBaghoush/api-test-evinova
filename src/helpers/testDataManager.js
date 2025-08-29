const {faker} = require('@faker-js/faker')
const HttpClient = require('../../src/infra/httpClient');





class TestDataManager{
 
    
     static async  getValidUser(id=4)
    {
 
        let httpClient = new HttpClient();
        const response = await httpClient.get('/users/:id',{pathParams:{id:id}});
        const validUser = 
        {
            email: response.body.data.email,
            password: faker.internet.password()
        };
        
        return validUser;
    }
    static async  getMissingPasswordUser()
    {
        const missingPasswordUser = 
        {
            email: faker.internet.email()
        };
        return missingPasswordUser;
    }
 
}
module.exports = TestDataManager;