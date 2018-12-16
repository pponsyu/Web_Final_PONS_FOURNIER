const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express()
const models = require('./models/index');
const Routes = require('./routes');
const path = require('path');

// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add a bit of logging
app.use(morgan('short'))

//PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

//For the association
models.Monkey.belongsTo(models.Enclos);
models.Enclos.hasMany(models.Monkey, { as: "Monkeys" });

//WEBSITE
app.get('/', function (req, res) {
    res.render('index')
        .catch((err) => {
            res.json(err)
        }) 
})

app.get('/MonkeyCreation', function (req, res) {
    res.render('MonkeyCreation')
        .catch((err) => {
            res.json(err)
        }) 
})

app.get('/EnclosCreation', function (req, res) {
    res.render('EnclosCreation')
        .catch((err) => {
            res.json(err)
        }) 
})

app.get('/MonkeyUpdate/:id', function (req, res) {
    res.render('MonkeyUp', { id: req.params.id })
        .catch((err) => {
            res.json(err)
        }) 
})

app.get('/EnclosUpdate/:id', function (req, res) {
    res.render('EnclosUp', { id: req.params.id })
        .catch((err) => {
            res.json(err)
        }) 
})

app.get('/Link/:id', function (req, res) {
    models.Enclos.findAll({ where: req.query })
        .then((Enclos) => {
            res.render('Link', { Monk: Enclos, id: req.params.id });
        })
        .catch((err) => {
            res.json(err)
        }) 
})

app.get('/Link/:id1/:id2', function (req, res) {
    models.Enclos.findOne({ where: { id: req.params.id2 } })
        .then((Enclos) => {
            models.Monkey.findOne({ where: { id: req.params.id1 } })
                .then((Monkey) => {
                    Enclos.addMonkeys(Monkey).then(() => {
                        res.render('Monkey', { Monk: Monkey })
                    })
                })
        })
        .catch((err) => {
            res.json(err)
        }) 
})

//Monkey
app.post('/Add_Monkey', function (req, res) {
    models.Monkey.create({
        Name: req.body.Name,
        Race: req.body.Race,
        Age: req.body.Age,
        Weight: req.body.Weight,
        Color: req.body.Color,
    })
        .then(() => {
            res.render('AddMonkey')
        })
        .catch((err) => {
            res.json(err)
        }) 
})

app.get('/Find_Monkey', function (req, res) {
    models.Monkey.findAll({
        where: req.query
    })
        .then((Monkeys) => {
            res.render('Monkeys', { Monk: Monkeys})
        })
        .catch((err) => {
            res.json(err)
        }) 
})

app.get('/Find_Monkey/:id', function (req, res) {
    models.Monkey.findOne({
        where: { id: req.params.id }
    })
        .then((Monkey) => {
            res.render('Monkey', { Monk: Monkey })
        })
        .catch((err) => {
            res.json(err)
        }) 
})

app.post('/Update_Monkey/:id', function (req, res) {
    models.Monkey.update(
        req.body,
        {
            where: { id: req.params.id }
        })
        .then(() => {
            res.render('UpdateMonkey')
        })
        .catch((err) => {
            res.json(err)
        }) 
})

app.get('/Delete_Monkey/:id', function (req, res) {
    models.Monkey.destroy({
        where: {id: req.params.id}
    })
        .then(() => {
            res.render('DeleteMonkey')
        })
        .catch((err) => {
            res.json(err)
        }) 
})

//Enclos
app.post('/Add_Enclos', function (req, res) {
    models.Enclos.create({
        Title: req.body.Title,
        Size: req.body.Size
    })
        .then(() => {
            res.render('AddEnclos')
        })
        .catch((err) => {
            res.json(err)
        }) 
})

app.get('/Find_Enclos', function (req, res) {
    models.Enclos.findAll({
        where: req.query
    })
        .then((Enclos) => {
            res.render('Enclos1', { Encl: Enclos })
        })
        .catch((err) => {
            res.json(err)
        }) 
})

app.get('/Find_Enclos/:id', function (req, res) {
    models.Enclos.findOne({
        where: { id: req.params.id }
    })
        .then((Enclos) => {
            Enclos.getMonkeys().then(associatedTasks => {
                res.render('Enclos2', { Encl: Enclos, Monkey_tab: associatedTasks })
            })
        })
        .catch((err) => {
            res.json(err)
        }) 
})

app.post('/Update_Enclos/:id', function (req, res) {
    models.Enclos.update(
        req.body,
        {
            where: { id: req.params.id }
        })
        .then(() => {
            res.render('UpdateEnclos')
        })
        .catch((err) => {
            res.json(err)
        }) 
})

app.get('/Delete_Enclos/:id', function (req, res) {
    models.Enclos.destroy({
        where: { id: req.params.id }
    })
        .then(() => {
            res.render('DeleteEnclos')
        })
        .catch((err) => {
            res.json(err)
        }) 
})

//API REST

//Monkey
app.post('/APIREST_Add_Monkey', Routes.APIREST_addmonkey)

app.get('/APIREST_Find_Monkey', Routes.APIREST_findmonkey)

app.get('/APIREST_Find_Monkey/:id', Routes.APIREST_findmonkeyid)

app.put('/APIREST_Update_Monkey', Routes.APIREST_updatemonkey)

app.put('/APIREST_Update_Monkey/:id', Routes.APIREST_updatemonkeyid)

app.delete('/APIREST_Delete_Monkey', Routes.APIREST_deletemonkey)

app.delete('/APIREST_Delete_Monkey/:id', Routes.APIREST_deletemonkeyid)

//Enclos
app.post('/APIREST_Add_Enclos', Routes.APIREST_addenclos)

app.get('/APIREST_Find_Enclos', Routes.APIREST_findenclos)

app.get('/APIREST_Find_Enclos/:id', Routes.APIREST_findenclosid)

app.put('/APIREST_Update_Enclos', Routes.APIREST_updateenclos)

app.put('/APIREST_Update_Enclos/:id', Routes.APIREST_updateenclosid)

app.delete('/APIREST_Delete_Enclos', Routes.APIREST_deleteenclos)

app.delete('/APIREST_Delete_Enclos/:id', Routes.APIREST_deleteenclosid)

// Synchronize models
models.sequelize.sync().then(function () {
    /**
     * Listen on provided port, on all network interfaces.
     * 
     * Listen only when database connection is sucessfull
     */
    app.listen(3000, function () {
        console.log('Express server listening on port 3000');
    });
});