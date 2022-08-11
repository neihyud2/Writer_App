const express = require('express')
const app = express()
const path = require('path')
const port = 8080
const router = require('./routes/index.route')
const sequelize = require('./utils/db')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'pug')
app.set('views', './views')


router(app)

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});


app.listen(port, () => console.log(`Server is running port ${port}`))
sequelize.sync()