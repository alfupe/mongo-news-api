const mongoose = require('mongoose');
const ArticleModel = require('./article.model')(mongoose);
const articleData = {
    title: 'Test article',
    author: 'Test author',
    content: 'Test content',
    description: 'Test description',
    date: new Date().toISOString()
};

describe('Article Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it('should create an article successfully', async () => {
        const validArticle = new ArticleModel(articleData);
        const savedArticle = await validArticle.save();

        expect(savedArticle._id).toBeDefined();
        expect(savedArticle.title).toBe(articleData.title);
        expect(savedArticle.author).toBe(articleData.author);
        expect(savedArticle.content).toBe(articleData.content);
        expect(savedArticle.description).toBe(articleData.description);
        expect(+new Date(savedArticle.date)).toBe(+new Date(articleData.date));
    });

    it('should insert and article but the field not defined in schema should be undefined', async () => {
        const articleWithInvalidField = new ArticleModel({ title: 'Test 2', test: 'not defined in model' });
        const savedArticleWithInvalidField = await articleWithInvalidField.save();
        expect(savedArticleWithInvalidField._id).toBeDefined();
        expect(savedArticleWithInvalidField.test).toBeUndefined();
    });

    it('should fail because not inserting required fields', async () => {
        const articleWithoutRequiredField = new ArticleModel({ author: 'Test author' });
        let result;

        try {
            error = await articleWithoutRequiredField.save();
        } catch (error) {
            result = error
        }

        expect(result).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(result.errors.title).toBeDefined();
    });
});
