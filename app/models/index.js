const dbConfig = require('../config/db.config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/** @see https://mongoosejs.com/docs/deprecations.html#findandmodify */
mongoose.set('useFindAndModify', false);

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.articles = require('./article.model')(mongoose);

module.exports = db;
