/* ===================
    Main
   =================== */

module.exports = {
    development: {
        root: __dirname,
        db: 'mongodb://localhost/db_componentes'
    },
    test: {
        root: __dirname,
        db: 'mongodb://localhost/db_componentes'
    },
    staging: {
        root: __dirname,
        db: process.env.MONGOLAB_URI
    },
    production: {
        root: __dirname,
        db: process.env.MONGOLAB_URI
    }
}