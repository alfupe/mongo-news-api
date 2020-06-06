module.exports = app => {
    const articles = require('../controllers/article.controller');
    const router = require('express').Router();

    /**********************************
     ******* REQUIRED ENDPOINTS *******
     **********************************/
    // Create a new Article
    router.post('/', articles.create);

    // Retrieve all published (not archived) Articles
    router.get("/published", articles.findAllPublished);

    // Retrieve all archived Articles
    router.get("/archived", articles.findAllArchived);

    // Delete a Article with id
    router.delete("/:id", articles.delete);

    /**********************************
     ******* EXTRA ENDPOINTS *******
     **********************************/
    // Retrieve all Articles
    router.get("/", articles.findAll);

    // Retrieve a single Article with id
    router.get("/:id", articles.findOne);

    // Update a Article with id
    router.put("/:id", articles.update);

    // Create a new Article
    router.delete("/", articles.deleteAll);

    app.use('/api/articles', router);
};
