module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            title: {type: String, required: true},
            description: String,
            date: Date,
            content: String,
            author: String,
            archiveDate: Date
        }/*,
        {
            timestamps: true
        }*/
    );

    // override toJSON to customize some properties
    schema.method('toJSON', function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;

        return object;
    });

    return mongoose.model(
        'Article',
        schema
    );
};
