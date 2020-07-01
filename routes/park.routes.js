const express = require('express')
const router = express.Router()
//MODELOS!!!
const Coaster = require('./../models/coaster.model')
const Park = require('./../models/park.model')

// Aquí los endpoints

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/new', (req, res) => {
    res.render("parks/new-park")
})



//"/parks/create"
router.post('/new', (req, res) => {
    const { name, description } = req.body
    Park
        .create({ name, description })
        .then(() => res.redirect('/parks/new'))
        .catch(err => console.log("Error en la BBDD", err))
})

module.exports = router

