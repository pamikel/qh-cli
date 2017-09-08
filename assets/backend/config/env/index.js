// module.exports = (()=>{
//   const env = process.env.NODE_ENV || 'development';
//   return require(`./${env}`)
// })

const env = process.env.NODE_ENV || 'development';

const config = require(`./${env}`)

module.exports = config