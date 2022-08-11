var Posts = require('../models/post.model')
const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid')

module.exports.show = function (req, res) {
    res.render('posts/editor')
}

module.exports.save = function (req, res) {
    Posts.create({
        title: `${req.body.title}`,
        content: `${req.body.myTextarea}`
    })
    res.redirect('/editor?sucsess=true')
}


module.exports.saveSecurity = async function (req, res) {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    Posts.create({
        title: `${req.body.title}`,
        content: `${req.body.myTextarea}`,
        password: `${password}`
    })
    res.redirect('/editor?sucsess=true')
}


module.exports.postSecurityCurrent = async function (req, res) {
    const id = req.params.id
    var post = Posts.findByPk(id)
    post
        .then(async (data) => {
            console.log("data: ", data.dataValues.password)
            console.log("password: ", req.body.password)
            if (req.body.password) {
                const checkPassword = await bcrypt.compare(req.body.password, data.dataValues.password)
                if (!checkPassword) {
                    res.redirect('/?pass=false')
                    return;
                }
                else {

                    res.render('posts/editor', {
                        values: data.dataValues
                    })
                }
            }
        })
        .catch((err) => console.log(err))
}

module.exports.postCurrent = function (req, res) {
    const id = req.params.id
    var post = Posts.findByPk(id)
    post.then((data) => {
        res.render('posts/editor', {
            values: data.dataValues
        })
    })
}
