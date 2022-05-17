
var mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema(
{

    title:
    {
        type: String,
        required: false,
    },
    image:
    {
        type: String,
        required: false
    },
    description:
    {
        type: String,
        required: false
    },
    bio:
    {
        type: String,
        required: false
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('News', NewsSchema);
