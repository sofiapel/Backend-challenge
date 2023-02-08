const user = require("./user")

const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Address", // Will use table name `category` as default behaviour.
    tableName: "address", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        street: {
            type: "varchar",
        },
        suite: {
            type: "varchar",
        },
        city: {
            type: "varchar",
        },
        zipcode: {
            type:"int"
        },
        geoLat: {
            type: "varchar",
        },
        geoLng: {
            type: "varchar",
        }
    },
    relations: {
        user: {
            target: "User",
            type: "one-to-one",
            joinTable: true,
            // cascade: true,
            // primary: true,
            createForeignKeyConstraints: true,
            eager: true

        },
    }
})
