
var mongoose = require('mongoose')

const Collection = require('./collection');
const Profile = require('./profile');

const NftSchema = new mongoose.Schema(
{

    name:
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
    owned:
    {
        type: mongoose.Types.ObjectId,
        ref: Profile
    },
    by_collection:
    {
        type: mongoose.Types.ObjectId,
        ref: Collection
    },
    marketPlace:
    {
        type: Boolean,
        required: false,
        default: false
    },
    price:
    {
        type: Number,
        required: false,
        default: 0.0
    },
    tokenId:
    {
        type: Number,
        required: false,
        default: 0
    },
    transactionHash:
    {
        type: String,
        required: false
    },
    ipfs:
    {
        type: String,
        required: false
    },
    listingId:
    {
        type:Number,
        required: false
    }


}, {
    timestamps: true
})

module.exports = mongoose.model('Nft', NftSchema);
