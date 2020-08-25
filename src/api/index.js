module.exports = (app) => {
    await require('../api/routes/landing')(app)
    await require('../api/routes/user')(app)
}