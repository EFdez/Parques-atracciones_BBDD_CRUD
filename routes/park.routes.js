const express = require('express')
const router = express.Router()
//MODELOS!!!
const Coaster = require('./../models/coaster.model')
const Park = require('./../models/park.model')

// Aquí los endpoints
router.get('/', (req, res) => {
    Park
        .find()
        .then(parks => {
            res.render('parks/parks-index', { parks })
        })
        .catch(err => console.log("Error en la BBDD", err))
})

//get del new form
router.get('/new', (req, res) => {
    res.render("parks/new-park")
})

//Get del delete id
router.get('/delete/:id', (req, res) => {
    Park
        .findByIdAndRemove(req.params.id)
        .then(() => { res.redirect('/parks') })
        .catch(err => console.log("Error en la BBDD", err))
})

//Get de detalle 
router.get('/:id', (req, res) => {
    Park
        .findById(req.params.id)
        .then(park => {
            res.render('parks/parks-details', park)
        })
        .catch(err => console.log("Error en la BBDD", err))
})


//Get del form EDIT
router.get('/edit/:id', (req, res) => {
    Park
        .findById(req.params.id)
        .then(park => {
            res.render('parks/edit-park', park)
        })
        .catch(err => console.log("Error en la BBDD", err))
})

//POST del edit
router.post('/edit/:id', (req, res) => {
    const { name, description } = req.body
    Park
        .findByIdAndUpdate(req.params.id, { name, description })
        .then(() => res.redirect('/parks'))
        .catch(err => console.log("Error en la BBDD", err))
})



//POST del new form
router.post('/new', (req, res) => {
    const { name, description } = req.body
    Park
        .create({ name, description })
        .then(() => res.redirect('/parks'))
        .catch(err => console.log("Error en la BBDD", err))
})

module.exports = router

