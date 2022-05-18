const express = require("express");
const router = new express.Router

const createFile = require("../utils/file/createFile")

// middlewares
const asyncHandler = require("../middleware/asyncHandler");

const collectionApp = require('../apps/collection');

router
    .route('/')
    .get(asyncHandler(collectionApp.get))
    .post(createFile.fields(
        [
            { name: 'logo', maxCount: 1 },
            { name: 'backgroundImage', maxCount: 1 }
        ]),
        asyncHandler(collectionApp.post))

router
    .route('/:contract')
    .get(asyncHandler(collectionApp.getCollectionId))

module.exports = router
