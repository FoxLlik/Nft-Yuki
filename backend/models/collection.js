
var mongoose = require('mongoose')

const Profile = require('./profile')

const CollectionSchema = new mongoose.Schema(
{

    metaMaskToken:
    {
        type: String,
        required: false,
    },
    profile:
    {
        type: mongoose.Types.ObjectId,
        ref: Profile
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
    description:
    {
        type: String,
        required: false
    },
    symbol:
    {
        type: String,
        required: false
    },
    external_link:
    {
        type: String,
        required: false
    },
    contract_address:
    {
        type: String,
        required: false
    }


}, {
    timestamps: true
})

module.exports = mongoose.model('Collection', CollectionSchema);
