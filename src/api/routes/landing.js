module.exports = (app) => {
    app.get('', (req, res) => {
        res.render('index', {
            title: 'DMS',
            author: 'Almer F. Tampus'
        })
    })
}