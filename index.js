const user = require("./src/models/user");
const AppDataSource = require("./src/models/index");
const userRepository = require("./om/userSchema");

const axios = require("axios");

const qs = require("qs");
// Require the framework and instantiate it
const fastify = require("fastify")({
  logger: true,
  querystringParser: (str) => qs.parse(str),
});

const redis = require("redis");
const client = redis.createClient();

async function main() {
  try {
    await AppDataSource.initialize();
    await client.connect();

    // Run the server!
    fastify.listen({ port: 3000 }, (err) => {
      console.log(`⚡️[server]: Server is running at http://localhost:3000`);
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

main();

// Declare a route
// fastify.get('/', async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     response.data.map((u) => delete u.id)

//     AppDataSource
//     .createQueryBuilder()
//     .insert()
//     .into(user)
//     .values(response.data)
//     .execute()

//     res.send(response.data).status(200)
//   }catch(e){
//     res.send(e)
//   }
// })


fastify.get("/users", async (req, res) => {
  try {
    const take = req.query.take || 10
    const page= req.query.page || 1;
    const skip= (page-1) * take ;

    const [result, total] = await AppDataSource.getRepository(user).findAndCount(
      {
          take,
          skip
      }
  );


    res.send({ data: result, count: total}).status(200);
  } catch (e) {
    res.send(e);
  }
});

//get one user by attribute
fastify.get("/user", async (req, res) => {
  try {
    const queryKey = Object.keys(req.query);
    let u = await client.hGetAll(req.query[queryKey[0].toString()]);

    if (!Object.keys(u).length) {
      u = await AppDataSource.getRepository(user).findOneBy(req.query);
      if (!u) {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        u = response.data.find(
          (e) => e[queryKey[0].toString()] === req.query[queryKey[0].toString()]
        );
        delete u.address
        delete u.company
        
        AppDataSource
        .createQueryBuilder()
        .insert()
        .into(user)
        .values(u)
        .execute()        
        
        client.hSet(req.query[queryKey[0].toString()],u)



      } else {
        res.send({ message: "No user was found" }).status(404);
      }
    }

    //busqueda en base de datos

    res.send(u).status(200);
  } catch (e) {
    res.send(e);
  }
});

//Le falta pispear el datasource
fastify.get("/user/:id", async (req, res) => {
  try {
    const u = await AppDataSource.getRepository(user).findOneBy({
      id: req.params.id,
    });

    if (!u) {
      res.send("User not found").status(400);
    }

    res.send(u).status(200);
  } catch (e) {
    res.send(e);
  }
});

fastify.delete("/user/:id", async (req, res) => {
  try {
    //me falta el delete de la base de datos

    console.log("id: ", req.params.id);

    AppDataSource.createQueryBuilder()
      .delete()
      .from(user)
      .where("id = :id", { id: req.params.id })
      .execute();

    res.send({ message: "deleted successfully" });
  } catch (e) {
    res.send(e);
  }
});
