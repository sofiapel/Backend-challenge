var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "User", // Will use table name `post` as default behaviour.
    tableName: "user", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        username: {
            type: "varchar",
        },
        email: {
            type: "varchar",
        },
        phone: {
            type:"varchar"
        },
        website: {
            type: "varchar",
        }
    }
})