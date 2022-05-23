const multer = require("multer");
const path = require("path");

/** Зураг болон бичлэг хоёрыг салгаж 2 өөр folder-т хадгална */
const storage = multer.diskStorage(
{
    destination: (req, file, cb) =>
    {
        if (file.mimetype === 'video/mp4')
        {
            cb(null, 'public/videos/');
        } else if (file.mimetype === 'application/pdf')
        {
            cb(null, 'public/pdf/');
        } else
        {
            cb(null, 'public/images/');
        }
    },
    filename: (req, file, cb) =>
    {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

/**
 * @description Файл үүсгэх
 * @param Файл
 */
const upload = multer(
{
    storage: storage
});

module.exports = upload
