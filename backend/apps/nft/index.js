const mongoose = require("mongoose");

const CError = require('../../utils/rsp')

const NftModel = require('../../models/nft')
const ProfileModel = require('../../models/profile')
const CollectionModel = require('../../models/collection')

/**
 * medee мэдээлэл нэмэх
 */
exports.post = async (req, res) =>
{
    /** гараас авж байгаа бүх утгыг хадгална */
    var body =
    {
        ...req.body
    }

    if (req.files.image)
    {
        body.image = req.files.image[0].path
    }

    var collection = await CollectionModel
        .findOne({ contract_address: body.by_collection })
        .select('_id, profile')

    var collection_id = collection._id
    var profile_id = collection.profile

    body.owned = profile_id
    body.by_collection = collection_id

    await NftModel.create(body)

    return req.sendInfo('INF_001')
}

exports.get = async (req, res) =>
{
    const nfts = await NftModel.find().sort('-date')

    req.sendData(nfts)
}

exports.getNftId = async (req, res) =>
{
    const nft_id = req.params.id

    const data = await NftModel.findOne({ _id: nft_id })

    req.sendData(data)
}

exports.getNftCollectionId = async (req, res) =>
{
    const collection_id = req.params.id

    var collection = await CollectionModel
        .findOne({ contract_address: collection_id })
        .select('_id, profile')

    var collectionId = collection._id
    // var profileId = collection.profile

    const data = await NftModel.find({ by_collection: collectionId })
        .populate({ path: 'owned', select: 'uniqueName' })
        .populate({ path: 'by_collection', select: ['metaMaskToken', 'username'] })

    req.sendData(data)
}

exports.getNftByCollectionId = async (req, res) =>
{
    const token_id = req.params.id
    const collection_id = req.params.collec

    var collection = await CollectionModel
        .findOne({ contract_address: collection_id })
        .select('_id, profile')

    var collectionId = collection._id

    const data = await NftModel.findOne({ tokenId: token_id, by_collection: collectionId })
    .populate({ path: 'owned', select: ['uniqueName', 'profileImage', 'metaMaskToken'] })
    .populate({ path: 'by_collection', select: ['metaMaskToken', 'username', 'logo', 'contract_address'] })

    req.sendData(data)
}

exports.addMarketplace = async (req, res) =>
{
    const token_id = req.params.id
    const collection_id = req.params.collec

    var collection = await CollectionModel
        .findOne({ contract_address: collection_id })
        .select('_id')

    await NftModel.findOneAndUpdate(
        {
            by_collection: collection._id,
            tokenId: token_id
        },
        {
            price: req.body.price,
            listingId: req.body.listingId,
            marketPlace: true
        }
    )

    return req.sendInfo('INF_001')
}

exports.changeNftProfile = async (req, res) =>
{
    const token_id = req.params.id
    const collection_id = req.params.collec

    var collection = await CollectionModel
        .findOne({ contract_address: collection_id })
        .select('_id, profile')

    const profile = await ProfileModel.findOne({ metaMaskToken: req.body.address })

    var collectionId = collection._id

    const data = await NftModel.findOneAndUpdate(
        {
            tokenId: token_id,
            by_collection: collectionId
        },
        {
            marketPlace: false,
            owned: profile._id
        })
        .populate({ path: 'owned', select: ['uniqueName', 'profileImage', 'metaMaskToken'] })
        .populate({ path: 'by_collection', select: ['metaMaskToken', 'username', 'logo', 'contract_address'] })

    return req.sendData(data)

}
