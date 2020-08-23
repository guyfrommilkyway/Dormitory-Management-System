module.exports = (app) => {

    // index page
    app.get('', (req, res) => {
        res.render('index', {
            title: 'DMS',
            author: 'Almer F. Tampus'
        })
    })

    // signup page
    app.get('/signup', (req, res) => {
        res.render('signup', {
            title: 'Signup',
            author: 'Almer F. Tampus'
        })
    })
}