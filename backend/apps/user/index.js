const mongoose = require("mongoose");

const CError = require('../../utils/rsp')

const ProfileModel = require('../../models/profile')

/**
 * Хэрэглэгчийн мэдээлэл нэмэх
 */
exports.post = async (req, res) =>
{
    /** гараас авж байгаа бүх утгыг хадгална */
    var body =
    {
        ...req.body
    }
    metaMaskToken = req.body.metaMaskToken

    /** Нэвтэрсэн хэрэглэгчийн мэдээллийг баазаас хайна */
    profile = await ProfileModel.find({ metaMaskToken: metaMaskToken })

    /** Байхгүй бол шинээр үүсгэнэ */
    if (profile.length !== 0)
    {

        if (profile[0].checkNewMember === false)
        {
            return req.sendInfo('INF_014')
        }
    }
    else
    {
        await ProfileModel.create(body)
        return req.sendInfo('INF_014')
    }

    return req.sendInfo('INF_001')
}

/**
 * Хэрэглэгч мэдээллээ өөрчлөх
 */
exports.putProfile = async (req, res) =>
{

    /** гараас авж байгаа бүх утгыг хадгална */
    var body =
    {
        ...req.body
    }

    if (req.files.profileImage)
    {
        body.profileImage = req.files.profileImage[0].path
    }
    if (req.files.backgroundImage)
    {
        body.backgroundImage = req.files.backgroundImage[0].path
    }
    metaMaskToken = req.body.metaMaskToken
    req.body.uniqueName = req.body.uniqueName.toLowerCase()

    // checkNewMember - г True болгоно шүү
    body.checkNewMember = true

    await ProfileModel.findOneAndUpdate({ metaMaskToken: metaMaskToken }, body)

    req.sendInfo('INF_002');
}

exports.get = async (req, res) =>
{
    const profiles = await ProfileModel.find().sort('-date').limit(10)

    req.sendData(profiles)
}

exports.getUserData = async (req, res) =>
{
    uniqueName = req.params.uniquename
    uniqueName = uniqueName.toLowerCase()

    const data = await ProfileModel.findOne({ uniqueName: uniqueName })

    req.sendData(data)
}

exports.getUserDataByToken = async (req, res) =>
{
    token = req.params.token

    console.log(token)

    const data = await ProfileModel.findOne({ metaMaskToken: token })

    req.sendData(data)
}
