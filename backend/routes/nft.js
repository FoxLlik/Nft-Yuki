const express = require("express");
const router = new express.Router

const createFile = require("../utils/file/createFile")

// middlewares
const asyncHandler = require("../middleware/asyncHandler");

const nftApp = require('../apps/nft');

router
    .route('/')
    .get(asyncHandler(nftApp.get))
    .post(createFile.fields(
        [
            { name: 'image', maxCount: 1 },
        ]),
        asyncHandler(nftApp.post))

router
    .route('/:id')
    .get(asyncHandler(nftApp.getNftId))

router
    .route('/collec/:id')
    .get(asyncHandler(nftApp.getNftCollectionId))

router
    .route('/:collec/:id')
    .get(asyncHandler(nftApp.getNftByCollectionId))

router
    .route('/marketplace/:collec/:id')
    .post(asyncHandler(nftApp.addMarketplace))

router
    .route('/profile/:collec/:id')
    .post(asyncHandler(nftApp.changeNftProfile))

module.exports = router
