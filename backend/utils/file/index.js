var fs = require('fs');
const sharp = require('sharp');
sharp.cache(false);

/**
 * File байгаа эсгийг шалгах
 * @param {Object} where Хайх зам
 * @returns true false
 */
exports.isFile = async (where) =>
{
    return new Promise((resolve) =>
    {
        fs.access(where, fs.constants.F_OK, (err) =>
        {
            if (err)
                resolve(false);
            resolve(true);
        })
    })
}

/** Файл хэлбэрийн зургийн хэмжээг өөрчлөх нь */
exports.resizeImage = async (filePath, width=200, height=200) =>
{
    const imageBuffer = await sharp(filePath)
                            .resize(width, height)
                            .toBuffer()
    const image = await sharp(imageBuffer).toFile(filePath)
    return image
}

/** Файлын жинхэнэ замыг авах */
exports.getUrlPath = (file) => `${file.destination}${file.filename}`
