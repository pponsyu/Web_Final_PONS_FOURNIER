const models = require('./models/index');
const path = require('path');

exports.APIREST_addmonkey = (req, res) => {
    models.Monkey.create({
        Name: req.body.Name,
        Race: req.body.Race,
        Age: req.body.Age,
        Weight: req.body.Weight,
        Color: req.body.Color,
    })
        .then(() => {
            res.send('Monkey added')
        })
        .catch((err) => {
            res.json(err)
        }) 
}

exports.APIREST_findmonkey = (req, res) => {
    models.Monkey.findAll({
        where: req.query
    })
        .then((Monkeys) => {
            res.send(Monkeys);
        })
        .catch((err) => {
            res.json(err)
        }) 
}

exports.APIREST_findmonkeyid = (req, res) => {
    models.Monkey.findOne({
        where: { id: req.params.id }
    })
        .then((Monkey) => {
            res.send(Monkey);
        })
        .catch((err) => {
            res.json(err)
        }) 
}

exports.APIREST_updatemonkey = (req, res) => {
    models.Monkey.update(
        req.body,
        {
            where: req.query
        }
    )
        .then(() => {
            res.send("All Monkeys updated")
        })
        .catch((err) => {
            res.json(err)
        }) 
}

exports.APIREST_updatemonkeyid = (req, res) => {
    models.Monkey.update(
        req.body,
        {
            where: { id: req.params.id }
        })
        .then(() => {
            res.send("Monkey updated")
        })
        .catch((err) => {
            res.json(err)
        }) 
}

exports.APIREST_deletemonkey = (req, res) => {
    models.Monkey.destroy({
        where: req.query
    })
        .then(() => {
            res.send("All Monkeys deleted")
        })
}

exports.APIREST_deletemonkeyid = (req, res) => {
    models.Monkey.destroy({
        where: { id: req.params.id }
    })
        .then(() => {
            res.send("Monkey deleted")
        })
        .catch((err) => {
            res.json(err)
        }) 
}

exports.APIREST_addenclos = (req, res) => {
    models.Enclos.create({
        Title: req.body.Title,
        Size: req.body.Size
    })
        .then(() => {
            res.send('Enclos added')
        })
        .catch((err) => {
            res.json(err)
        }) 
}

exports.APIREST_findenclos = (req, res) => {
    models.Enclos.findAll({
        where: req.query
    })
        .then((Enclos) => {
            res.send(Enclos);
        })
        .catch((err) => {
            res.json(err)
        }) 
}

exports.APIREST_findenclosid = (req, res) => {
    models.Enclos.findOne({
        where: { id: req.params.id }
    })
        .then((Enclos) => {
            Enclos.getMonkeys().then(associatedTasks => {
                res.json({ Encl: Enclos, Monkey_tab: associatedTasks })
            })
        })
        .catch((err) => {
            res.json(err)
        }) 
}

exports.APIREST_updateenclos = (req, res) => {
    models.Enclos.update(
        req.body,
        {
            where: req.query
        }
    )
        .then(() => {
            res.send("All Enclos updated")
        })
        .catch((err) => {
            res.json(err)
        }) 
}

exports.APIREST_updateenclosid = (req, res) => {
    models.Enclos.update(
        req.body,
        {
            where: { id: req.params.id }
        })
        .then(() => {
            res.send("Enclos updated")
        })
        .catch((err) => {
            res.json(err)
        }) 
}

exports.APIREST_deleteenclos = (req, res) => {
    models.Enclos.destroy({
        where: req.query
    })
        .then(() => {
            res.send("All Enclos deleted")
        })
        .catch((err) => {
            res.json(err)
        }) 
}

exports.APIREST_deleteenclosid = (req, res) => {
    models.Enclos.destroy({
        where: { id: req.params.id }
    })
        .then(() => {
            res.send("Enclos deleted")
        })
        .catch((err) => {
            res.json(err)
        }) 
}