
var mongoose = require('mongoose')

const CollectionSchema = new mongoose.Schema(
{

    metaMaskToken:
    {
        type: String,
        required: false,
    },
    username:
    {
        type: String,
        required: false,
    },
    logo:
    {
        type: String,
        required: false
    },
    backgroundImage:
    {
        type: String,
        required: false
    },
    /** Хэдэн ширхэг байгаа */
    collectionOf:
    {
        type: Number,
        required: false,
        default: 0
    },
    /** Хэдэн хүн эзэмшдэг */
    ownedBy:
    {
        type: Number,
        required: false,
        default: 0
    },
    /** Хамгийн бага үнэ */
    floorPrice:
    {
        type: Number,
        required: false,
        default: 0
    },
    /** Нийт өртөг */
    totalSales:
    {
        type: Number,
        required: false,
        default: 0
    },
    bio:
    {
        type: String,
        required: false
    }


}, {
    timestamps: true
})

module.exports = mongoose.model('Collection', CollectionSchema);
