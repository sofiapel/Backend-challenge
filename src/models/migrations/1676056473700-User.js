const { MigrationInterface, QueryRunner } = require("typeorm");
const user = require("../user");
const AppDataSource = require("../index")

module.exports = class User1676056473700 {
    async up(queryRunner) {
        //const users = await axios.get("https://jsonplaceholder.typicode.com/users");
        // const query = AppDataSource
        //   .createQueryBuilder()
        //   .insert()
        //   .into(user)
        //   .values(
        //     users.data.map(user => {
        //       return {
        //         name: user.name,
        //         username: "user.username,
        //         email: user.email,
        //         phone: user.phone,
        //         website: user.website
                
        //       };
        //     })
        //   )
    }

    async down(queryRunner) {    
        await queryRunner.query(`DELETE FROM "users"`);
    }

}
