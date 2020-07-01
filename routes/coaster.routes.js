const express = require('express')
const router = express.Router()

const Coaster = require('./../models/coaster.model')
const Park = require('./../models/park.model')
// Aquí los endpoints
// Endpoints
router.get('/', (req, res) => {
    Coaster
        .find()
        .populate('park')
        .then(coasters => {
            res.render('coasters/coasters-index', { coasters })
        })
        .catch(err => console.log("Error en la BBDD", err))
})

//Get del form
router.get('/new', (req, res) => {
    Park
        .find()
        .then(parks => {
            res.render('coasters/new-coaster', { parks })
        })
        .catch(err => console.log("Error en la BBDD", err))
})


//Get del delete id
router.get('/delete/:id', (req, res) => {
    Coaster
        .findByIdAndRemove(req.params.id)
        .then(() => { res.redirect('/coasters') })
        .catch(err => console.log("Error en la BBDD", err))
})

//Get del edit
//TODO cómo sacar también la lista de parques?
router.get('/edit/:id', (req, res) => {
    const coasterId = Coaster.findById(req.params.id)
    const allParks = Park.find()
    // .populate('park') no hace falta

    Promise.all([coasterId, allParks]) //componer array
        .then(coasters => {
            res.render('coasters/edit-coaster', { coaster: coasters[0], park: coasters[1] }) //estructurar data array en obj para iterar
        })
        .catch(err => console.log("Error en la BBDD", err))
})



//POST del edit
router.post('/edit/:id', (req, res) => {
    const { name, description, inversions, length, park } = req.body
    Coaster
        .findByIdAndUpdate(req.params.id, { name, description, inversions, length, park })
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log("Error en la BBDD", err))
})

//POST del form
router.post('/new', (req, res) => {
    const { name, description, inversions, length, park } = req.body
    Coaster
        .create({ name, description, inversions, length, park })
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log("Error en la BBDD", err))
})

//Get de id
router.get('/:id', (req, res) => {
    Coaster
        .findById(req.params.id)
        .populate('park')
        .then(coaster => {
            res.render('coasters/coaster-details', coaster)
        })
        .catch(err => console.log("Error en la BBDD", err))
})


module.exports = router
