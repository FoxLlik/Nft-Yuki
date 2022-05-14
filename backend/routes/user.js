const express = require("express");
const router = new express.Router

const createFile = require("../utils/file/createFile")

// middlewares
const asyncHandler = require("../middleware/asyncHandler");

const userApp = require('../apps/user');

router
    .route('/')
    .get(asyncHandler(userApp.get))
    .post(asyncHandler(userApp.post))
    .put(createFile.fields(
        [
            { name: 'profileImage', maxCount: 1 },
            { name: 'backgroundImage', maxCount: 1 }
        ]),
        asyncHandler(userApp.putProfile))

router
    .route('/:uniquename')
    .get(asyncHandler(userApp.getUserData))

router
    .route('/token/:token')
    .get(asyncHandler(userApp.getUserDataByToken))

module.exports = router
