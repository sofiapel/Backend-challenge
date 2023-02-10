const { Entity, Schema } = require('redis-om')
const client = require('./client')

class User extends Entity {}
const userSchema = new Schema(User, {
  id: { type: 'number' },
  name: { type: 'string' },
  username: { type: 'string' },
  email: { type: 'string' },
  phone: { type: 'number' },
  website: { type: 'string' }
})

// const userRepository = (async () => {return (await client).fetchRepository(userSchema)})()
// const userRepository = (async () => { return await (await client).fetchRepository(userSchema)})()

//module.exports = userRepository
