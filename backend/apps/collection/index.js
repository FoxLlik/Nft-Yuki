const mongoose = require("mongoose");

const CError = require('../../utils/rsp')

const CollectionModel = require('../../models/collection')
const NftModel = require('../../models/nft')

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

    if (req.files.logo)
    {
        body.logo = req.files.logo[0].path
    }
    if (req.files.backgroundImage)
    {
        body.backgroundImage = req.files.backgroundImage[0].path
    }

    await CollectionModel.create(body)

    return req.sendInfo('INF_001')
}

exports.get = async (req, res) =>
{
    const collection = await CollectionModel
        .find()
        .sort('-date')
        .populate({ path: 'profile', select: ['metaMaskToken', 'uniqueName', 'profileImage']})
        .limit(8)

    req.sendData(collection)
}

exports.getCollectionId = async (req, res) =>
{
    const contract = req.params.contract

    var data = await CollectionModel
        .findOne({ contract_address: contract })
        .populate('profile')

    var count = await NftModel.find({ by_collection: data._id }).count()

    data = { ...data._doc,
        'nftCount': count

    }

    req.sendData(data)

}
