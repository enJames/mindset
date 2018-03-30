require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres'
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DBNAME,
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres'
    },
    production: {
        use_env_variable: 'postgres://migkhoqwdusrdp:a2614ab422055976ffb302b74577a37eb0f59ae637c885f59e9bb38da20ea775@ec2-54-221-220-59.compute-1.amazonaws.com:5432/d8p93d4ihtbmif'
    }
};
