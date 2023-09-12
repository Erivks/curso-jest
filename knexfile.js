module.exports = {
    test: {
        client: "pg",
        connection: {
            host: "localhost",
            user: "postgres",
            password: "postgres",
            database: "curso-jest"
        },
        migrations: {
            directory: "src/migrations"
        }
    }
};