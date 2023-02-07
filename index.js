// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
require('dotenv').config();
const AppDataSource = require('./src/models/index')
const axios = require("axios")

async function main (){
  try {
    await AppDataSource.initialize()
    // Run the server!
    fastify.listen({ port: 3000 }, (err) => {
      console.log(`⚡️[server]: Server is running at http://localhost:3000`);
      if (err) {
        fastify.log.error(err)
        process.exit(1)
      }
    })
  }catch(e){
    console.log(e)
  }
}

main()


// Declare a route
fastify.get('/', async (request, reply) => {
  try { 
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    console.log(response.data[0])

    reply.send({ hello: 'world' })
  }catch(e){
    reply.send(e)
  }
})

