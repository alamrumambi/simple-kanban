const { Task } = require('../models');

class taskController {
    static findAll(req, res, next) {
        Task.findAll({ where: { category: req.params.category }})
            .then(data => {
                console.log('masuk')
                res.status(200).json(data);
            })
            .catch(err => {
                next(err);
            })
    }

    static findByPk(req, res, next) {
        Task.findByPk(req.params.id)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next(err)
            })
    }

    static addData(req, res, next) {
        const { title, createDate, category } = req.body;
        const input = {
            title, createDate, category, UserId: req.userData.id
        }

        Task.create(input)
            .then(data => {
                res.status(201).json(data);
            })
            .catch(err => {
                next(err);
            })
    }

    static putData(req, res, next) {
        const { title } = req.body;
        const input = {
            title
        }
        const id = req.params.id;

        Task.update(input, { where: { id } })
            .then(data => {
                return Todo.findByPk(id)
            })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next(err);
            })
    }

    static putCategory(req, res, next) {
        const { category } = req.body;
        const input = {
            category
        }
        const id = req.params.idCat;

        Task.update(input, { where: { id } })
            .then(data => {
                return Todo.findByPk(id)
            })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next(err);
            })
    }

    static delete(req, res, next) {
        const id = req.params.id;
        let record = null;
        Task.findByPk(id)
            .then(data => {
                record = data;
                return Todo.destroy({ where: { id } })
            })
            .then(data => {
                res.status(200).json(record);
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = taskController;