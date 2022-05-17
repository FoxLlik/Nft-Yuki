const mongoose = require("mongoose");

const CError = require('../../utils/rsp')

const NewsModel = require('../../models/news')

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

    await NewsModel.create(body)

    return req.sendInfo('INF_001')
}

exports.get = async (req, res) =>
{
    const news = await NewsModel.find().sort('-date')

    req.sendData(news)
}

exports.getNewsId = async (req, res) =>
{
    const news_id = req.params.id

    const data = await NewsModel.findOne({ _id: news_id })

    req.sendData(data)
}
