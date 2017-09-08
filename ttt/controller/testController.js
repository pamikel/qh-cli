 const httpService = require('../service/HttpService')
// setInterval(()=>{
//   httpService.testGetMethods()
// },5000)
module.exports={
  testApi(req, res) {
    return httpService.testGetMethods()
  }
}