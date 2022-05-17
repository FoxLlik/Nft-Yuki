const express = require("express");
const router = new express.Router

const createFile = require("../utils/file/createFile")

// middlewares
const asyncHandler = require("../middleware/asyncHandler");

const newsApp = require('../apps/news');

router
    .route('/')
    .get(asyncHandler(newsApp.get))
    .post(createFile.fields(
        [
            { name: 'image', maxCount: 1 }
        ]),
        asyncHandler(newsApp.post))

router
    .route('/:id')
    .get(asyncHandler(newsApp.getNewsId))

module.exports = router
