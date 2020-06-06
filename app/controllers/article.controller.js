const db = require('../models');
const Article = db.articles;

/**********************************
 ******* REQUIRED ENDPOINTS *******
 **********************************/
// Create and Save a new Article
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({message: 'Content cannot be empty'});

        return;
    }

    // Create an artcile
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        content: req.body.content,
        author: req.body.author,
        archiveDate: req.body.archiveDate
    });

    // Save Article in the database
    article
        .save(article)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || 'Some error ocurred while creating the Article'
            });
        });
};


// Retrieve all Articles not archived from the database.
exports.findAllPublished = (req, res) => {
    Article.find({archiveDate: { $exists: false }})
        .sort({date: -1})
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || 'Some error occurred while retrieving articles.'
            });
        });
};

// Find all published Articles
exports.findAllArchived = (req, res) => {
    Article.find({archiveDate: { $exists: true }})
        .sort({archiveDate: -1})
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || 'Some error occurred while retrieving articles.'
            });
        })
};

// Delete a Article with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Article.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Article with id=${id}. Maybe Article was not found!`
                });
            } else {
                res.send({
                    message: 'Article was deleted successfully!'
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: `Could not delete Article with id=${id}`
            });
        });
};

/**********************************
 ******* EXTRA ENDPOINTS *******
 **********************************/
// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    const condition = title ? {title: {$regex: new RegExp(title), $options: 'i'}} : {};

    Article.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || 'Some error occurred while retrieving articles.'
            });
        });
};

// Find a single Article with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Article.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: `Not found Article with id ${id}`});
            else
                res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: `Error retrieving Article with id=${id}`
            });
        });
};

// Update a Article by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!'
        });
    }

    const id = req.params.id;

    Article
        .findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data)
                res.status(404).send({message: `Cannot update Article with id=${id}. Maybe Article was not found!`});
            else
                res.send({ message: "Article was updated successfully." });
        })
        .catch(error => {
            res.status(500).send({
                message: `Error updating Article with id=${id}`
            });
        });
};

// Delete all Articles from the database.
exports.deleteAll = (req, res) => {
    Article.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Articles were deleted successfully!`
            });
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || 'Some error occurred while removing all articles.'
            });
        });
};
