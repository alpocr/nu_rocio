/* ===================
    Main
   =================== */

module.exports = {
    development: {
        root: __dirname,
        db: 'mongodb://localhost/sociometrika_matriz'
    },
    test: {
        root: __dirname,
        db: 'mongodb://localhost/sociometrika_matriz'
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